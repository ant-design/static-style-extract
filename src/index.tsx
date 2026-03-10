import {
  createCache,
  extractStyle as extStyle,
  StyleProvider,
} from '@ant-design/cssinjs';
import * as originAntd from 'antd';
import React from 'react';
import { renderToString } from 'react-dom/server';
import type { CustomRender } from './interface';

const defaultBlackList: string[] = ['ConfigProvider', 'Grid'];

const getComponentCustomizeRender = (
  antdInstance: typeof originAntd,
): Record<
  string,
  (component: React.ComponentType<any>) => React.ReactNode
> => ({
  Affix: (Affix) => (
    <Affix>
      <div />
    </Affix>
  ),
  BackTop: () => <antdInstance.FloatButton.BackTop />,
  Cascader: (Cascader: typeof antdInstance.Cascader) => (
    <>
      <Cascader />
      <Cascader.Panel />
    </>
  ),
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
  Space: (Space: typeof antdInstance.Space) => (
    <>
      <Space />
      <Space.Compact>
        <antdInstance.Button />
        <Space.Addon>1</Space.Addon>
      </Space.Compact>
    </>
  ),
  Input: (Input: typeof antdInstance.Input) => (
    <>
      <Input />
      <Input.Group>
        <Input />
        <Input />
      </Input.Group>
      <Input.Search />
      <Input.TextArea />
      <Input.Password />
      <Input.OTP />
    </>
  ),
  Modal: (Modal: typeof antdInstance.Modal) => (
    <>
      <Modal />
      <Modal._InternalPanelDoNotUseOrYouWillBeFired />
      <Modal._InternalPanelDoNotUseOrYouWillBeFired type="confirm" />
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
  Layout: (Layout: typeof antdInstance.Layout) => (
    <Layout>
      <Layout.Header>Header</Layout.Header>
      <Layout.Sider>Sider</Layout.Sider>
      <Layout.Content>Content</Layout.Content>
      <Layout.Footer>Footer</Layout.Footer>
    </Layout>
  ),
});

interface NodeProps {
  excludes?: string[];
  includes?: string[];
  antdInstance: typeof originAntd;
}

const defaultRenderNode = ({
  excludes = [],
  includes,
  antdInstance,
}: NodeProps) => {
  const components = includes ?? Object.keys(antdInstance);
  const componentCustomizeRender = getComponentCustomizeRender(antdInstance);

  return (
    <>
      {components
        .filter(
          (name) =>
            ![...defaultBlackList, ...excludes].includes(name) &&
            (name[0] === name[0].toUpperCase() ||
              ['notification', 'message'].includes(name)),
        )
        .map((compName) => {
          const Comp = antdInstance[compName];

          const renderFunc = componentCustomizeRender[compName];

          if (renderFunc) {
            return (
              <React.Fragment key={compName}>{renderFunc(Comp)}</React.Fragment>
            );
          }

          return <Comp key={compName} />;
        })}
    </>
  );
};

export interface ExtractStyleOptions {
  customTheme?: CustomRender;
  excludes?: string[];
  includes?: string[];
  antdInstance?: typeof originAntd;
}

export function extractStyle(arg?: CustomRender | ExtractStyleOptions): string {
  const cache = createCache();

  let customTheme: CustomRender | undefined;
  let excludes: string[];
  let includes: string[];
  let customAntd: typeof originAntd | undefined;
  if (typeof arg === 'function') {
    customTheme = arg;
  } else {
    ({ customTheme, excludes, includes, antdInstance: customAntd } = arg || {});
  }

  const antdInstance = customAntd || originAntd;

  const nodeProps: NodeProps = {
    includes,
    excludes,
    antdInstance,
  };

  renderToString(
    <StyleProvider cache={cache}>
      {customTheme
        ? customTheme(defaultRenderNode(nodeProps))
        : defaultRenderNode(nodeProps)}
    </StyleProvider>,
  );

  // Grab style from cache
  return extStyle(cache, true);
}
