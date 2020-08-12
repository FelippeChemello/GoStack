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
    "dev:server": "ts-node-dev --transpile-only --ignore-watch node_modules src/server.ts"
  }
```
- Comando **`build`** irá transpilar e gerar os arquivos JS a partir do TS, tendo output a pasta `dist` 
- Comando **`dev:server`** irá subir um servidor de desenvolvimento com live reload 
  - `--transpileOnly` fará com que, ao recarregar não faça validação de código/sintaxe, dessa forma deixando o processo mais rápido
  - `--ignore-watch node_modules` irá ignorar a pasta `node-modules`