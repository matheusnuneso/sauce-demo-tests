declare global {
  namespace Cypress {
    interface Chainable {
      getBySel(selector: string): Chainable<JQuery<HTMLElement>>
      login(user: string, password: string): void
      loginViaCookie(user: string): void
    }
  }
}

export {}