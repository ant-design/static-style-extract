import { StyleProvider } from '@ant-design/cssinjs';
import { ConfigProvider } from 'antd';
import { extractStyle } from '../src/index';

const testGreenColor = '#008000';
describe('Static-Style-Extract', () => {
  it('should extract static styles', () => {
    const cssText = extractStyle();
    expect(cssText).not.toContain(testGreenColor);
    expect(cssText).toContain('.ant-btn');
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
  });

  it('with custom hashPriority', () => {
    const cssText = extractStyle((node) => (
      <StyleProvider hashPriority="high">
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
    ));
    expect(cssText).toContain(testGreenColor);
    expect(cssText).not.toContain(':where');

    const cssText2 = extractStyle((node) => (
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: testGreenColor,
          },
          hashed: true
        }}
      >
        {node}
      </ConfigProvider>
    ));
    expect(cssText2).toContain(':where');
  });

  it('whitelist should work', () => {
    const cssText = extractStyle({
      includes: ['Button']
    });
    expect(cssText).toContain('.ant-btn');
    expect(cssText).not.toContain('.ant-select');
  });

  it('blacklist should work', () => {
    const cssText = extractStyle({
      excludes: ['Card']
    });
    expect(cssText).toContain('.ant-btn');
    expect(cssText).toContain('.ant-notification');
    expect(cssText).toContain('.ant-message');
    expect(cssText).not.toContain('.ant-card');
  })

    it('should extract Layout.Sider', () => {
    const cssText = extractStyle();
    expect(cssText).toContain('.ant-layout-sider');
  });
});
