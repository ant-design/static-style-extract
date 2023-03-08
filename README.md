# Static-Style-Extract

Provide a lib like @ant-design/static-style-extract to support generate static css for SSR usage to generate raw css file for caching.

[![NPM version][npm-image]][npm-url] [![build status][github-actions-image]][github-actions-url] [![Test coverage][coveralls-image]][coveralls-url] [![Dependencies][david-image]][david-url] [![DevDependencies][david-dev-image]][david-dev-url] [![npm download][download-image]][download-url] [![bundle size][bundlephobia-image]][bundlephobia-url] [![dumi][dumi-image]][dumi-url]

[npm-image]: http://img.shields.io/npm/v/rc-trigger.svg?style=flat-square
[npm-url]: http://npmjs.org/package/rc-trigger
[github-actions-image]: https://github.com/react-component/trigger/workflows/CI/badge.svg
[github-actions-url]: https://github.com/react-component/trigger/actions
[circleci-image]: https://img.shields.io/circleci/react-component/trigger/master?style=flat-square
[circleci-url]: https://circleci.com/gh/react-component/trigger
[coveralls-image]: https://img.shields.io/coveralls/react-component/trigger.svg?style=flat-square
[coveralls-url]: https://coveralls.io/r/react-component/trigger?branch=master
[david-url]: https://david-dm.org/react-component/trigger
[david-image]: https://david-dm.org/react-component/trigger/status.svg?style=flat-square
[david-dev-url]: https://david-dm.org/react-component/trigger?type=dev
[david-dev-image]: https://david-dm.org/react-component/trigger/dev-status.svg?style=flat-square
[download-image]: https://img.shields.io/npm/dm/rc-trigger.svg?style=flat-square
[download-url]: https://npmjs.org/package/rc-trigger
[bundlephobia-url]: https://bundlephobia.com/result?p=rc-trigger
[bundlephobia-image]: https://badgen.net/bundlephobia/minzip/rc-trigger
[dumi-image]: https://img.shields.io/badge/docs%20by-dumi-blue?style=flat-square
[dumi-url]: https://github.com/umijs/dumi

## Install

```bash
npm install @ant-design/static-style-extract
```

## Usage

```tsx | pure
import extractStyle from `@ant-design/static-style-extract`;

const cssText = extractStyle(); // :where(.css-bAMboOo).ant-btn ...

```

use with custom theme

```tsx | pure
import extractStyle from `@ant-design/static-style-extract`;

const cssText = extractStyle(); // :where(.css-bAMboOo).ant-btn ...

const cssText = extractStyle((node) => (
  <ConfigProvider theme={theme}>
    {node}
  </ConfigProvider>
));
```

## Example

http://localhost:8000

online example: http://react-component.github.io/static-style-extract/

## Development

```
npm install
npm start
```

## Test Case

```
npm test
```

## Coverage

```
npm run coverage
```

open coverage/ dir

## License

static-style-extract is released under the MIT license.
