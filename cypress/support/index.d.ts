declare global {
  namespace Cypress {
    interface Chainable {
      getBySel(selector: string): Chainable<JQuery<HTMLElement>>
      login(email: string, password: string): void
    }
  }
}

export {}