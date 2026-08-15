# Changelog

All notable changes to this project are documented here.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2026-08-15

Initial public release of the Alpinfex tour dashboard. The project is archived at
this version; no further releases are planned.

### Added

- **GPX tour upload** — `POST /api/tours` accepts a GPX track as
  `multipart/form-data` and derives the tour from it.
- **Elevation profile** — cumulative ascent and descent plus minimum and maximum
  altitude, computed from the track points.
- **Distance and difficulty** — tour length alongside difficulty, technique and
  condition ratings.
- **Interactive map** — each tour rendered on a Leaflet map with its full track.
- **Photo gallery** — images stored per tour, with a thumbnail on the tour card.
- **Tour catalog and admin layout** — Bootstrap 5 frontend listing every tour,
  with a separate layout for administration.
- **Server test suite** — Mocha and Supertest integration tests running against
  a real MongoDB.
