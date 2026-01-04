import { StyleProvider } from '@ant-design/cssinjs';
import { ConfigProvider } from 'antd';
import type { CssStylesheetAST, CssAtRuleAST } from '@adobe/css-tools';
import { parse, CssTypes } from '@adobe/css-tools';
import { extractStyle } from '../src';
import fs from 'fs';

function extractSelectors(ast: CssStylesheetAST): Set<string> {
  const selectors = new Set<string>();

  function walk(rules: CssAtRuleAST[]) {
    for (const rule of rules) {
      switch (rule.type) {
        case CssTypes.rule:
          rule.selectors?.forEach(sel => selectors.add(sel));
          break;
        case CssTypes.media:
        case CssTypes.supports:
        case CssTypes.layer:
          if (rule.rules) walk(rule.rules);
          break;
        default:
          // Ignore other rule types (comments, keyframes, font-face, etc.)
          break;
      }
    }
  }

  if (ast.stylesheet?.rules) {
    walk(ast.stylesheet.rules);
  }
  return selectors;
}

describe('CSS Coverage', () => {
  it('should extract all antd selectors', () => {
    // Extract CSS with:
    // - hashPriority='high' to avoid :where() wrapper
    // - hashed: false to avoid hash class prefixes
    const extractedCss = extractStyle((node) => (
      <StyleProvider hashPriority="high">
        <ConfigProvider theme={{ hashed: false }}>
          {node}
        </ConfigProvider>
      </StyleProvider>
    ));

    const antdCssPath = require.resolve('antd/dist/antd.css');
    const antdCss = fs.readFileSync(antdCssPath, 'utf-8');

    const antdAst = parse(antdCss);
    const extractedAst = parse(extractedCss);

    const antdSelectors = extractSelectors(antdAst);
    const extractedSelectors = extractSelectors(extractedAst);

    const missing = [...antdSelectors].filter(
      sel => !extractedSelectors.has(sel)
    );

    const coverage = ((antdSelectors.size - missing.length) / antdSelectors.size * 100).toFixed(2);
    console.log(`CSS Coverage: ${coverage}% (${missing.length} missing of ${antdSelectors.size} selectors)`);

    if (missing.length > 0) {
      console.log('Missing selectors:', JSON.stringify(missing, null, 2));
    }

    expect(missing).toEqual([]);
  });
});
