describe('Login scenarios', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('login with standart user', () => {
    cy.login(Cypress.env('standard_user'), Cypress.env('password'))

    cy.url().should('be.equal', `${Cypress.config('baseUrl')}/inventory.html`)
    cy.getBySel('title').should('have.text', 'Products')
  })
})