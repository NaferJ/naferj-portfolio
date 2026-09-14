import assert from "node:assert/strict";
import { afterEach, test } from "node:test";

const originalFetch = globalThis.fetch;
afterEach(() => { globalThis.fetch = originalFetch; });

const calendar = `<div data-from="2026-01-01 00:00:00 UTC" data-to="2026-09-10 00:00:00 UTC"><td data-ix="36" data-date="2026-09-10"></td><tool-tip>3 contributions on September 10th.</tool-tip></div>`;

delete process.env.GITHUB_TOKEN;
const withoutToken = await import("../src/lib/github.ts?without-token");
process.env.GITHUB_TOKEN = "test-placeholder-not-a-real-token";
const withToken = await import("../src/lib/github.ts?with-token");
delete process.env.GITHUB_TOKEN;

test("public activity remains available without a token", async () => {
  globalThis.fetch = async () => new Response(calendar);
  const result = await withoutToken.getContributions();
  assert.ok(result);
  assert.equal(result.total, 3);
  assert.equal(result.from, "2026-01-01");
  assert.equal(result.to, "2026-09-10");
  assert.equal(result.weeks.flatMap((week) => week.days).find((day) => day.date === "2026-09-10")?.count, 3);
});

test("repository lookup is unavailable without a token", async () => {
  let requested = false;
  globalThis.fetch = async () => {
    requested = true;
    throw new Error("Repository API should not be called without a token");
  };
  assert.equal(await withoutToken.getTopRepositories("owner", "2026-01-01", "2026-09-10"), null);
  assert.equal(requested, false);
});

test("network failure returns an unavailable state instead of crashing the page", async () => {
  globalThis.fetch = async () => { throw new Error("Simulated offline state"); };
  assert.equal(await withoutToken.getContributions(), null);
});

test("unavailable or changed GitHub markup returns an unavailable state", async () => {
  globalThis.fetch = async () => new Response("unavailable", { status: 503 });
  assert.equal(await withoutToken.getContributions(), null);
  globalThis.fetch = async () => new Response("<html>Changed markup</html>");
  assert.equal(await withoutToken.getContributions(), null);
});

test("repository API outage returns null instead of crashing", async () => {
  globalThis.fetch = async () => { throw new Error("Simulated repository API outage"); };
  assert.equal(await withToken.getTopRepositories("owner", "2026-01-01", "2026-09-10"), null);
});

test("GraphQL error responses return null", async () => {
  globalThis.fetch = async (url, options) => {
    assert.equal(options.cache, "no-store");
    assert.ok(options.signal instanceof AbortSignal);
    return Response.json({ errors: [{ message: "Simulated GraphQL error" }] });
  };
  assert.equal(await withToken.getTopRepositories("owner", "2026-01-01", "2026-09-10"), null);
});

test("repository aggregation never returns private repositories", async () => {
  const repository = { name: "public-project", nameWithOwner: "owner/public-project", url: "https://github.com/owner/public-project", description: "Test fixture", isPrivate: false, stargazerCount: 2, primaryLanguage: null, owner: { login: "owner", avatarUrl: "https://github.com/owner.png" } };
  globalThis.fetch = async (url, options) => {
    assert.equal(options.cache, "no-store");
    assert.ok(options.signal instanceof AbortSignal);
    return Response.json({ data: { user: { login: "owner", contributionsCollection: {
      commitContributionsByRepository: [
        { repository, contributions: { totalCount: 3 } },
        { repository: { ...repository, isPrivate: true, nameWithOwner: "owner/private-project" }, contributions: { totalCount: 100 } },
      ],
      pullRequestContributionsByRepository: [{ repository, contributions: { totalCount: 2 } }],
      pullRequestReviewContributionsByRepository: [],
      issueContributionsByRepository: [],
    } } } });
  };
  const result = await withToken.getTopRepositories("owner", "2026-01-01", "2026-09-10");
  assert.ok(result);
  assert.equal(result.length, 1);
  assert.equal(result[0].fullName, "owner/public-project");
  assert.equal(result[0].contributions, 5);
});

test("empty contribution collections return an empty list", async () => {
  globalThis.fetch = async (url, options) => {
    assert.equal(options.cache, "no-store");
    assert.ok(options.signal instanceof AbortSignal);
    return Response.json({ data: { user: { login: "owner", contributionsCollection: {
      commitContributionsByRepository: [],
      pullRequestContributionsByRepository: [],
      pullRequestReviewContributionsByRepository: [],
      issueContributionsByRepository: [],
    } } } });
  };
  assert.deepEqual(await withToken.getTopRepositories("owner", "2026-01-01", "2026-09-10"), []);
});

test("repository lookup recovers after a failed fetch", async () => {
  const repository = { name: "public-project", nameWithOwner: "owner/public-project", url: "https://github.com/owner/public-project", description: "Test fixture", isPrivate: false, stargazerCount: 2, primaryLanguage: null, owner: { login: "owner", avatarUrl: "https://github.com/owner.png" } };
  let attempts = 0;
  globalThis.fetch = async (url, options) => {
    attempts += 1;
    assert.equal(options.cache, "no-store");
    assert.ok(options.signal instanceof AbortSignal);
    if (attempts === 1) throw new Error("Simulated repository API outage");
    return Response.json({ data: { user: { login: "owner", contributionsCollection: {
      commitContributionsByRepository: [{ repository, contributions: { totalCount: 3 } }],
      pullRequestContributionsByRepository: [],
      pullRequestReviewContributionsByRepository: [],
      issueContributionsByRepository: [],
    } } } });
  };
  assert.equal(await withToken.getTopRepositories("owner", "2026-01-01", "2026-09-10"), null);
  const result = await withToken.getTopRepositories("owner", "2026-01-01", "2026-09-10");
  assert.ok(result);
  assert.equal(result.length, 1);
  assert.equal(result[0].fullName, "owner/public-project");
  assert.equal(attempts, 2);
});
