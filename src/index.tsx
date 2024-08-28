import {
  createCache,
  extractStyle as extStyle,
  StyleProvider,
} from '@ant-design/cssinjs';
import * as antd from 'antd';
import React from 'react';
import { renderToString } from 'react-dom/server';
import type { CustomRender } from './interface';

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

const ComponentCustomizeRender: Record<
  string,
  (component: React.ComponentType<any>) => React.ReactNode
> = {
  Affix: (Affix) => (
    <Affix>
      <div />
    </Affix>
  ),
  BackTop: () => <antd.FloatButton.BackTop />,
  Dropdown: (Dropdown) => (
    <Dropdown menu={{ items: [] }}>
      <div />
    </Dropdown>
  ),
  Menu: (Menu) => <Menu items={[]} />,
  QRCode: (QRCode) => <QRCode value="https://ant.design" />,
  Tree: (Tree) => <Tree treeData={[]} />,
};

const defaultNode = () => (
  <>
    {Object.keys(antd)
      .filter(
        (name) =>
          !blackList.includes(name) && name[0] === name[0].toUpperCase(),
      )
      .map((compName) => {
        const Comp = antd[compName];

        const renderFunc = ComponentCustomizeRender[compName];

        if (renderFunc) {
          return (
            <React.Fragment key={compName}>{renderFunc(Comp)}</React.Fragment>
          );
        }

        return <Comp key={compName} />;
      })}
  </>
);

export function extractStyle(customTheme?: CustomRender): string {
  const cache = createCache();
  renderToString(
    <StyleProvider cache={cache}>
      {customTheme ? customTheme(defaultNode()) : defaultNode()}
    </StyleProvider>,
  );

  // Grab style from cache
  const styleText = extStyle(cache, true);

  return styleText;
}
