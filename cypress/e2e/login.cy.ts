import { faker } from '@faker-js/faker'

describe('Login scenarios', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('login with standart user', () => {
    cy.login(Cypress.env('standard_user'), Cypress.env('password'))

    cy.url().should('contain', '/inventory.html')
    cy.getBySel('title').should('have.text', 'Products')
  })

  it('login with non-existent user', () => {
    const randomUser = faker.internet.username()
    const randomPassword = faker.internet.password();

    cy.login(randomUser, randomPassword)

    cy.checkErrorMsg('Username and password do not match any user in this service')
  })

  it('logout', () => {
    cy.loginViaCookie(Cypress.env('standard_user'))
    
    cy.get('#react-burger-menu-btn').click()
    cy.getBySel('logout-sidebar-link')
      .should('be.visible')
      .click()

    cy.url().should('be.equal', `${Cypress.config('baseUrl')}/`)
    cy.getBySel('login-button').should('be.visible')
  })
})