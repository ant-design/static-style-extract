import { StyleProvider } from '@ant-design/cssinjs';
import { extractStyle } from '../src/index';
import { ConfigProvider } from 'use-testing-antd';

const testGreenColor = '#008000';

jest.mock('antd', () => jest.requireActual('use-testing-antd'));
beforeEach(() => jest.clearAllMocks());

describe('Static-Style-Extract', () => {
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
  it('with custom hashPriority', () => {
    const cssText = extractStyle(
      (node) => (
        <StyleProvider hashPriority='high'>
          <ConfigProvider
            theme={{
              token: {
                colorPrimary: testGreenColor,
              },
            }}
          >
            {node}
          </ConfigProvider>
        </StyleProvider>
      )
    );
    expect(cssText).toContain(testGreenColor);
    expect(cssText).not.toContain(':where');
    expect(cssText).toMatchSnapshot();

    const cssText2 = extractStyle((node) => (
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
    expect(cssText2).toContain(':where');
  });
});
