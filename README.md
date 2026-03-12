# sauce-demo-tests

Projeto de automação de testes E2E na aplicação [SauceDemo](https://www.saucedemo.com) utilizando [Cypress](https://docs.cypress.io/) com [TypeScript](https://www.typescriptlang.org/docs/).

## Instruções

É **pre-requisito** ter o Node.js e npm instalados para clonar e executar os testes deste projeto.

> Neste projeto utilizei as versões:
> - node `24.14.0`
> - npm `11.9.0`

### Instalação

Execute o comando `git clone https://github.com/matheusnuneso/sauce-demo-tests.git`

Na raiz do projeto, execute o comando `npm install` para instalar as dependências do projeto.

### Testes

> Antes de executar os testes faça uma cópia do arquivo [`cypress.env.example.json`](./cypress.env.example.json) e nomei-o como `cypress.env.json`. Então adicione as mesmas credenciais válidas, as quais serão utilizadas nessa suíte.

Execute `npm test` para rodar os testes em modo _headless_.
Ou, `npm run cy:open` para abrir o Cypress App.

## Estratégia

### Estrutura

A **estrutura da suíte de testes** foi organizada isolando as _specs_ por funcionalidade, seguindo as melhores práticas recomendadas pelo [Cypress](https://docs.cypress.io/app/core-concepts/best-practices#Organizing-Tests-Logging-In-Controlling-State) para organização de testes E2E.

```sh
cypress/
├─ e2e/
│ ├─ checkout.cy.ts
│ ├─ login.cy.ts
│ └─ product.cy.ts
│
├─ support/
│ ├─ commands.ts
│ └─ e2e.ts
│ └─ index.d.ts
```

Essa abordagem facilita a **manutenção**, **legibilidade** e **escalabilidade** da suíte de testes, permitindo que cada arquivo concentre cenários relacionados a uma funcionalidade específica da aplicação.

### Reutilização de código

Foram utilizados **Custom Commands** para encapsular ações repetidas e reduzir duplicação de código. Esses comandos foram centralizados no arquivo [commands.ts](./cypress/support/commands.ts), permitindo maior reutilização e tornando os testes mais legíveis.

### Otimização de fluxo com App Actions

Também foi utilizada a estratégia de **App Actions**, que consiste em executar determinadas ações diretamente na aplicação sem passar pela interface gráfica.

Um exemplo é o comando `loginViaCookie`, que realiza o _login_ programaticamente por meio de cookies. Essa abordagem reduz o tempo de execução dos testes e evita repetir fluxos que já são cobertos por outros cenários.

Essa estratégia também segue recomendações da documentação oficial do [Cypress](https://docs.cypress.io/app/core-concepts/best-practices#Organizing-Tests-Logging-In-Controlling-State).

### Estratégia de seletores

A aplicação [SauceDemo](https://www.saucedemo.com) disponibiliza o atributo ``data-test`` na maioria dos elementos da interface. Por esse motivo, não foi necessário criar seletores complexos.

Os seletores `data-test` são descritivos e estáveis, o que permite utilizá-los diretamente nos testes. Dessa forma, os seletores foram mantidos **inline** nos arquivos de teste, simplificando a leitura e reduzindo camadas desnecessárias de abstração.

Essa abordagem também está alinhada com as recomendações da documentação do [Cypress](https://docs.cypress.io/app/core-concepts/best-practices#Selecting-Elements).

### Gerenciamento de variáveis sensíveis

Para evitar a exposição de dados sensíveis no repositório, as variáveis de ambiente foram configuradas no arquivo `cypress.env.json`, que não é versionado. Para facilitar a configuração do projeto, foi criado o arquivo [`cypress.env.example.json`](./cypress.env.example.json), contendo a estrutura das variáveis utilizadas na suíte com valores fictícios.

### Geração de dados dinâmicos

Neste projeto foi utilizada a biblioteca [Faker.js](https://fakerjs.dev/guide/) para gerar dados dinâmicos durante a execução dos testes.

De acordo com as [boas práticas](https://dev.to/radha_4c842d8e4362a7cdd9c/dynamic-data-in-test-automation-guide-to-best-practices-4acg), o uso de dados aleatórios permite que os cenários simulem melhor interações reais do usuário e evita dependência de dados estáticos, aumentando a cobertura dos testes.








