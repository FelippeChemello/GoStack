# Primeiro Projeto NodeJS

## Dependencias

### Produção

- express
- uuidv4
- date-fns
  - Manipulação de datas

### Desenvolvimento

- typescript
- @types/express
- ts-node-dev
  - Para executar o typescript em desenvolvimento de maneira mais fácil
- eslint
- eslint-import-resolver-typescript
- @typescript-eslint/eslint-plugin@latest
- eslint-config-airbnb-base@latest
- eslint-plugin-import@^2.21.2
- @typescript-eslint/parser@latest
- prettier
- eslint-config-prettier
- eslint-plugin-prettier

## Criando o Projeto

-   ```bash
    yarn init -y
    yarn add express
    yarn add typescript -D
    yarn add @types/express -D
    yarn tsc --init
    ```
- Definir no arquivo `tsconfig.json`
  - ```json
    "outDir": "./dist",
    "rootDir": "./src",
    ```
-   ```bash
    yarn add ts-node-dev -D
    yarn add eslint@6.8.0 -D
    yarn eslint --init
    ```
- Na configuração do ESLint selecionar:
  - 'How would you like do use Eslint?'
    - 'To check syntax, find problems and enforce code style'
  - 'What type of modules does your project use?'
    - 'JavaScript modules (import/export)'
  - 'Which framework does your project use?'
    - 'None of these'
  - 'Does your project use TypeScript?'
    - 'Yes'
  - 'Where does your code run?'
    - 'Node'
  - 'How would you like to define a style for your project?'
    - 'Use a popular style guide'
  - 'Which style guide do you want to follow?'
    - 'Airbnb'
  - 'What format do you want your config file to be in?'
    - 'JSON'
  - Neste ponto o ESLint fornecerá quais dependencias devemos instalar
  - 'Would you like to install them now with npm?'
    - 'No' - Pois estamos utilizando YARN
-   ```bash
    yarn add @typescript-eslint/eslint-plugin@latest eslint-config-airbnb-base@latest eslint-plugin-import@^2.21.2 @typescript-eslint/parser@latest -D
    ```
- Criar o arquivo `eslintignore` na raiz do projeto e inserir
    ```
    /*.js
    node_modules
    dist
    ```
- Adicionar no arquivo `eslintrc.json` dentro de "extendes" a linha:
  - ```
    "plugin:@typescript-eslint/recommended"
    ```
-   ```bash
    yarn add eslint-import-resolver-typescript -D
    ```
    - Para o ESLint reconhecer os imports
- Adicionar abaixo das "rules" no `.eslintrc.json`
  - ```json
    "settings": {
        "import/resolver": {
           "typescript": {}
        }
    }
    ```
- Inserir dentro das "rules" no `.eslintrc.json`
  - ```json
    "import/extensions": [
        "error",
        "ignorePackages",
        {
            "ts": "never"
        }
    ]
    ```
-   ```bash
    yarn add prettier eslint-config-prettier eslint-plugin-prettier -D
    ```
- Adicionar no arquivo `.eslintrc.json` dentro de "extends"
  - ```
    "prettier/@typescript-eslint",
    "plugin:prettier/recommended"
    ```
- Também no arquivo `eslintrs.json` nos plugins adicionar a seguinte linha
  - ```
    "prettier"
    ```
- Por fim nas "rules" adicionar a seguinte linha para informar através do ESLint os erros que ocorrerem quando alguma regra do Prettier não estiver sendo seguida
  - ```
    "prettier/prettier": "error"
    ```
- Criar, na raiz do projeto, o arquivo `prettier.config.js` para resolver conflitos entre o ESLint e Prettier
- No arquivo `prettier.config.js` inserir
  - ```js
    module.exports = {
        singleQuote: true,
        trailingComma: 'all',
        arrowParens: 'avoid',
    }
    ```
-   ```bash
    yarn add uuidv4
    yarn add date-fns
    ```

## Scripts configurados no `package.json`

```json
"scripts": {
    "build": "tsc",
    "dev:server": "ts-node-dev --inspect --transpile-only --ignore-watch node_modules src/server.ts"
  }
```
- Comando **`build`** irá transpilar e gerar os arquivos JS a partir do TS, tendo output a pasta `dist`
- Comando **`dev:server`** irá subir um servidor de desenvolvimento com live reload
  - `--transpileOnly` fará com que, ao recarregar não faça validação de código/sintaxe, dessa forma deixando o processo mais rápido
  - `--ignore-watch node_modules` irá ignorar a pasta `node-modules`
  - `--inspect` permite que o VSCode conecte-se ao servidor para debug

## Configurando Debug VSCode

- Ir na aba de Debug
  - `crate a launch.json file`
- No arquivo gerado inserir a seguinte configuração
    ```json
    {
        "version": "0.2.0",
        "configurations": [
            {
                "type": "node",
                "request": "attach",
                "protocol": "inspector",
                "restart": true,
                "name": "Debug",
                "skipFiles": [
                    "<node_internals>/**"
                ],
                "outFiles": [
                    "${workspaceFolder}/**/*.js"
                ]
            }
        ]
    }
    ```
    - Com a configuração `"request": attach` conseguimos iniciar um debug já com a aplicação rodando, sem a necessidade de lançar ela novamente
    - Com o `"protocol": "inspector" permite a conexão do VSCode com o servidor

## Conceitos

- DTO (Data Transfer Object)
  - Utilizado para transferir dados de um arquivo para outro
- Omit<>
    - os '<>' são utilizados como parametros de função e passamos como primeiro 'parametro' o Tipo ao qual desejamos omitir uma variavel e no segundo 'parametro' o nome da variavel que desejamos omitir
    - Mais utilizado para tipagem de um objeto
    - ```js
        class Appointment {
            id: string;

            provider: string;

            date: Date;

            constructor({ provider, date }: Omit<Appointment, 'id'>) {
                this.id = uuid();
                this.provider = provider;
                this.date = date;
            }
        }
      ```
        - Com isso indicamos que o constructor receberá um objeto com as variaveis de Appointment, ou seja, id, provider e date porém sem o id
- Separation of Concerns
  - Separação de Objetivos
  - Arquivos de Rotas
    - Deve receber a requisição
    - Chamar um arquivo para resolver esta requisição
    - Devolver uma resposta
  - Arquivos de Respositórios
    - Deve servir como meio/caminho entre a aplicação e a persistencia de dados, abstraindo aonde será salvo os dados
    - Neste arquivo será criado os métodos para criar, deletar, buscar os dados salvos
    - Ele é o detentor das operações sobre os dados
  - Arquivos de Modelos
    - Deve servir de modelo/forma/formato dos dados que a apliação irá possuir
    - Qual a estrutura de um objeto
  - Arquivos de Serviços
    - Cada arquivo de Serviço deve ser responsável por UM ÚNICO serviço
    - Ele abstrai a lógica de uma operação
    - Cada caminho da aplicação, normalmente, converte-se em um serviço
    - Todo o Serviço deverá ter um unico método e este deve ser publico
      - Normalmente chamado de `execute` ou `run`, pois trata-se de executar aquele método
    - Responsável pelas regras de negócio
      - Não é responsável por transformações de dados
      - Transformações de dados trata-se de adaptações necessárias para o funcionamento da aplicação
      - Regras de negócio são requisitos e funcionalidades da aplicação
    - O Serviço
      - Deve receber os dados já transformados, ou seja, prontos para o uso
      - Deve tratar os erros e excessões
      - Não possui acesso a requisição e a resposta da rota, apenas o que recebeu por parametro
      - Deve receber como construtor as suas dependencias, ou seja, o acesso aos repositórios com os quais precisará interagir **(Inversão de dependencia)**
- SOLID
  - **S**ingle Resposability Principle (Separation of Concerns)
  - **O**
  - **L**
  - **I**
  - **D**ependency Inversion Principle
- DRY (Não repetir regras de negócio)
  - **D**on't
  - **R**epeat
  - **Y**ourself

### Explicação mais detalhada
- <img src="../Notion/Repository, Services e Patterns.png" with="100%">
