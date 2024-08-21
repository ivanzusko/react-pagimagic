# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [3.0.0] - 2024-08-19
### Added

- Typescript support
- `ts-standard`

### Fixed

- Accessibility

### Removed

- Redundant dependencies: 
  - `babel-cli`
  - `babel-core`
  - `babel-eslint`
  - `babel-jest`
  - `babel-plugin-transform-es2015-modules-umd`
  - `babel-polyfill`
  - `babel-preset-es2015`
  - `babel-preset-react`
  - `babel-preset-stage-2`
  - `babel-runtime`
  - `eslint`
  - `eslint-plugin-babel`
  - `eslint-plugin-react`
  - `git-validate`
  - `jsdom`
  - `nodemon`


---

## [2.0.0] - 2024-05-01
### Changed

- Upgrade to React 18
- Replace `enzyme` with `@testing-library/react`
- Increase test coverage

---

## [1.4.0] - 2018-01-22
### Removed

- Redundant dependencies.

### Fixed

- Counter.

---

## [1.3.1] - 2018-01-13
### Changed

- Update docs.

### Fixed

- Counter.

---

## [1.3.0] - 2018-01-13
### Added

- Counter. E.g.: `1-10 of 293`.

---

## [1.1.3] - 2018-01-12
### Added

- Pagination breaker: `<` 1 ... 4 **6** 7 ... 13 `>`.

---

## [1.0.0] - 2017-07-26
### Added

- `className` which you pass as a property now will render in all components side by side with `Pagimagic` class. E.g: if you are passing __your-class__ via `className`, than whole block will have `class="Pagimagic your-class"` and in same maner the others will render: `Pagimagic__nav` will become `class="Pagimagic__nav your-class__nav"` and so on.

- `arrow`. If you don't need any default arrows or some text (like `prev` or `next`) than just pass `arrow` property alone (or as anything else except of **function** or any **falsy** value). It will render absolutely empty spans with just a class name, so you will be able change **css** or just live it as is. If `arrow` accept your function to render component - it still will rendered your arrow component in your way. If you pass a falsy value to `arrow` property(e.g. `arrow=""`) - then you will get `prev`/`next` labels instead of arrows.

---
