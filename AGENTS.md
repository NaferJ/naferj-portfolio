# NaferJ Portfolio

Personal portfolio built with Next.js 16 App Router, React 19, strict TypeScript, and Tailwind CSS 4.

See `.devin/rules/naferj-portfolio.md` for complete repository conventions.

## Before starting any task

Read these files at the start of every session:

- `.github/pull_request_template.md`
- `.github/ISSUE_TEMPLATE/feature.md`
- `.github/ISSUE_TEMPLATE/content.md`
- `.github/ISSUE_TEMPLATE/tooling.md`
- `.ai/principles.md`
- `.devin/rules/naferj-portfolio.md`
- `AGENTS.md`

Do not invent issue or PR formats. The assistant never commits, pushes, rewrites Git history, or creates pull requests. The repository owner handles those operations.

## Commands

All Node.js commands should be run from WSL (Ubuntu) to avoid Windows/Linux lock file issues.

- `npm ci` — install exactly from `package-lock.json`
- `npm run dev` — start the development server
- `npm run lint` — run ESLint
- `npm run typecheck` — run TypeScript without emitting files
- `npm run build` — create the production build
- `npm run start` — serve the production build

### WSL workflow (required for this project)

CI runs on `ubuntu-latest`. `npm install` on Windows silently drops Linux-only optional dependencies from `package-lock.json`, which breaks `npm ci` in CI. To avoid this, all npm commands must run from WSL:

```bash
# Open WSL and navigate to the project
wsl -d Ubuntu
cd /mnt/c/Users/NaferJ/Projects/Private/naferj-portfolio

# Node 22 is managed via nvm in WSL
source ~/.nvm/nvm.sh
nvm use 22

# Now run any npm command — the lock file will always be correct
npm ci
npm install <package>   # safe in WSL — lock file includes Linux deps
npm run dev
npm run build
```

Never run `npm install` from PowerShell/cmd — it will corrupt the lock file.

## Code conventions

- English only in code, comments, logs, identifiers, and commit messages.
- Commit generators must ignore historical Spanish commits and always produce an English title and body.
- No emojis in code, logs, comments, or documentation.
- Strict TypeScript. Do not use `any` or non-null assertions to silence errors.
- Use the `@/*` alias for imports from `src/*`.
- Prefer small, accessible components and semantic HTML.
- Keep client components limited to browser interaction.
- Use `next/image` and `next/font` for optimized assets where appropriate.
- Keep portfolio content in typed data modules rather than duplicating it in components.
- Never commit secrets. Every environment variable must have a safe placeholder in `.env.example`.

## Local verification

Before handing work back, all commands must pass:

- `npm run lint`
- `npm run typecheck`
- `npm run build`

## Project board

The backlog is tracked in GitHub Project #14: https://github.com/users/NaferJ/projects/14

### Fields

- Status — Todo / In Progress / In Review / Done
- Priority — High / Medium / Low
- Category — feature / ops / content / tooling / bug

Sprint is tracked with labels such as `sprint-1`.

### Workflow

1. Todo — issue created and planned.
2. In Progress — branch checked out and implementation underway.
3. In Review — pull request open and awaiting review.
4. Done — pull request merged and issue closed.

Always tell the user when moving an issue between statuses.

### Issue checklist

When creating an issue:

1. Assign `NaferJ`.
2. Add one category label and one sprint label.
3. Add the issue to Project #14.
4. Set Priority to High, Medium, or Low using the project field.
5. Set Status to Todo, then move it to In Progress when coding begins.

Do not create separate project cards for pull requests. The issue card is the source of truth and the PR should link it with `Closes #NN`.

## Content and launch settings

- `src/data/site.ts` holds identity, biography, contact links, navigation, and the production URL. Set `url` and set `indexable` to `true` only after personalizing the template. Without a URL, social-image metadata uses localhost for local development.
- `src/data/projects.ts` holds project rows and case studies. `sample: true` labels an example and excludes its detail page from indexing.
- `src/data/experience.ts` holds work history and local logo paths.
- `src/data/writing.ts` holds typed posts and external publications. `draft: true` excludes a post from listings and direct routes; `sample: true` visibly labels template content. Article headings require unique URL-safe IDs.
- Writing is local; no CMS or additional publishing credentials are required.
- GitHub configuration in `.env.example` is optional. The public graph can render without a token; repository details use the server-side token. Upstream failures must not crash the portfolio.

## Additional verification

- With Node.js 22.18+ or 24, run `node --experimental-strip-types --test tests/content.test.mjs tests/github.test.mjs` for content contracts and mocked GitHub regression tests. The tests make no live GitHub requests.
- `tests/browser-smoke.mjs` exercises a running production server through a dedicated Chromium/Edge debugging session. Run `node --experimental-strip-types tests/browser-smoke.mjs http://localhost:3100 http://127.0.0.1:9223` after starting that server and a separate headless browser with remote debugging on port 9223. Do not attach it to a personal browsing session. Screenshots go to a temporary directory.
- Browser checks cover routes, links, 404s, search/filter/reset, keyboard access, metadata, and widths of 320, 375, 768, 1024, and 1440 pixels.
