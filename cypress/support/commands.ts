Cypress.Commands.add('getBySel', (selector) => {
    return cy.get(`[data-test="${selector}"]`)
})

Cypress.Commands.add('login', (email, password) => {
    cy.log(email)
    cy.log(password)
})