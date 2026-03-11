import { faker } from '@faker-js/faker'

describe('Login scenarios', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('login with standart user', () => {
    cy.login(Cypress.env('standard_user'), Cypress.env('password'))

    cy.url().should('be.equal', `${Cypress.config('baseUrl')}/inventory.html`)
    cy.getBySel('title').should('have.text', 'Products')
  })

  it('login with non-existent user', () => {
    const randomUser = faker.internet.username()
    const randomPassword = faker.internet.password();

    cy.login(randomUser, randomPassword)

    cy.getBySel('error')
      .should('be.visible')
      .and('contain.text', 'Username and password do not match any user in this service')
  })


})