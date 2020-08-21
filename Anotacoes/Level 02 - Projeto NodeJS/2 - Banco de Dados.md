# Banco de Dados

## Formas de se Conectar ao Banco de Dados

- Utilizando diretamente o driver do banco de dados
  - Exemplo de PostGreSQL
    - https://node-postgres.com/
    - Com isso será necessário digitar todas as querys obtendo os resultados em vetores
- Utilizando um Query Builder
  - Exemplo Knex.js
    - http://knexjs.org/
    - Automatiza a criação das querys
- Utilizando um ORM (Object Relational Mapping)
  - Exemplo Sequilize (JS) e TypeORM (TS) (Utiliza o KnexJS por baixo)
  - Mapeia Registros do Banco de dados em objetos JS
  - Necessita que na Model da aplicação seja identificada como uma entidade do banco de dados e as colunas que fazem parte desta tabela
  - Sempre que a aplicação altera algum dado, este dado reflete diretamente no banco de dados
  - Facilita a troca entre banco de dados (PostgreSQL -> MySQL, MySQL -> SQLite)

## Docker

- Criação de ambiente isolados (containers)
- Containers expôe portas para comunicação
- Como instalar docker (Caminho para imagem `../Notion/Instalando Docker.png`)
<img src="../Notion/Instalando Docker.png" height="480px" style="display:block">

### Conceitos

- Imagens (PostgreSQL, MongoDB, Node)
- Container
  - Instancia de uma Imagem
- Docker Registry (Docker Hub)
  - Local onde todas as imagens ficam armazenadas
- Dockerfile
  - Receita de uma Imagem
  - Com este arquivo podemos modificar uma imagem e personaliza-la
  - Exemplo de Dockerfile para rodar a aplicação Node em Docker
    <img src="./Assets/container-node.png" width="480px" style="display:block">

## Criando Docker PostgreSQL

- ```bash
    docker run --name <some-postgres> -e POSTGRES_PASSWORD=<mysecretpassword> -p <porta-da-maquina>:<porta-do-container> -d postgres

    docker run --name gostack_postgres -e POSTGRES_PASSWORD=docker -p 5432:5432 -d postgres
  ```

## Cliente Postgres

- DBeaver ou Postbird
- ```bash
  sudo snap install dbeaver-ce
  ```

## Configurando TypeORM

- ```bash
    yarn add typeorm pg
  ```
- Criar arquivo de configuração do TypeORM
    ```json
    {
        "type": "postgres",
        "host": "localhost",
        "port": 5432,
        "username": "postgres",
        "password": "docker",
        "database": "gostack_gobarber",
        "migrations": [
            "./src/database/migrations/*.ts"
        ],
        "cli": {
            "migrationsDir": "./src/database/migrations"
        }
    }

    ```

## Migrations

- Controle de versão para banco de dados
- Para utilização de Migrations, no arquivo `ormconfig.json`, é necessário que os seguintes dados estejam configurados
    ```json
    {
        "migrations": [
            "./src/database/migrations/*.ts"
        ],
        "cli": {
            "migrationsDir": "./src/database/migrations"
        }
    }
    ```
- Necessita da adição de um novo script no `package.json`
    ```json
    "scripts" : {
        "typeorm": "ts-node-dev ./node_modules/typeorm/cli.js"
    }
    ```
- Para criar uma migration basta executar
    ```bash
    yarn typeorm migration:create -n <NomeDaMigration>
    ```
- No método `up()` da migration devemos informar o que deve ser realizado no Banco
- No método `down()` da migration devemos informar o que deve ser realizado no Banco caso ocorra um erro ao executar aquela migration (Fallback)
    - Deve desfazer o que foi feito no `up()`
- Para executar as migrations basta executar
    ```bash
    yarn typeorm migration:run
    ```
- Caso perceba-se que cometeu um erro durante a criação de uma migration
    - E esta migration ainda não foi enviada para o controle de versão de código (GIT), deve-se reverter a migration com o comando a seguir, alterar o arquivo de migration e executar as migrations novamente
    ```bash
    yarn typeorm migration:revert
    ```
    - E o arquivo de migration já foi enviado para o Git, deve-se criar uma nova migration para corrigir o erro
- Para exibir as migrations que estão executadas
    ```bash
    yarn typeorm migration:show
    ```

## Implementando o Uso de Banco de Dados na Aplicação

- Necessitamento habilitar no arquivo `tsconfig.json` as seguintes configurações
    ```json
    {
        "experimentalDecorators": true, 
        "emitDecoratorMetadata": true,
        "strictPropertyInitialization": false,
    }
    ```
    - Com isso podemos utilizar `Decorators`, ou seja, `@Entity` e etc. antes de métodos, classes e atributos
- Iremos começar indicando que um `modelo` faz parte de uma `tabela` do banco de dados
    - Para isso utilizaremos `@Entity('<NomeDaTabela>')` logo acima do nome da class do modelos desejado, com isso estaremos relacionando aquele modelo com a tabela
- Além disso devemos informar quais atributos do TypeScript se correlacionam com quais tabelas (Podem existir atributos do TS que não possuem correlação no banco de dados)
    - Para isso utilizaremos `@Column('<TipoDaColuna>')` ou `@PrimaryGeneratedColumn('<TipoDeGeração|uuid|increment>')`
        - O Tipo da coluna quando não informado é automaticamente atribudo como `varchar`
