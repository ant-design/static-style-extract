/**
 * coped from https://ant.design/docs/react/server-side-rendering-cn
 * > npx @ant-design/static-style-extract@latest -i ./docs/examples/_example.tsx
 */
import * as React from 'react';
import { ConfigProvider } from 'antd';

const testGreenColor = '#008000';
const testRedColor = '#ff0000';

// Not a React component (Pure function)
export default (node) => (
  <>
    <ConfigProvider
      theme={{
        token: {
          colorBgBase: testGreenColor,
        },
      }}
    >
      {node}
    </ConfigProvider>
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: testGreenColor,
        },
      }}
    >
      <ConfigProvider
        theme={{
          token: {
            colorBgBase: testRedColor,
          },
        }}
      >
        {node}
      </ConfigProvider>
    </ConfigProvider>
  </>
)