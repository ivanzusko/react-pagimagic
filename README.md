# Simple starterkit for creating, upgrading and publishing your own **_npm_ package**

If you want to create your own __npm__ package, here is one simple way.

## Installation

Just run:

```
yarn install
```

or

```
npm install
```

## Create module
In `src/index.js` create your module.

In `src/__tests__/index.test.js` create a test to be able to test your module anytime you want (by using command `yarn test` or `npm run test`). Especially important to test before publishing your package (when you will try to publish your package `test` will automatically run for you).

**Note!** In case if you don't want to test your module just remove `__tests__` folder and replace existing `scripts` section in your `package.json` on next:
```
"scripts": {
	"prepublish": "npm run lint && babel --plugins transform-es2015-modules-umd src --ignore __tests__ --out-dir ./dist",
	"lint": "eslint ./src",
	"lintfix": "eslint ./src --fix"
},
```

## Publishing

Run
```
npm publish
```
**NOTE!** After you run `npm publish` command it will run `prepublish` script at first and only then it will run `publish`. So you **don't need** to run `yarn prepublish` or `npm run prepublish` command manually.

## Maintaining
After making some changes in your package, you need to publish the upgraded version according to **[npmjs.org](https://npmjs.org)**.

_**First of all**_, you need to rebuild your package by executing `yarn prepublish` or `npm run prepublish`

_**Secondly**_, you need to commit your changes.

_**And after that**_, depends on what did you fix/change/add in your package you will need to run one from next:
```javascript
npm version patch // if it was fix or some tiny change in README.md. This will change vesion of your package e.g. v0.0.1 -> v0.0.2 in your `package.json`
npm version minor // if it was some not breacking change/addon. This will change vesion of your package e.g. v0.0.1 -> v0.1.0 in your `package.json`
npm version major // if it was huge and/or breacking change. This will change vesion of your package e.g. v0.0.1 -> v1.0.0 in your `package.json`
```

after that you can run `npm publish`.
