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
  it('not warning', () => {
    const errSpy = jest.spyOn(console, 'error');

    extractStyle();

    expect(errSpy).not.toHaveBeenCalled();
  });
});
