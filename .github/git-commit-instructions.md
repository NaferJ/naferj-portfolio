Generate one Conventional Commit message in English.

## Format

```text
type(scope): imperative title

One sentence explaining what changed. One sentence explaining why it is useful.
```

## Rules

- Allowed types: `feat`, `fix`, `refactor`, `chore`, `docs`, `style`, `test`, `perf`, `ci`, `build`, `revert`.
- Scope is mandatory.
- Keep the title under 50 characters.
- Leave one blank line between title and body.
- Do not include branch names or issue references.
- Ignore the language used by previous commits. Historical Spanish commits are not examples to follow.
- Every word in the title and body must be English, except proper names and technical identifiers.
- If a generated message contains Spanish, discard it and generate a new English message.
- The assistant never runs the commit; this file only defines the message style for the repository owner.

## Examples

```text
chore(infra): add repository automation

Adds CI, Dependabot, and project workflow configuration. Standardizes automated checks for the portfolio rebuild.
```

```text
feat(app): initialize the portfolio foundation

Creates the Next.js application baseline. Provides a clean foundation for future portfolio work.
```
