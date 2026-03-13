# sauce-demo-tests

Projeto de automação de testes E2E na aplicação [SauceDemo](https://www.saucedemo.com) utilizando [Cypress](https://docs.cypress.io/) com [TypeScript](https://www.typescriptlang.org/docs/).

## Instruções

É pré-requisito ter o **Node.js** e **npm** instalados para  executar os testes deste projeto.

> [!Note]
> Neste projeto foram utilizadas as versões:
> - node `24.14.0`
> - npm `11.9.0`

### Instalação e Execução

1. Clone o repositório
    ```sh
    git clone https://github.com/matheusnuneso/sauce-demo-tests.git
    ```
2. Na raiz do projeto, instale as dependências
    ```sh
    npm install
    ```

3. Faça uma cópia do arquivo [`cypress.env.example.json`](./cypress.env.example.json) e renomeie-o para `cypress.env.json`
   
4. Em seguida, adicione as credenciais válidas que serão utilizadas para executar a suíte de testes.
    ```sh
    {
        "standard_user": "standard_user",
        "password": "secret_sauce"
    }
    ```

5. Rode os testes em modo _headless_ ou abra o **Cypress App**
    ```sh
    npm test
    ```
    ```sh
    npm run cy:open
    ```

## Estratégia de Testes

A estratégia adotada para esta suíte foi focada na validação dos fluxos críticos da aplicação.

- Login no sistema
- Manipulação de produtos no carrinho
- Processo de checkout
- Validação de erros de campos obrigatórios

Essa abordagem permite validar o comportamento da aplicação do ponto de vista do usuário final, garantindo que os principais fluxos estejam funcionando corretamente.

## Decisões Técnicas

- ### Estrutura

    A estrutura foi organizada isolando as _specs_ por funcionalidade, seguindo as melhores práticas recomendadas pelo [Cypress](https://docs.cypress.io/app/core-concepts/best-practices#Organizing-Tests-Logging-In-Controlling-State) para organização dos testes.

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

    Essa abordagem facilita a manutenção, legibilidade e escalabilidade da suíte de testes, permitindo que cada arquivo concentre cenários relacionados a uma funcionalidade específica da aplicação.

- ### Reutilização de código

    Foram utilizados **Custom Commands** para encapsular ações repetidas e reduzir duplicação de código. Esses comandos foram centralizados no arquivo [commands.ts](./cypress/support/commands.ts), permitindo maior reutilização e tornando os testes mais legíveis.

- ### Otimização de fluxo com App Actions

    Também foi utilizada a estratégia de **App Actions**, que consiste em executar determinadas ações diretamente na aplicação sem passar pela interface gráfica.

    Um exemplo é o comando `loginViaCookie`, que realiza o _login_ programaticamente por meio de cookies. Essa abordagem reduz o tempo de execução dos testes e evita repetir fluxos que já são cobertos por outros cenários.

    Essa estratégia também segue recomendações da documentação oficial do [Cypress](https://www.cypress.io/blog/stop-using-page-objects-and-start-using-app-actions).

- ### Estratégia de seletores

    A aplicação [SauceDemo](https://www.saucedemo.com) disponibiliza o atributo ``data-test`` na maioria dos elementos da interface. Por esse motivo, não foi necessário criar seletores complexos.

    Os seletores `data-test` são descritivos e estáveis, o que permite utilizá-los diretamente nos testes. Dessa forma, os seletores foram mantidos _inline_ nos arquivos de teste, simplificando a leitura e reduzindo camadas desnecessárias de abstração.

    Essa abordagem também está alinhada com as recomendações da documentação do [Cypress](https://docs.cypress.io/app/core-concepts/best-practices#Selecting-Elements).

- ### Gerenciamento de variáveis sensíveis

    Para evitar a exposição de dados sensíveis no repositório, as variáveis de ambiente foram configuradas no arquivo `cypress.env.json`, que não é versionado. Para facilitar a configuração do projeto, foi criado o arquivo [`cypress.env.example.json`](./cypress.env.example.json), contendo a estrutura das variáveis utilizadas na suíte com valores fictícios.

- ### Geração de dados dinâmicos

    Neste projeto foi utilizada a biblioteca [Faker.js](https://fakerjs.dev/guide/) para gerar dados dinâmicos durante a execução dos testes.

    De acordo com as [boas práticas](https://dev.to/radha_4c842d8e4362a7cdd9c/dynamic-data-in-test-automation-guide-to-best-practices-4acg), o uso de dados aleatórios permite que os cenários simulem melhor interações reais do usuário e evita dependência de dados estáticos, aumentando a cobertura dos testes.

## Melhorias
Devido ao prazo limitado para a implementação do desafio, algumas melhorias planejadas não puderam ser incluídas nesta versão do projeto. Caso houvesse mais tempo disponível, as seguintes evoluções seriam implementadas:

- ### Relatórios

    Implementar a geração de relatórios detalhados após a execução dos testes, facilitando a análise de resultados e a identificação de falhas. Algumas ferramentas que poderiam ser utilizadas:

    - [Mochawesome Reporter](https://www.npmjs.com/package/cypress-mochawesome-reporter)
    - [Allure Report](https://allurereport.org/docs/cypress/)
    - [Cypress Cloud](https://www.cypress.io/cloud)

- ### CI/CD

    Configurar uma pipeline de integração contínua para execução automática da suíte de testes. Isso garantiria validações contínuas da aplicação.

    - [GitHub Actions](https://docs.cypress.io/app/continuous-integration/github-actions)
    - [GitLab CI](https://docs.cypress.io/app/continuous-integration/gitlab-ci)

- ### Atualização do Cypress

    Durante o desenvolvimento foi identificado que a partir da versão `15.10.0` do Cypress, o uso de `Cypress.env()` foi [depreciado](https://docs.cypress.io/app/references/migration-guide#Migrating-away-from-Cypressenv) por questões de segurança, sendo substituído por abordagens como `cy.env()` ou `cy.expose()`.

    A atualização não foi realizada nesta versão do projeto pois demandaria a refatoração de partes do código para adaptação às novas práticas recomendadas. Considerando o prazo do desafio, optou-se por priorizar a implementação e estabilidade dos testes.

    Em um cenário de evolução do projeto, a atualização da versão do Cypress e a adequação do código às novas APIs seriam passos importantes para manter a suíte alinhada às melhores práticas da ferramenta.
