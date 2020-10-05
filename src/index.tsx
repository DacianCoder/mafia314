import React from 'react'
import ReactDOM from 'react-dom'
import { IntlProvider } from 'react-intl'
import { ThemeProvider } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'

import './index.css'

import messages from './i18n/en.json'

import App from './App'
import theme from './config/theme'

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <IntlProvider locale="en" messages={messages}>
      <CssBaseline />
      <App />
    </IntlProvider>
  </ThemeProvider>,
  document.getElementById('root')
)

// @ts-ignore Add store on window when running e2e tests
if (window.Cypress) window.store = store
