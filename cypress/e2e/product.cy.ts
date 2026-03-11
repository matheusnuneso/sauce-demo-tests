describe('Product scenarios', () => {
  beforeEach(() => {
    cy.loginViaCookie(Cypress.env('standard_user'))
  })

  it('should open the item page when a product is clicked', () => {
    cy.getBySel('item-1-title-link').click()

    cy.url().should('contain', '/inventory-item.html?id=1')
    cy.getBySel('inventory-item-name').should('have.text', 'Sauce Labs Bolt T-Shirt')
  })

  it('adding a product in inventory page', () => {
    cy.getBySel('add-to-cart-sauce-labs-backpack').click()

    cy.getBySel('remove-sauce-labs-backpack').should('be.visible')
    cy.getBySel('shopping-cart-badge').should('have.text', 1)
  })

  it('adding a product in item page', () => {
    cy.getBySel('item-1-title-link').click()
    cy.getBySel('add-to-cart').click()

    cy.getBySel('remove').should('be.visible')
    cy.getBySel('shopping-cart-badge').should('have.text', 1)
  })

  it('should remove cart badge after removing a product', () => {
    cy.getBySel('add-to-cart-sauce-labs-backpack').click()
    
    cy.getBySel('remove-sauce-labs-backpack').click()

    cy.getBySel('shopping-cart-badge').should('not.exist')
  })
})