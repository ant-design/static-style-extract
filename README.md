# @ant-design/static-style-extract

Provide a lib like `@ant-design/static-style-extract` to support generate static css for SSR usage to generate raw css file for caching.

[![NPM version][npm-image]][npm-url] [![build status][github-actions-image]][github-actions-url] [![Test coverage][codecov-image]][codecov-url] [![npm download][download-image]][download-url] [![bundle size][bundlephobia-image]][bundlephobia-url] [![dumi][dumi-image]][dumi-url]

[npm-image]: http://img.shields.io/npm/v/@ant-design/static-style-extract.svg?style=flat-square
[npm-url]: http://npmjs.org/package/@ant-design/static-style-extract
[github-actions-image]: https://github.com/ant-design/static-style-extract/actions/workflows/main.yml/badge.svg
[github-actions-url]: https://github.com/ant-design/static-style-extract/actions/workflows/main.yml
[codecov-image]: https://img.shields.io/codecov/c/github/ant-design/static-style-extract/master.svg?style=flat-square
[codecov-url]: https://app.codecov.io/gh/ant-design/static-style-extract
[download-image]: https://img.shields.io/npm/dm/@ant-design/static-style-extract.svg?style=flat-square
[download-url]: https://npmjs.org/package/@ant-design/static-style-extract
[bundlephobia-url]: https://bundlephobia.com/result?p=@ant-design/static-style-extract
[bundlephobia-image]: https://badgen.net/bundlephobia/minzip/@ant-design/static-style-extract
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

use with blacklist or whitelist

```tsx | pure
import extractStyle from `@ant-design/static-style-extract`;

const cssText = extractStyle({
  includes: ['Button'] // Only Button style will be extracted
});
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

`@ant-design/static-style-extract` is released under the MIT license.
