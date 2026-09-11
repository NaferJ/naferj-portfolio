import assert from "node:assert/strict";
import { mkdtemp, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { projects } from "../src/data/projects.ts";
import { getPosts } from "../src/data/writing.ts";
import { site } from "../src/data/site.ts";

const origin = process.argv[2] ?? "http://localhost:3100";
const debuggerUrl = process.argv[3] ?? "http://127.0.0.1:9223";

function assertLocalHttpUrl(value, label) {
  let parsed;
  try {
    parsed = new URL(value);
  } catch {
    throw new Error(`${label} is not a valid URL: ${value}`);
  }
  if (!["http:", "https:"].includes(parsed.protocol)) {
    throw new Error(`${label} must use http or https: ${value}`);
  }
  const allowedHosts = ["localhost", "127.0.0.1", "::1"];
  if (!allowedHosts.includes(parsed.hostname)) {
    throw new Error(`${label} must point to a local address: ${value}`);
  }
}

assertLocalHttpUrl(origin, "origin");
assertLocalHttpUrl(debuggerUrl, "debuggerUrl");

const screenshots = await mkdtemp(join(tmpdir(), "portfolio-browser-"));
const debuggerListUrl = new URL("/json/list", debuggerUrl).href;
assertLocalHttpUrl(debuggerListUrl, "debuggerListUrl");
const targets = await fetch(debuggerListUrl).then((response) => response.json());
const target = targets.find((target) => target.type === "page");
assert.ok(target, "A dedicated browser debugging session must be running");
const socket = new WebSocket(target.webSocketDebuggerUrl);
await new Promise((resolve, reject) => {
  socket.addEventListener("open", resolve, { once: true });
  socket.addEventListener("error", reject, { once: true });
});
let id = 0;
const pending = new Map();
const exceptions = [];
socket.addEventListener("message", (event) => {
  const message = JSON.parse(event.data);
  if (message.method === "Runtime.exceptionThrown") exceptions.push(message.params.exceptionDetails.text);
  if (message.method === "Runtime.consoleAPICalled" && message.params.type === "error") exceptions.push("Browser console error");
  if (message.id && pending.has(message.id)) {
    const { resolve, reject, timeout } = pending.get(message.id);
    pending.delete(message.id);
    clearTimeout(timeout);
    if (message.error) reject(new Error(JSON.stringify(message.error)));
    else resolve(message.result);
  }
});
function send(method, params = {}) {
  return new Promise((resolve, reject) => {
    const requestId = ++id;
    const timeout = setTimeout(() => { pending.delete(requestId); reject(new Error(`CDP timeout: ${method}`)); }, 15000);
    pending.set(requestId, { resolve, reject, timeout });
    socket.send(JSON.stringify({ id: requestId, method, params }));
  });
}
async function evaluate(expression) {
  const response = await send("Runtime.evaluate", { expression, returnByValue: true, awaitPromise: true });
  if (response.exceptionDetails) throw new Error(JSON.stringify(response.exceptionDetails));
  return response.result.value;
}
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
async function waitFor(expression) {
  for (let i = 0; i < 80; i++) {
    if (await evaluate(expression)) return;
    await sleep(100);
  }
  throw new Error(`Timed out waiting for ${expression}`);
}
async function navigate(path) {
  await send("Page.navigate", { url: `${origin}${path}` });
  await waitFor(`location.pathname === ${JSON.stringify(path)} && document.readyState === 'complete' && Boolean(document.querySelector('main h1'))`);
  await evaluate("document.fonts.ready.then(() => true)");
  await sleep(250);
}
async function viewport(width, height) {
  await send("Emulation.setDeviceMetricsOverride", { width, height, deviceScaleFactor: 1, mobile: false });
}
async function screenshot(name) {
  const { data } = await send("Page.captureScreenshot", { format: "png", captureBeyondViewport: false });
  await writeFile(join(screenshots, `${name}.png`), Buffer.from(data, "base64"));
}

try {
  await send("Page.enable");
  await send("Runtime.enable");
  await send("Emulation.setEmulatedMedia", { features: [{ name: "prefers-reduced-motion", value: "reduce" }] });
  const posts = getPosts();
  const routes = ["/", "/projects", "/experience", "/writing", ...projects.map((project) => `/projects/${project.slug}`), ...posts.map((post) => `/writing/${post.slug}`)];
  const links = new Set();
  const firstArticle = posts[0] ? `/writing/${posts[0].slug}` : undefined;
  await viewport(1440, 1000);
  for (const route of routes) {
    assert.equal((await fetch(`${origin}${route}`)).status, 200, route);
    await navigate(route);
    await waitFor(`[...document.images].filter(image => { const rect = image.getBoundingClientRect(); return rect.width > 0 && rect.height > 0 && rect.top < innerHeight && rect.bottom > 0 && !image.closest('details:not([open])'); }).every(image => image.complete && image.naturalWidth > 0)`);
    const state = await evaluate(`({ title: document.title, headings: document.querySelectorAll('main h1').length, overflow: document.documentElement.scrollWidth > innerWidth, robots: document.querySelector('meta[name="robots"]')?.content, links: [...document.querySelectorAll('a[href]')].map(a => a.getAttribute('href')), missingImages: [...document.images].filter(image => image.complete && image.naturalWidth === 0 && !image.closest('details:not([open])')).map(image => image.getAttribute('src')) })`);
    assert.equal(state.headings, 1, `${route}: exactly one main h1`);
    assert.equal(state.overflow, false, `${route}: no document overflow`);
    assert.equal(state.missingImages.length, 0, `${route}: images loaded`);
    const sample = posts.some((post) => post.sample && route === `/writing/${post.slug}`) || projects.some((project) => project.sample && route === `/projects/${project.slug}`);
    if (!site.indexable || sample) assert.match(state.robots ?? "", /noindex/, `${route}: indexing protection`);
    state.links.filter((link) => link.startsWith("/")).forEach((link) => links.add(link));
    console.log("PASS route", route, state.title);
    if (route === "/") await screenshot("desktop");
    if (route === firstArticle) await screenshot("article");
    if (route === "/writing") await screenshot("writing");
  }
  for (const href of links) assert.equal((await fetch(new URL(href, origin))).status, 200, `internal link ${href}`);
  for (const route of ["/missing-page", "/writing/missing-post", "/projects/missing-project"]) assert.equal((await fetch(`${origin}${route}`)).status, 404, route);
  console.log("PASS internal links and missing-route 404s");
  await navigate("/");
  await evaluate(`document.querySelector('nav[aria-label="Primary navigation"] a[href="/writing"]').click()`);
  await waitFor(`location.pathname === '/writing' && Boolean(document.querySelector('#writing-search'))`);
  await waitFor(`document.querySelector('nav[aria-label="Primary navigation"] a[aria-current="page"]').getAttribute('href') === '/writing'`);
  if (posts.length) {
    const count = `document.querySelectorAll('main a[href^="/writing/"] h3').length`;
    const category = posts[0].category;
    await evaluate(`[...document.querySelectorAll('button[aria-pressed]')].find(button => button.textContent === ${JSON.stringify(category)}).click()`);
    await waitFor(`${count} === ${posts.filter((post) => post.category === category).length}`);
    await evaluate(`[...document.querySelectorAll('button[aria-pressed]')].find(button => button.textContent === 'All').click()`);
    await waitFor(`${count} === ${posts.length}`);
    await evaluate(`document.querySelector('#writing-search').focus()`);
    await send("Input.insertText", { text: "__no_matching_article_expected__" });
    await waitFor(`document.querySelector('main').textContent.includes('No notes found.')`);
    await evaluate(`[...document.querySelectorAll('button')].find(button => button.textContent === 'Clear filters').click()`);
    await waitFor(`${count} === ${posts.length}`);
    await evaluate(`document.querySelector('#writing-search').focus()`);
    await send("Input.insertText", { text: posts[0].title });
    const matching = posts.filter((post) => `${post.title} ${post.description} ${post.category}`.toLowerCase().includes(posts[0].title.toLowerCase())).length;
    await waitFor(`${count} === ${matching}`);
    console.log("PASS navigation, writing topic, search, empty state, and reset");
  }
  for (const width of [320, 375, 768, 1024]) {
    await viewport(width, 900);
    for (const route of ["/", "/projects", "/experience", "/writing", ...(firstArticle ? [firstArticle] : [])]) {
      await navigate(route);
      assert.equal(await evaluate("document.documentElement.scrollWidth > innerWidth"), false, `no overflow at ${width}: ${route}`);
      const visible = await evaluate(`[...document.querySelectorAll('nav[aria-label="Primary navigation"] a')].every(a => { const rect = a.getBoundingClientRect(); return rect.width > 0 && rect.x >= 0 && rect.right <= innerWidth; })`);
      assert.equal(visible, true, `navigation visible at ${width}: ${route}`);
      if (width === 375 && route === "/") await screenshot("mobile");
    }
    console.log("PASS viewport", width);
  }
  await viewport(1440, 1000);
  await navigate("/");
  const skipResult = await evaluate(`(() => { const link = document.querySelector('.skip-link'); link.focus(); return { isActive: document.activeElement === link, href: link.getAttribute('href') }; })()`);
  assert.equal(skipResult.isActive, true, "skip link receives focus");
  assert.equal(skipResult.href, "#main-content", "skip link targets main content");
  await send("Input.dispatchKeyEvent", { type: "keyDown", key: "Enter", code: "Enter", windowsVirtualKeyCode: 13 });
  await send("Input.dispatchKeyEvent", { type: "keyUp", key: "Enter", code: "Enter", windowsVirtualKeyCode: 13 });
  await waitFor("document.activeElement.id === 'main-content'");
  if (await evaluate("document.querySelectorAll('#contributions button').length")) {
    assert.equal(await evaluate(`document.querySelectorAll('#contributions button[tabindex="0"]').length`), 1);
    await evaluate(`document.querySelector('#contributions button[tabindex="0"]').focus()`);
    const before = await evaluate("document.activeElement.getAttribute('aria-label')");
    await send("Input.dispatchKeyEvent", { type: "keyDown", key: "ArrowLeft", code: "ArrowLeft", windowsVirtualKeyCode: 37 });
    assert.notEqual(await evaluate("document.activeElement.getAttribute('aria-label')"), before);
  }
  console.log("PASS skip link and keyboard contribution navigation");
  assert.equal((await fetch(`${origin}/opengraph-image`)).headers.get("content-type"), "image/png");
  if (!site.indexable || !site.url) assert.match(await fetch(`${origin}/robots.txt`).then((response) => response.text()), /Disallow: \//);
  assert.equal((await fetch(`${origin}/sitemap.xml`)).status, 200);
  assert.deepEqual(exceptions, []);
  console.log("PASS metadata assets, robots, sitemap, and no runtime errors");
} finally {
  console.log("Browser screenshots:", screenshots);
  socket.close();
}
