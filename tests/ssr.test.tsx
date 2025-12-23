import { extractStyle } from '../src/index';

// Spy useLayoutEffect to avoid warning
jest.mock('react', () => {
  const oriReact = jest.requireActual('react');
  return {
    ...oriReact,
    useLayoutEffect: oriReact.useEffect,
  };
});

describe('Static-Style-Extract.SSR', () => {
  it('should not produce unexpected warnings', () => {
    const allowedWarnings = [
      'Warning: [antd: List] The `List` component is deprecated. And will be removed in next major version.'
    ]

    const errSpy = jest.spyOn(console, 'error');

    extractStyle();

    const filteredCalls = errSpy.mock.calls.filter(([msg]) => {
      return !allowedWarnings.some((allowed) => msg.includes(allowed));
    })
    
    expect(filteredCalls).toHaveLength(0);
  });
});
