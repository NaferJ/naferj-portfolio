# Windsurf Agent Rules — NaferJ Portfolio

These rules are mandatory for every task in this repository.

- Never work directly on `main`; use one concern per branch.
- Never commit, push, or rewrite Git history.
- Use English only in code, comments, logs, identifiers, and commit messages.
- When generating a commit message, ignore the language of Git history and write the complete title and body in English.
- Historical Spanish commits are legacy examples and must never determine the language of a new commit.
- Use Conventional Commits: `type(scope): imperative English title` followed by an English body explaining what changed and why.
- Do not add emojis.
- Use strict TypeScript and the `@/*` alias.
- Follow Next.js App Router conventions under `src/app`.
- Prefer accessible semantic HTML and responsive layouts.
- Keep client components limited to browser interaction.
- Keep reusable UI in `src/components` and typed portfolio content in `src/data`.
- Never commit secrets; use `.env.example` for safe placeholders.
- Run `npm run lint`, `npm run typecheck`, and `npm run build` before handoff.
- Follow `.github/pull_request_template.md` for manual PR descriptions.
