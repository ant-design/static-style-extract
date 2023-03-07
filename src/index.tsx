import {
  createCache,
  extractStyle as extStyle,
  StyleProvider,
} from '@ant-design/cssinjs';
import * as Antd from 'antd';
import { renderToString } from 'react-dom/server';
import type { ExtractStyleParams } from './interface';
const blackList: string[] = [
  'ConfigProvider',
  'Drawer',
  'Grid',
  'Modal',
  'Popconfirm',
  'Popover',
  'Tooltip',
  'Tour'
];


const defaultNode = () => (
  <>
    {Object.keys(Antd)
      .filter((name) => !blackList.includes(name) && name[0] === name[0].toUpperCase())
      .map((compName) => {
        const Comp = Antd[compName];
        switch (compName) {
          case 'Button':
          case 'Space':
          case 'Card':
          case 'Checkbox':
          case 'Radio':
          case 'Form':
          case 'Upload':
          case 'Badge':
          case 'Tag':
          case 'Affix':
          case 'FloatButton':
            return <Comp key={compName}>test</Comp>;
          case 'Layout':
            return (
              <Antd.Layout key={compName}>
                <Antd.Layout.Header>test</Antd.Layout.Header>
                <Antd.Layout.Content>test</Antd.Layout.Content>
                <Antd.Layout.Footer>test</Antd.Layout.Footer>
                <Antd.Layout.Sider>test</Antd.Layout.Sider>
              </Antd.Layout>
            );
          case 'Menu':
          case 'Tabs':
          case 'Timeline':
          case 'Breadcrumb':
          case 'Anchor':
            return <Comp key={compName} items={[]} />;
          case 'Dropdown':
            return (
              <Comp
                key={compName}
                menu={{ items: [{ key: 'test', label: 'test' }] }}
              >
                <div>test</div>
              </Comp>
            );
          case 'Divider':
          case 'DatePicker':
          case 'TimePicker':
          case 'Input':
          case 'InputNumber':
          case 'Rate':
          case 'Slider':
          case 'Switch':
          case 'Calendar':
          case 'Avatar':
          case 'Empty':
          case 'Image':
          case 'Progress':
          case 'Result':
          case 'Skeleton':
          case 'Spin':
          case 'Carousel':
            return <Comp key={compName} />;
          case 'Pagination':
            return <Comp key={compName} defaultCurrent={1} total={50} />;
          case 'Steps':
            return <Comp key={compName} current={1} items={[]} />;
          case 'AutoComplete':
          case 'Cascader':
          case 'Mentions':
          case 'Select':
          case 'Segmented':
            return <Comp key={compName} options={[]} />;
          case 'Transfer':
            return <Comp key={compName} dataSource={[]} />;
          case 'TreeSelect':
          case 'Tree':
            return <Comp key={compName} treeData={[]} />;
          case 'Collapse':
            return (
              <Antd.Collapse key={compName}>
                <Antd.Collapse.Panel header="This is panel header 1" key="1">
                  test
                </Antd.Collapse.Panel>
              </Antd.Collapse>
            );
          case 'Descriptions':
            return (
              <Antd.Descriptions title="test">
                <Antd.Descriptions.Item label="test">
                  test
                </Antd.Descriptions.Item>
              </Antd.Descriptions>
            );

          case 'Typography':
            return (
              <>
                <Comp.Text key={compName}>test</Comp.Text>
                <Comp.Title key={compName}>test</Comp.Title>
                <Comp.Paragraph key={compName}>test</Comp.Paragraph>
              </>
            );

          case 'List':
            return (
              <Antd.List>
                <Antd.List.Item>test</Antd.List.Item>
              </Antd.List>
            );
          case 'QRCode':
          case 'Statistic':
            return <Comp key={compName} value="https://ant.design" />;
          case 'Table':
            return <Comp key={compName} columns={[]} dataSource={[]} />;
          case 'Alert':
            return <Comp key={compName} message="Success Text" />;
          case 'Watermark':
            return <Comp key={compName} content="Success Text" />;
          default:
            return null;
        }
      })}
  </>
);

export function extractStyle(customTheme?: ExtractStyleParams): string {
  const cache = createCache();
  renderToString(
    <StyleProvider cache={cache}>
      {customTheme ? customTheme(defaultNode()) : defaultNode()}
    </StyleProvider>,
  );

  // Grab style from cache
  const styleText = extStyle(cache);

  return styleText;
}
