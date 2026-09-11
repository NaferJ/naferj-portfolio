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
  assert.deepEqual(result.topRepositories, []);
  assert.equal(result.weeks.flatMap((week) => week.days).find((day) => day.date === "2026-09-10")?.count, 3);
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

test("optional repository lookup failure does not hide the graph", async () => {
  globalThis.fetch = async (url) => {
    if (String(url).includes("graphql")) throw new Error("Simulated repository API outage");
    return new Response(calendar);
  };
  const result = await withToken.getContributions();
  assert.ok(result);
  assert.equal(result.total, 3);
  assert.deepEqual(result.topRepositories, []);
});

test("repository aggregation never returns private repositories", async () => {
  const repository = { name: "public-project", nameWithOwner: "owner/public-project", url: "https://github.com/owner/public-project", description: "Test fixture", isPrivate: false, stargazerCount: 2, primaryLanguage: null, owner: { login: "owner", avatarUrl: "https://github.com/owner.png" } };
  globalThis.fetch = async (url, options) => {
    assert.ok(options.signal instanceof AbortSignal);
    if (!String(url).includes("graphql")) return new Response(calendar);
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
  const result = await withToken.getContributions();
  assert.ok(result);
  assert.equal(result.topRepositories.length, 1);
  assert.equal(result.topRepositories[0].fullName, "owner/public-project");
  assert.equal(result.topRepositories[0].contributions, 5);
});
