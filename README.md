# repro-immer-sourcemaps

Reproduces webpack warning related to source maps when using immer 5.1.0.

## Steps:

```bash
git clone https://github.com/ivan-aksamentov/repro-immer-sourcemaps
cd repro-immer-sourcemaps
yarn install
yarn dev

```

(`yarn dev` is equivalent to
`NODE_ENV=development BABEL_ENV=development webpack`)

Webpack will emit the following warning:

```
WARNING in ./node_modules/immer/dist/immer.module.js
Module Warning (from ./node_modules/source-map-loader/index.js):
(Emitted value instead of an instance of Error) Cannot find source file '../node_modules/tslib/tslib.es6.js': Error: Can't resolve '../node_modules/tslib/tslib.es6.js' in '/home/ia/projects/repro-immer-sourcemaps/node_modules/immer/dist'
 @ ./index.js 1:0-31 2:12-17
 @ multi ./index.js

```

The warning is due to incorrect `sources` path entry in
`node_modules/immer/dist/immer.module.js.map`:

```json
{
  "version": 3,
  "file": "immer.module.js",
  "sources": [
    "../node_modules/tslib/tslib.es6.js"
  ],
  ...
}

```

In this case, source map assumes that `tslib.es6.js` is available in
`../node_modules/tslib/tslib.es6.js` (that is inside
`<project_root>/node_modules/immer/node_modules/tslib`), but it may not be the
case, for example if using `yarn` as a package manager, which may hoist
dependencies. In general, source maps should not make such assumptions.

Reported as <TODO>
