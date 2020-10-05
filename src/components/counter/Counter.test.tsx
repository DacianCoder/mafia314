import React from 'react'
import { Provider } from 'react-redux'
import { IntlProvider } from 'react-intl'
import configureStore from 'redux-mock-store'
import { render } from '@testing-library/react'
import Counter from './Counter'

describe('Counter', () => {
  const mockStore = configureStore([])
  const store = mockStore({ counterReducer: 42 })

  it('should render counterReducer', () => {
    const wrapper = render(
      <IntlProvider locale="en" messages={{}}>
        <Provider store={store}>
          <Counter />
        </Provider>
      </IntlProvider>
    )
    const countValue = wrapper.getByTestId('counter-value')
    expect(countValue.textContent).toBe('42')
  })
})
