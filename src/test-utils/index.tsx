import React from 'react';
import { render as rtlRender } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { AnyAction } from '@reduxjs/toolkit';

const middlewares = [thunk as any];
const mockStore = configureMockStore<{}, AnyAction>(middlewares);

function render(
  ui: React.ReactElement,
  {
    preloadedState = {},
    store = mockStore(preloadedState),
    ...renderOptions
  } = {}
) {
  function Wrapper({ children }: { children: React.ReactNode }) {
    return <Provider store={store}>{children}</Provider>;
  }
  return {
    store,
    ...rtlRender(ui, { wrapper: Wrapper, ...renderOptions })
  };
}

// Re-export everything
export * from '@testing-library/react';

// Override render method
export { render };
