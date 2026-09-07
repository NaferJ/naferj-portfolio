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
- The assistant never runs the commit; this file only defines the message style for the repository owner.
