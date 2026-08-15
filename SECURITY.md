# Security Policy

## Status of this project

Alpinfex is **archived**. It is published as a finished piece of work, not as a
maintained product: there are no releases, no deployment, and no support window.
Security reports are still read and still welcome — but a fix, if one is
warranted, lands on `main` and nowhere else.

| Version         | Supported |
| --------------- | --------- |
| `main`          | best effort |
| Anything forked | ❌        |

## Reporting a vulnerability

Please **do not** open a public issue for security vulnerabilities.

Report privately via GitHub's
[private vulnerability reporting](https://github.com/Wolfi-OwO/alpinfex-wanderapplication/security/advisories/new),
or email **KoflerPhillip@outlook.com** with:

- a description of the issue and its impact,
- steps to reproduce or a proof of concept,
- any suggested remediation.

You can expect an acknowledgement within **72 hours** and a status update within
**7 days**. Please allow a reasonable window before any public disclosure.

## Secrets and configuration

No credentials belong in this repository. Everything the server needs is read
from environment variables; `app/server/.env.example` documents the shape and is
the only env file that is tracked. `.env` and `.env.*` are gitignored and must
stay that way.

An earlier revision of this project did carry a plaintext password in a
committed `.env`. It was removed before publication, and the gitleaks job runs
over the full history — not just the tip commit — so a regression of that shape
fails CI.

## Automated scanning

Every push and pull request, plus a weekly schedule, runs:

- **gitleaks** — secret scanning across the full git history.
- **CodeQL** — static analysis of the JavaScript source (results in the GitHub
  Security tab).
- **Dependabot** — monthly dependency and GitHub Actions updates.

## Known limitations

The application has no authentication layer. The admin routes are reachable by
anyone who can reach the server, so do not expose an instance to the public
internet.
