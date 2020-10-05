// in cypress/support/index.d.ts
// load type definitions that come with Cypress module
/// <reference types="cypress" />

declare namespace Cypress {
  interface Chainable {
    /**
     * Custom command to increment the state of the CounterReducer by a given value or default value 3
     * @example cy.incrementCounterReducer()
     *
     * @param incrementBy
     */
    incrementCounterReducer(incrementBy?: number): Chainable<Element>
  }
}
