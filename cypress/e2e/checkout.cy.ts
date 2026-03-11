import { faker } from '@faker-js/faker'

describe('Login scenarios', () => {
  beforeEach(() => {
    cy.loginViaCookie(Cypress.env('standard_user'))
  })

  it('should complete the checkout process successfully', () => {
    const firstName = faker.person.firstName()
    const lastName = faker.person.lastName()
    const postalCode = faker.location.zipCode()

    cy.getBySel('add-to-cart-sauce-labs-backpack').click()
    cy.getBySel('shopping-cart-link').click()
    cy.getBySel('checkout').click()
    cy.getBySel('firstName').type(firstName)
    cy.getBySel('lastName').type(lastName)
    cy.getBySel('postalCode').type(postalCode)
    cy.getBySel('continue').click()
    cy.getBySel('finish').click()

    cy.url().should('be.equal', `${Cypress.config('baseUrl')}/checkout-complete.html`)
    cy.getBySel('title').should('have.text', 'Checkout: Complete!')
    cy.getBySel('complete-header').should('have.text', 'Thank you for your order!')
  })
})