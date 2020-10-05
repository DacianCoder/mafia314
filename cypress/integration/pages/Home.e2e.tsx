/// <reference path="../../support/index.d.ts" />

// @ts-ignore
describe('HomePage', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('should render Counter components and increment store by 3', () => {
    cy.get('body').find('strong[id=counter-value]').should('exist')
    cy.get('body').find('strong[id=counter-value]').should('contain', '0')
    cy.get('.group > :nth-child(2)').click()
    cy.get('strong[id=counter-value]').should('contain', '3')
  })

  it('should update ui when incrementBy action is dispatched', () => {
    cy.incrementCounterReducer(2)
    cy.incrementCounterReducer()
    cy.get('body').find('strong[id=counter-value]').should('exist')
    cy.get('strong[id=counter-value]').should('contain', '5')
  })
})
