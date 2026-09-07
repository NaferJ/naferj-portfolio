# Portfolio Security Checklist

## Source and secrets

- [ ] No secrets or private data are committed.
- [ ] Environment files are ignored and `.env.example` contains safe placeholders only.
- [ ] Public assets contain no private documents or sensitive metadata.
- [ ] Dependencies are audited before release.

## Application

- [ ] External links use safe target and relationship attributes.
- [ ] User-provided content is never rendered as unsanitized HTML.
- [ ] Forms validate input server-side.
- [ ] Client bundles contain no credentials.
- [ ] Images have meaningful alternative text or are decorative.

## Delivery

- [ ] Production uses HTTPS.
- [ ] Appropriate security headers are configured.
- [ ] Lint, typecheck, and build pass in CI.
- [ ] Dependency alerts are reviewed.
- [ ] Deployment changes have a rollback path.
