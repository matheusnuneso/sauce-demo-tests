# sauce-demo-tests

Projeto de automação de testes E2E na aplicação [SauceDemo](https://www.saucedemo.com) utilizando [Cypress](https://docs.cypress.io/) com [TypeScript](https://www.typescriptlang.org/docs/).

## Instruções

É pre-requisito ter o git, Node.js e npm instalados para clonar e executar os testes deste projeto.

> Neste projeto utilizei as versões:
> - git `2.49.0`
> - node `24.14.0`
> - npm `11.9.0`

### Instalação

Execute o comando `npm install` para instalar as dependências do projeto.

### Testes

> Antes de executar os testes faça uma cópia do arquivo [`cypress.env.example.json`](./cypress.env.example.json) e nomei-o como `cypress.env.json`. Então adicione as mesmas credenciais válidas, as quais serão utilizadas nessa suíte.

Execute `npm test` para rodar os testes em modo _headless_.
Ou, execute `npm run cy:open` para abrir o Cypress App.

## Arquitetura

