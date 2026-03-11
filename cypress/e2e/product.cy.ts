describe('Product scenarios', () => {
  beforeEach(() => {
    cy.loginViaCookie(Cypress.env('standard_user'))
  })

  it('should open the item page when a product is clicked', () => {
    cy.getBySel('item-1-title-link').click()

    cy.url().should('be.equal', `${Cypress.config('baseUrl')}/inventory-item.html?id=1`)
    cy.getBySel('inventory-item-name').should('have.text', 'Sauce Labs Bolt T-Shirt')
  })

  it('should display 1 in the cart badge after adding a product in the inventory page', () => {
    cy.getBySel('add-to-cart-sauce-labs-backpack').click()

    cy.getBySel('shopping-cart-badge').should('have.text', 1)
  })

  it('should display 1 in the cart badge after adding a product in the item page', () => {
    cy.getBySel('item-1-title-link').click()
    cy.getBySel('add-to-cart').click()

    cy.getBySel('shopping-cart-badge').should('have.text', 1)
  })

  it('should remove cart badge after removing a product', () => {
    cy.getBySel('add-to-cart-sauce-labs-backpack').click()
    
    cy.getBySel('remove-sauce-labs-backpack').click()

    cy.getBySel('shopping-cart-badge').should('not.exist')
  })
})