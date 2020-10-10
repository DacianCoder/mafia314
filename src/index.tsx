import React from 'react'
import ReactDOM from 'react-dom'
import { IntlProvider } from 'react-intl'
import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'

import './index.css'

import messages from './i18n/en.json'

import App from './App'
import theme from './config/theme'

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <BrowserRouter>
      <IntlProvider locale="en" messages={messages}>
        <CssBaseline />
        <App />
      </IntlProvider>
    </BrowserRouter>
  </ThemeProvider>,
  document.getElementById('root')
)
