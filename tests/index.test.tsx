import { Button, ConfigProvider, Input } from 'antd';
import { renderToString } from 'react-dom/server';
import {
  extractStyle,
  getExcludeComponents,
  getUsedStyleByElement,
  getUsedStyleByHTML,
} from '../src/index';

const testGreenColor = '#008000';
const oriConoleError = console.error;
describe('Static-Style-Extract', () => {
  beforeEach(() => {
    console.error = () => {};
  });
  afterEach(() => {
    console.error = oriConoleError;
  });
  it('should extract static styles', () => {
    const cssText = extractStyle();
    expect(cssText).not.toContain(testGreenColor);
    expect(cssText).toMatchSnapshot();
  });
  it('should extract static styles with customTheme', () => {
    const cssText = extractStyle((node) => (
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: testGreenColor,
          },
        }}
      >
        {node}
      </ConfigProvider>
    ));
    expect(cssText).toContain(testGreenColor);
    expect(cssText).toMatchSnapshot();
  });
  it('should extract static styles which had been displayed in first screen', () => {
    const cssText = extractStyle(() => (
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: testGreenColor,
          },
        }}
      >
        <Button>ddd</Button>
        <Input />
      </ConfigProvider>
    ));
    expect(cssText).toContain(testGreenColor);
    expect(cssText).toMatchSnapshot();
  });
  it('getExcludeComponents', () => {
    const data: Record<string, string[]> = {
      '<button type="button" class="ant-btn css-dev-only-do-not-override-1qyasa8 ant-btn-default"><span>ddd</span></button><input class="ant-input css-dev-only-do-not-override-1qyasa8" type="text" value=""/>':
        ['Button', 'Input'],
      '<input class="ant-input css-dev-only-do-not-override-1qyasa8" type="text" value=""/>':
        ['Input'],
      '<button type="button" class="ant-btn css-dev-only-do-not-override-1qyasa8 ant-btn-default"><span>ddd</span></button>':
        ['Button'],
    };
    Object.keys(data).forEach((html) => {
      const exclude = getExcludeComponents(html);
      expect(exclude.every((item) => !data[html].includes(item))).toEqual(true);
    });
  });
  it('getUsedStyleByHTML', () => {
    const html = renderToString(
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: testGreenColor,
          },
        }}
      >
        <Button>ddd</Button>
        <Input />
      </ConfigProvider>,
    );
    const cssText = getUsedStyleByHTML(html);
    expect(cssText).toMatchSnapshot();
  });
  it('getUsedStyleByElement', () => {
    const cssText = getUsedStyleByElement(
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: testGreenColor,
          },
        }}
      >
        <Button>ddd</Button>
        <Input />
      </ConfigProvider>,
    );
    expect(cssText).toMatchSnapshot();
  });
});
