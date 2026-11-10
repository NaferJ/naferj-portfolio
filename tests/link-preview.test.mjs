import assert from "node:assert/strict";
import test from "node:test";
import { describeLink } from "../src/lib/link-preview.ts";

test("describes a GitHub pull request URL", () => {
  assert.deepEqual(describeLink("https://github.com/NaferJ/luisardito-frontend/pull/16"), {
    domain: "github.com",
    kind: "pullRequest",
    repo: "NaferJ/luisardito-frontend",
    number: "16",
  });
});

test("describes a GitHub issue URL", () => {
  assert.deepEqual(describeLink("https://github.com/NaferJ/naferj-portfolio/issues/42"), {
    domain: "github.com",
    kind: "issue",
    repo: "NaferJ/naferj-portfolio",
    number: "42",
  });
});

test("describes a GitHub compare URL", () => {
  assert.deepEqual(describeLink("https://github.com/NaferJ/naferj-portfolio/compare/v1.0.0...v1.1.0"), {
    domain: "github.com",
    kind: "compare",
    repo: "NaferJ/naferj-portfolio",
    range: "v1.0.0...v1.1.0",
  });
});

test("describes a GitHub repository URL", () => {
  assert.deepEqual(describeLink("https://github.com/NaferJ/naferj-portfolio"), {
    domain: "github.com",
    kind: "repository",
    repo: "NaferJ/naferj-portfolio",
  });
});

test("strips a leading www from the domain", () => {
  assert.deepEqual(describeLink("https://www.devin.ai"), {
    domain: "devin.ai",
    kind: "external",
  });
});

test("returns an empty external result for an invalid URL", () => {
  assert.deepEqual(describeLink("not a url"), {
    domain: "",
    kind: "external",
  });
});
