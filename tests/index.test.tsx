import { extractStyle } from '../src/index';
import { ConfigProvider } from 'antd';

const testGreenColor = '#008000';
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
});
