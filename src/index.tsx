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
  'Tour',
];

const defaultNode = () => (
  <>
    {Object.keys(Antd)
      .filter(
        (name) =>
          !blackList.includes(name) && name[0] === name[0].toUpperCase(),
      )
      .map((compName) => {
        const Comp = Antd[compName];
        if (compName === 'Dropdown') {
          return (
            <Comp
              key={compName}
              menu={{ items: [{ key: 'test', label: 'test' }] }}
            >
              <div>test</div>
            </Comp>
          );
        }
        return <Comp key={compName} />;
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
