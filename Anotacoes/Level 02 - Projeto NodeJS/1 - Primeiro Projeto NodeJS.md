# Primeiro Projeto NodeJS

## Dependencias

### Produção

- Express 

### Desenvolvimento

- typescript
- @types/express
- ts-node-dev
  - Para executar o typescript em desenvolvimento de maneira mais fácil

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