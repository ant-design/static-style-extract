export const withSpecialClassName = (className: Record<string, string>) => {
  const res: Record<string, string> = {};
  Object.keys(className).forEach((item) => {
    switch (item) {
      case 'AutoComplete':
        res.AutoComplete = 'ant-select-auto-complete';
        break;
      case 'Cascader':
        res.Cascader = 'ant-cascader';
        break;
      case 'TreeSelect':
        res.TreeSelect = 'ant-tree-select';
        break;
      default:
        res[item] = className[item];
        break;
    }
    return item;
  });

  res.Affix = 'ant-affix';
  res.App = 'ant-app';
  res.QrCode = 'ant-qrcode';
  return res;
};
function matchClassName(page: string, className: string): boolean {
    const reg = new RegExp(`class=".*${className}.*"`, 'g');
    return reg.test(page);
}
export const collectAntdComponentsInFirstScreen = (page: string, compClassName: Record<string, string>) => {
  const exclude: string[] = [];
  Object.keys(compClassName).forEach((compName) => {
    if (!matchClassName(page, compClassName[compName])) {
      exclude.push(compName);
    }
  });
  return exclude;
};
