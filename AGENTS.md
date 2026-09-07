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

- `npm ci` — install exactly from `package-lock.json`
- `npm run dev` — start the development server
- `npm run lint` — run ESLint
- `npm run typecheck` — run TypeScript without emitting files
- `npm run build` — create the production build
- `npm run start` — serve the production build

## Code conventions

- English only in code, comments, logs, identifiers, and commit messages.
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
