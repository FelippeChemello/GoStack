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
