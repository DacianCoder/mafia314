/// <reference path="../../support/index.d.ts" />
import { assertIsOnLoginPage } from '../assertions'

describe('HomePage', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('should render welcome page if user is not logged', () => {
    assertIsOnLoginPage()
  })

  it('should render welcome page if user is not logged and tries to navigate to somewhere else', () => {
    cy.visit('/some/random/path')
    assertIsOnLoginPage()
  })
})
