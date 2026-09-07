# NaferJ Portfolio

Personal portfolio rebuilt with Next.js App Router, React, strict TypeScript, and Tailwind CSS.

## Stack

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS 4
- ESLint
- GitHub Actions
- Dependabot

## Local development

```bash
npm ci
npm run dev
```

Open `http://localhost:3000`.

## Verification

```bash
npm run lint
npm run typecheck
npm run build
```

## Structure

```text
src/app/                         Next.js routes, layouts, and styles
public/                          Static portfolio assets
.ai/                             Planning principles and handoff templates
.devin/rules/                    Devin repository rules
.github/ISSUE_TEMPLATE/          Issue templates
.github/workflows/               CI and project automation
.windsurf/                       Windsurf repository rules
AGENTS.md                        Repository workflow and conventions
```

## Project workflow

Project work is tracked in [NaferJ Portfolio Project #14](https://github.com/users/NaferJ/projects/14).

- Status: Todo, In Progress, In Review, Done
- Priority: High, Medium, Low
- Category: feature, ops, content, tooling, bug
- Sprint: tracked with `sprint-N` labels

The repository owner handles commits, pushes, and pull requests.
