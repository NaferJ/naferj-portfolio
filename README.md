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

## Make it yours

The site works without a CMS. Personal content lives in these files:

| File | Edit here |
| --- | --- |
| `src/data/site.ts` | Name, biography, avatar, focus areas, contact details, navigation, production URL |
| `src/data/projects.ts` | Project names, descriptions, technology stacks, optional live links, and case studies |
| `src/data/experience.ts` | Companies, roles, dates, and logos |
| `src/data/writing.ts` | Articles, dates, topics, and external publications |

Project and article detail pages are generated from each entry's `slug`. Keep slugs unique and use lowercase words separated by hyphens. Dates use `YYYY-MM-DD`.

### Publishing locally

Add a post to `posts` in `src/data/writing.ts`. The article body supports paragraphs, headings, quotes, lists, and code blocks; the existing samples show every supported block. Give each heading a unique `id` for the article's table of contents. Reading times, recent-writing links, search results, and topic filters update automatically.

- `draft: true` keeps a post out of listings and makes its detail route unavailable.
- `sample: true` visibly marks template content and prevents its detail page from being indexed. Remove this flag after replacing the example with your own work.
- Add links to books, papers, or guest articles in the `publications` array. An honest empty state is shown until you have something to add.
- Local content changes require a new production build/deployment. No external publishing account is needed.

### Before launch

1. Replace the sample projects and posts, and review the existing biography and work history.
2. Set `site.url` to your real production origin. It is intentionally blank; social preview URLs use localhost during local development.
3. Add `site.email` if you want the contact button to open an email composer. Otherwise it links to your GitHub profile. Update the contact description to match.
4. Set `site.indexable` to `true` when your content is ready. Until then, the whole template requests no indexing and the sitemap is empty. Sample detail pages stay excluded even after launch.
5. Run the verification commands, then build/deploy with the standard Next.js workflow. The generated social image and favicon already match the site design.

The GitHub graph is optional. `.env.example` lists its settings; never put a real token in source control. Public activity can render without a token, repository details need a server-side token, and upstream failures show a fallback rather than breaking the site.

## Regression checks

With Node.js 22.18+ or 24:

```bash
node --experimental-strip-types --test tests/content.test.mjs tests/github.test.mjs
```

These checks validate content and mock GitHub responses, including offline behavior and private-repository exclusion. Browser smoke-test setup is recorded in `AGENTS.md`.

## Project workflow

Project work is tracked in [NaferJ Portfolio Project #14](https://github.com/users/NaferJ/projects/14).

- Status: Todo, In Progress, In Review, Done
- Priority: High, Medium, Low
- Category: feature, ops, content, tooling, bug
- Sprint: tracked with `sprint-N` labels

The repository owner handles commits, pushes, and pull requests.
