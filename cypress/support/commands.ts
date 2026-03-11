Cypress.Commands.add('getBySel', (selector) => {
    return cy.get(`[data-test="${selector}"]`)
})

Cypress.Commands.add('login', (email, password) => {
    cy.getBySel('username').type(email)
    cy.getBySel('password').type(password)
    cy.getBySel('login-button').click()
})