<div align="center">

# Alpinfex — Tour Dashboard

**A full-stack web app for alpine tour documentation — upload a GPX track and get a
tour profile with elevation data, distance, difficulty and a photo gallery, rendered
on an interactive map.**

[![CI](https://github.com/Wolfi-OwO/alpinfex-wanderapplication/actions/workflows/ci.yml/badge.svg)](https://github.com/Wolfi-OwO/alpinfex-wanderapplication/actions/workflows/ci.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](./LICENSE)
![React](https://img.shields.io/badge/React-18-61dafb?logo=react&logoColor=black)
![Vite](https://img.shields.io/badge/Vite-6-646cff?logo=vite&logoColor=white)
![Node](https://img.shields.io/badge/Node-%E2%89%A520-339933?logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/Express-4-000000?logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-Mongoose-47A248?logo=mongodb&logoColor=white)
![Leaflet](https://img.shields.io/badge/Leaflet-maps-199900?logo=leaflet&logoColor=white)

</div>

`alpinfex-wanderapplication` is the Alpine experience dashboard ("Alpinfex") for hiking,
high-alpine, ski and bike tours. Tours are uploaded as GPX files; the backend parses the
track, derives elevation up/down/min/max, distance, and difficulty ratings, and stores
everything in MongoDB. The React frontend lists tours, shows each track on a Leaflet map
with elevation details, and hosts a photo gallery per tour.

---

## Features

- **GPX tour upload** — upload a track, the server extracts elevation profile and distance.
- **Tour catalog** — every tour with heading, type, difficulty and technique/condition ratings.
- **Interactive map** — each tour rendered on Leaflet with its track points.
- **Photo gallery** — images attached to a tour, served from MongoDB GridFS-style buffers.
- **Admin layout** — separate layout for tour administration and profiles.
- **Responsive UI** — Bootstrap 5 with an animated, type-effect header.

## Tech stack

| Layer    | Technology |
|----------|------------|
| Frontend | React 18, Vite 6, React Router 7, Leaflet, Bootstrap 5 |
| Backend  | Node.js, Express 4, Multer, Sharp, xml2js, `@we-gold/gpxjs` |
| Database | MongoDB (Mongoose 8) |
| Tooling  | ESLint 9, Prettier, Mocha (server tests), GitHub Actions |

## Architecture overview

```
                    ┌──────────────────────────┐
                    │        React client       │
                    │  Vite dev server (5173)   │
                    └─────────────┬────────────┘
                                  │  /api/*  (fetch → localhost:8080)
                    ┌─────────────▼────────────┐
                    │     Express server        │
                    │   server.js (port 8080)   │
                    └──────┬──────────────┬─────┘
                           │              │
              ┌────────────▼─────┐   ┌────▼──────────────────┐
              │ tourRouter       │   │ imageRouter           │
              │ /api/tours       │   │ /api/images           │
              └────────────┬─────┘   └────┬──────────────────┘
                           │              │
                    ┌──────▼──────────────▼─────┐
                    │         MongoDB           │
                    │  Tours, Images collections │
                    └───────────────────────────┘
```

The Express server serves the built client (`client/dist`) as static files and exposes
the JSON API under `/api`. In development the two run separately; the client talks to the
API at `http://localhost:8080`.

## API endpoints

All routes are prefixed with `/api`.

| Method | Route            | Description                                    |
|--------|------------------|------------------------------------------------|
| GET    | `/tours`         | List all tours (thumbnail populated)           |
| GET    | `/tours/:id`     | Fetch a single tour (image ids populated)      |
| POST   | `/tours`         | Create a tour — `multipart/form-data`, field `xml_file` (GPX file) |
| DELETE | `/tours/:id`     | Delete a tour                                  |
| GET    | `/images`        | List all images                                |
| GET    | `/images/:id`    | Fetch a single image buffer                    |

Example request:

```bash
curl -X POST http://localhost:8080/api/tours \
  -F "heading=Großer Priel" \
  -F "type=Hochtour" \
  -F "difficulty=Schwer" \
  -F "technique=4" \
  -F "condition=3" \
  -F "description=... (details)" \
  -F "xml_file=@track.gpx"
```

## Getting started

Prerequisites: Node.js ≥ 20, MongoDB running locally.

```bash
# 1. Backend
cd app/server
npm install
cp .env.example .env        # adjust MONGO_URL / PORT if needed
npm run dev                 # Express on http://localhost:8080

# 2. Frontend (separate terminal)
cd app/client
npm install
npm run dev                 # Vite dev server on http://localhost:5173
```

Open `http://localhost:5173` in the browser. The client is configured to call the API at
`http://localhost:8080`.

### Production build

```bash
cd app/client && npm run build      # outputs client/dist
cd ../server && npm start           # serves client/dist + API on :8080
```

### Tests

The server test suite runs against a separate MongoDB database and requires a local
MongoDB instance:

```bash
cd app/server
npm test
```

## Environment variables

| Variable   | Default                       | Description                     |
|------------|-------------------------------|---------------------------------|
| `MONGO_URL`| `mongodb://localhost:27017/_tour` | MongoDB connection string   |
| `HOST`     | `localhost`                   | Bind host                      |
| `PORT`     | `8080`                        | Bind port                      |
| `NODE_ENV` | —                             | `testing` switches to the test DB |
| `LOGGER`   | —                             | `false` disables console logging  |

## License

[MIT](./LICENSE) — © 2026 [Phillip Kofler](https://github.com/Wolfi-OwO).
