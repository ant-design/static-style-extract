import c from 'picocolors'
import pkg from '../../package.json'

export const ARROW = c.cyan('→')
export const CHECK = c.green('✔')
export const CROSS = c.red('✘')
export const WARN = c.yellow('ℹ')
export const PREFIX = 'antd'

export const cssinjsVersion = pkg.dependencies['@ant-design/cssinjs'];
export const version = pkg.version;
export const name = pkg.name;

export const example = `
import * as React from 'react';
import { ConfigProvider } from 'antd';
export default (node) => React.createElement(ConfigProvider, null, node);
`.trim();
