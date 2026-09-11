import assert from "node:assert/strict";
import test from "node:test";
import { site, getSiteUrl } from "../src/data/site.ts";
import { projects, getProject } from "../src/data/projects.ts";
import { postsEn, publications, getPosts, getPost, readingMinutes, formatDate } from "../src/data/writing.ts";

function assertUnique(values) {
  assert.equal(new Set(values).size, values.length);
}

function assertUrl(value) {
  assert.ok(["https:", "http:"].includes(new URL(value).protocol));
}

test("profile has valid destinations and no invented production domain", () => {
  assert.ok(site.name);
  assertUrl(site.github);
  assertUrl(site.currentWork.href);
  assertUnique(site.navigation.map((link) => link.href));
  assert.ok(site.navigation.every((link) => link.href.startsWith("/")));
  if (site.url) assertUrl(getSiteUrl().href);
  else assert.equal(getSiteUrl(), undefined);
  if (site.indexable) assert.ok(getSiteUrl(), "Set the production URL before enabling indexing");
});

test("projects have unique routable slugs and complete case studies", () => {
  assertUnique(projects.map((project) => project.slug));
  for (const project of projects) {
    assert.match(project.slug, /^[a-z0-9]+(?:-[a-z0-9]+)*$/);
    assert.equal(getProject(project.slug), project);
    assert.ok(project.sections.length);
    assert.ok(project.stack.length);
    assert.ok(project.sections.every((section) => section.title && section.text));
    if (project.href) assertUrl(project.href);
  }
  assert.equal(getProject("does-not-exist"), undefined);
});

test("writing has unique slugs, heading anchors, valid dates, and reading times", () => {
  assertUnique(postsEn.map((post) => post.slug));
  for (const post of getPosts()) {
    assert.match(post.slug, /^[a-z0-9]+(?:-[a-z0-9]+)*$/);
    assert.match(post.date, /^\d{4}-\d{2}-\d{2}$/);
    assert.equal(new Date(post.date).toISOString().slice(0, 10), post.date);
    assert.equal(getPost(post.slug), post);
    assert.ok(readingMinutes(post) >= 1);
    const headings = post.body.filter((block) => block.type === "heading");
    assertUnique(headings.map((block) => block.id));
    for (const heading of headings) assert.match(heading.id, /^[a-z0-9]+(?:-[a-z0-9]+)*$/);
  }
  assert.deepEqual(getPosts().map((post) => post.date), getPosts().map((post) => post.date).sort().reverse());
  assert.equal(formatDate("2026-09-01"), "Sep 1, 2026");
  assert.equal(getPost("does-not-exist"), undefined);
});

test("draft posts are excluded from lists and direct lookups", () => {
  const draft = { ...postsEn[0], slug: "unpublished-test", draft: true };
  postsEn.push(draft);
  try {
    assert.equal(getPost(draft.slug), undefined);
    assert.ok(getPosts().every((post) => !post.draft));
  } finally {
    postsEn.pop();
  }
});

test("external publications only use web URLs", () => {
  for (const publication of publications) assertUrl(publication.href);
});
