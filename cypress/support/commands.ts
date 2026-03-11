Cypress.Commands.add('getBySel', (selector) => {
    return cy.get(`[data-test="${selector}"]`)
})

Cypress.Commands.add('login', (user, password) => {
    cy.getBySel('username').type(user)
    cy.getBySel('password').type(password)
    cy.getBySel('login-button').click()
})

Cypress.Commands.add('loginViaCookie', (user) => {
    cy.setCookie('session-username', user)
    cy.visit('/inventory.html', { failOnStatusCode: false })
})

Cypress.Commands.add('checkErrorMsg', (msg) => {
  cy.getBySel('error')
    .should('be.visible')
    .and('contain', msg)
})