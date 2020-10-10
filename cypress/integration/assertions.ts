/**
 * Assert that current page is the login page
 */
export const assertIsOnLoginPage = () => {
  cy.get('button').should('exist')
  cy.get('button').should('contain.text', 'Sign in')
  cy.get('.MuiTypography-root').should('exist')
  cy.get('.MuiTypography-root').should('contain.text', 'Mafia 3.14')
}
