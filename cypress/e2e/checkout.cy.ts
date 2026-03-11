import { faker } from '@faker-js/faker'

describe('Checkout scenarios', () => {
  const firstName = faker.person.firstName()
  const lastName = faker.person.lastName()
  const postalCode = faker.location.zipCode()

  beforeEach(() => {
    cy.loginViaCookie(Cypress.env('standard_user'))
  })

  it('should complete the checkout process successfully', () => {
    cy.getBySel('add-to-cart-sauce-labs-backpack').click()
    cy.getBySel('shopping-cart-link').click()
    cy.getBySel('checkout').click()
    cy.getBySel('firstName').type(firstName)
    cy.getBySel('lastName').type(lastName)
    cy.getBySel('postalCode').type(postalCode)
    cy.getBySel('continue').click()
    cy.getBySel('finish').click()

    cy.url().should('contain', '/checkout-complete.html')
    cy.getBySel('title').should('have.text', 'Checkout: Complete!')
    cy.getBySel('complete-header').should('have.text', 'Thank you for your order!')
  })

  describe('Validate errors messages', () => {

    beforeEach(() => {
      cy.visit('/checkout-step-one.html', { failOnStatusCode: false })
    })

    it('should show error when first name is missing', () => {
      cy.getBySel('continue').click()

      cy.checkErrorMsg('Error: First Name is required')
    })

    it('should show error when last name is missing', () => {
      cy.getBySel('firstName').type(firstName)
      cy.getBySel('continue').click()

      cy.checkErrorMsg('Error: Last Name is required')
    })

    it('should show error when Postal Code is missing', () => {
      cy.getBySel('firstName').type(firstName)
      cy.getBySel('lastName').type(lastName)
      cy.getBySel('continue').click()

      cy.checkErrorMsg('Error: Postal Code is required')
    })
  })
})
