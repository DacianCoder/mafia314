import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { IntlProvider } from 'react-intl'
import store from './store'

import './index.css'

import messages from './i18n/en.json'

import App from './App'

ReactDOM.render(
  <Provider store={store}>
    <IntlProvider locale="en" messages={messages}>
      <App />
    </IntlProvider>
  </Provider>,
  document.getElementById('root')
)

// @ts-ignore Add store on window when running e2e tests
if (window.Cypress) window.store = store
