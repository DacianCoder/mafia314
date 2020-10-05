// ***********************************************************
// This example support/index.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import './commands'
// eslint-disable-next-line import/no-extraneous-dependencies
import '@testing-library/cypress/add-commands'
import { configure } from '@testing-library/cypress'
import store from '../../src/store'

configure({ testIdAttribute: 'id' })

if (window.Cypress) {
  window.store = store
}
