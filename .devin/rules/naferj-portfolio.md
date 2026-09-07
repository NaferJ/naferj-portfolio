# Devin Rules — NaferJ Portfolio

This repository is NaferJ's personal portfolio, built with Next.js App Router, React, strict TypeScript, and Tailwind CSS.

## Working branch

- Never work directly on `main`.
- Use one logical concern per branch.
- Branch prefixes: `feat/`, `fix/`, `design/`, `content/`, `tooling/`, `docs/`, or `rebuild/`.
- Never commit or push. The repository owner handles Git writes.

## Language and style

- English only in code, comments, logs, identifiers, and commit messages.
- Do not add emojis.
- Use strict TypeScript without `any` or non-null assertions.
- Use the `@/*` alias for imports from `src/*`.
- Prefer compact, single-purpose components and avoid unnecessary abstractions.

## Next.js conventions

- Use App Router under `src/app`.
- Keep pages and layouts server-rendered unless browser interaction requires a client component.
- Use semantic HTML, visible focus states, keyboard support, and meaningful alternative text.
- Use `next/image`, `next/font`, and metadata APIs where appropriate.
- Keep reusable components in `src/components` and typed content in `src/data`.
- Keep secrets server-side and document safe placeholders in `.env.example`.

## Scope discipline

- Make only the requested change.
- Do not redesign unrelated sections.
- Present options when a product or design decision materially changes the portfolio.

## Verification

Before handoff, run:

- `npm run lint`
- `npm run typecheck`
- `npm run build`
