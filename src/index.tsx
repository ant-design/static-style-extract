import { createCache, extractStyle as extStyle, StyleProvider } from '@ant-design/cssinjs';
import { renderToString } from 'react-dom/server';
import * as antd from 'antd';
import React from 'react';
import type { CustomRender } from './interface';

const defaultBlackList: string[] = [
  'ConfigProvider',
  'Grid',
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
  Tag: (Tag) => (
    <>
      <Tag color="blue">Tag</Tag>
      <Tag color="success">Tag</Tag>
    </>
  ),
  Badge: (Badge: any) => (
    <>
      <Badge />
      <Badge.Ribbon />
    </>
  ),
  Space: (Space: any) => (
    <>
      <Space />
      <Space.Compact>
        <antd.Button />
      </Space.Compact>
    </>
  ),
  Modal: (Modal: any) => (
    <>
      <Modal />
      <Modal._InternalPanelDoNotUseOrYouWillBeFired />
    </>
  ),
  message: (message: any) => {
    const { _InternalPanelDoNotUseOrYouWillBeFired: PurePanel } = message;
    return <PurePanel />;
  },
  notification: (notification: any) => {
    const { _InternalPanelDoNotUseOrYouWillBeFired: PurePanel } = notification;
    return <PurePanel />;
  },
  Layout: (Layout: typeof antd.Layout) => (
    <>
      <Layout />
      <Layout.Sider />
    </>
  ),
};

interface NodeProps {
  excludes?: string[];
  includes?: string[];
}

const defaultNode = ({ excludes = [], includes }: NodeProps) => {
  const components = includes ?? Object.keys(antd);

  return (
    <>
      {components
        .filter(
          (name) =>
            ![...defaultBlackList, ...excludes].includes(name) && (name[0] === name[0].toUpperCase() || ['notification', 'message'].includes(name)),
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
}

export function extractStyle(arg?: CustomRender | {
  customTheme?: CustomRender,
  excludes?: string[],
  includes?: string[],
}): string {
  const cache = createCache();

  let customTheme: CustomRender | undefined;
  let excludes: string[];
  let includes: string[];
  if (typeof arg === 'function') {
    customTheme = arg;
  } else {
    ({ customTheme, excludes, includes } = arg || {});
  }

  const nodeProps: NodeProps = {
    includes,
    excludes,
  }

  renderToString(
    <StyleProvider cache={cache}>
      {customTheme ? customTheme(defaultNode(nodeProps)) : defaultNode(nodeProps)}
    </StyleProvider>,
  );

  // Grab style from cache
  return extStyle(cache, true);
}
