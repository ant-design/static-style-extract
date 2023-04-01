import {
  createCache,
  extractStyle as extStyle,
  StyleProvider,
} from '@ant-design/cssinjs';
import * as antd from 'antd';
import { renderToString } from 'react-dom/server';
import type { ExtractStyleParams } from './interface';
import { collectAntdComponentsInFirstScreen, withSpecialClassName } from './utils';
const blackList: string[] = [
  'ConfigProvider',
  'Drawer',
  'Grid',
  'Modal',
  'Popconfirm',
  'Popover',
  'Tooltip',
  'Tour',
];

const styleTagReg = /<style[^>]*>([\s\S]*?)<\/style>/g;
const classReg = /class="[^\s]*(ant-[^\s"]*).*"/;

const classNameMap: Record<string, string> = {};

const defaultNode = (isCollect = false, exclude: string[] = []) => (
  <>
    {Object.keys(antd)
      .filter(
        (name) =>
          !blackList.includes(name) &&
          name[0] === name[0].toUpperCase() &&
          !exclude.includes(name),
      )
      .map((compName) => {
        const Comp = antd[compName];

        if (compName === 'Dropdown') {
          if (isCollect) {
            const h = renderToString(
              <Comp key={compName} menu={{ items: [] }}>
                <div />
              </Comp>,
            );
            const className = h.match(classReg)?.[1];
            classNameMap[compName] = className;
          }
          return (
            <Comp key={compName} menu={{ items: [] }}>
              <div />
            </Comp>
          );
        }
        if (isCollect) {
          const h = renderToString(<Comp />);
          const className = h.match(classReg)?.[1];
          classNameMap[compName] = className;
        }
        return <Comp key={compName} />;
      })}
  </>
);

export function getExcludeComponents(html: string) {
  // 1. collect all components className
  defaultNode(true);

  const exclude = collectAntdComponentsInFirstScreen(html, withSpecialClassName(classNameMap));
  return exclude;
}

export function getUsedStyleByHTML(html: string) {
  const exclude = getExcludeComponents(html);
  const cache = createCache();
  renderToString(
    <StyleProvider cache={cache}>
      {defaultNode(false, exclude)}
    </StyleProvider>,
  );

  // Grab style from cache
  const styleText = extStyle(cache);

  return styleText.replace(styleTagReg, '$1');
}

export function getUsedStyleByElement(element: React.ReactElement) {
  const html = renderToString(element);
  return getUsedStyleByHTML(html);
}

export function extractStyle(customTheme?: ExtractStyleParams): string {
  // 2. collect the components which do not displayed in first screen
  const html = renderToString(
    customTheme ? customTheme(defaultNode(false)) : defaultNode(),
  );
  const exclude = getExcludeComponents(html);

  const cache = createCache();
  renderToString(
    <StyleProvider cache={cache}>
      {customTheme ? customTheme(defaultNode(false, exclude)) : defaultNode(false, exclude)}
    </StyleProvider>,
  );

  // Grab style from cache
  const styleText = extStyle(cache);

  return styleText.replace(styleTagReg, '$1');
}
