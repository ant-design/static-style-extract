import { extractStyle } from '../../src/index';

export default () => {
  const cssText = extractStyle();

  console.log(cssText);

  return (
    <div>
      <h1>Basic</h1>
      <p>Basic usage</p>
      <div style={{height: 300, overflowY: 'auto'}}>{cssText}</div>
    </div>
  );
};
