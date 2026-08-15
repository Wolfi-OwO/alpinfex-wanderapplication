# Contributing to Alpinfex

This project is **archived**. It is kept public because the code is worth
reading, not because it is being developed further. Issues and pull requests are
read and answered when time allows — treat any change as best effort, and expect
no release to follow it.

That said, if you want to build on it, here is how to get it running.

## Getting set up

Prerequisites: Node.js ≥ 20 and a local MongoDB.

```bash
git clone https://github.com/Wolfi-OwO/alpinfex-wanderapplication
cd alpinfex-wanderapplication

# Backend
cd app/server
npm install
cp .env.example .env        # adjust MONGO_URL / PORT if needed
npm run dev                 # Express on http://localhost:8080

# Frontend (separate terminal)
cd app/client
npm install
npm run dev                 # Vite dev server on http://localhost:5173
```

Never commit the `.env` itself — only `app/server/.env.example`, which documents
the variables without their values.

## Tests

The server suite is an integration suite: it talks to a real MongoDB and drops
its own database between runs, so one has to be reachable.

```bash
cd app/server
npm test
```

The test script pins `MONGO_URL=mongodb://localhost:27017/TestTours`, which is
also what CI provides. If port 8080 is already taken on your machine the suite
fails at import with `EADDRINUSE` — the server starts listening as soon as it is
imported. Run it with a free port instead:

```bash
PORT=8099 npm test
```

## Code style

- ESLint is the only formatter of record: `cd app/client && npm run lint` must
  come back clean. The server has no lint script; follow the surrounding style.
- Four-space indentation, single quotes, semicolons. `.editorconfig` covers the
  rest.
- Comments explain **why**, not what. A comment restating the line above it is
  noise.
- Everything written down — comments, docs, commit messages — is in English.
  The user-facing UI strings are German; leave them that way.

## Commit messages

Clear, imperative, one line of subject:
`Return 400 instead of 500 for rejected GPX uploads`.
[Conventional Commits](https://www.conventionalcommits.org/) are welcome but not
required.

## Before opening a pull request

1. `cd app/server && npm test` — 12 tests, all passing.
2. `cd app/client && npm run lint && npm run build`.
3. Add a `CHANGELOG.md` entry if the change is user-visible.

CI runs exactly those commands on Node 20 against a `mongo:7` service container.

## Reporting bugs

Use [GitHub issues](https://github.com/Wolfi-OwO/alpinfex-wanderapplication/issues).
For security problems, **do not** open a public issue — see
[SECURITY.md](SECURITY.md).

By contributing you agree that your contributions are licensed under the
project's [MIT License](LICENSE) and that you abide by the
[Code of Conduct](CODE_OF_CONDUCT.md).
