# **Change Log** 📜📝

All notable changes to the "**alpinejs-i18n**" WhatItIs/program/extension/API/whatever will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/) and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [Unreleased]

## [2.5.2] - 2025-01-01

## Changed

-   Update package.json

## [2.5.1] - 2025-01-01

## Changed

-   Update package.json

## [2.5.0] - 2025-01-01

## Added

-   Added Typescript definitons (.d.ts files)

## [2.4.2] - 2024-02-22

### Changed

-   Change build script and include README in NPM package.

## Added

-   Minified ESM module file `dist/module.esm.min.js`.

## [2.4.1] - 2023-12-28

### Fixed

-   Complain about the local that was not found, not the current one. (#11)

## [2.4.0] - 2023-04-18

### Fixed

-   Fixed error when accessing unset element with params (#5)

## [2.4.0] - 2022-05-21

## Added

-   Debug mode (#2).

## [2.2.1] - 2021-10-22

### Fixed

-   Fix fallbackLocale, for real.

## [2.2.0] - 2021-10-22

### Fixed

-   Fix fallbackLocale.

## [2.1.1] - 2021-10-22

### Fixed

-   Fix uncaught exception.

## [2.1.0] - 2021-10-22

### Added

-   Added `window.AlpineI18n.fallbackLocale`.

## [2.0.0] - 2021-07-15

### Removed

-   Removed Alpine v2 support in favor of Alpine v3, use v1.0.0 for Alpine v2.
-   Removed `subscribe()` and `updateSubscribers()` in favor of `Alpine.reactive()`.

### Changed

-   Renamed `locale-change` event to `alpine-i18n:locale-change` and make it dispatch to document instead of window.

### Added

-   Added `alpine-i18n:ready` event for when the plugin is loaded

## [1.0.0] - 2021-05-23

-   First stable version! The API wont have any breaking changes till next version.
-   Note: no breaking changes from the last development version.

## [0.0.3] - 2021-05-17

### Improved

-   Improve Typescript support

## [0.0.2] - 2021-05-17

### Improved

-   Improve Typescript support using [`@leanadmin/alpine-typescript`](https://github.com/leanadmin/alpine-typescript)

## [0.0.1] - 2021-05-14

### Changed

-   Use subscription instead of events to update components (Thanks to @KevinBatdorf for suggestion & @ryangjchandler's Spruce)
-   -   The event still exit for it have its use cases

### Added

-   Added Usage from Javascript

## [0.0.0] - 2021-05-14

### Added

-   First version

[unreleased]: https://github.com/pinecone-router/router/compare/2.2.1...HEAD
[0.0.0]: https://github.com/pinecone-router/router/compare/0.0.0...0.0.0
[0.0.1]: https://github.com/pinecone-router/router/compare/0.0.0...0.0.1
[0.0.2]: https://github.com/pinecone-router/router/compare/0.0.1...0.0.2
[0.0.3]: https://github.com/pinecone-router/router/compare/0.0.2...0.0.3
[1.0.0]: https://github.com/pinecone-router/router/compare/0.0.3...1.0.0
[2.0.0]: https://github.com/pinecone-router/router/compare/1.0.0...2.0.0
[2.1.0]: https://github.com/pinecone-router/router/compare/2.0.0...2.1.0
[2.1.1]: https://github.com/pinecone-router/router/compare/2.1.0...2.1.1
[2.2.0]: https://github.com/pinecone-router/router/compare/2.1.1...2.2.0
[2.2.1]: https://github.com/pinecone-router/router/compare/2.2.0...2.2.1
[2.3.0]: https://github.com/pinecone-router/router/compare/2.2.1...2.3.0
[2.4.0]: https://github.com/pinecone-router/router/compare/2.3.0...2.4.0
[2.4.1]: https://github.com/pinecone-router/router/compare/2.4.0...2.4.1
[2.4.2]: https://github.com/pinecone-router/router/compare/2.4.1...2.4.2
[2.5.0]: https://github.com/pinecone-router/router/compare/2.4.2...2.5.0
[2.5.1]: https://github.com/pinecone-router/router/compare/2.5.0...2.5.1
[2.5.2]: https://github.com/pinecone-router/router/compare/2.5.1...2.5.2
