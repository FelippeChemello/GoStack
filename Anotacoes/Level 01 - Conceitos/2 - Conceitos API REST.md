# Conceitos API REST

## Como funciona?

- Fluxo de requisição e resposta
  - Requisição feita por um cliente
  - Resposta é retornada através de uma estrutura de dados montada após um processamento no back-end
  - Cliente recebe resposta e processa o resultado (exibindo em tela)
  - Diferente de MVC que retorna um HTML montado, esta estrutura retorna os dados para o front-end e este processa e monta os componentes em tela
- Faz uso de métodos HTTP
  - <span style="color:lightblue">GET</span> http://minhaapi.com/<span style="color:pink">users</span>
    - Chamada realizada para rota users com GET deve retornar a lista de usuários
  - <span style="color:lightblue">POST</span> http://minhaapi.com/<span style="color:pink">users</span>
    - Chamada realizada para rota users com POST deve criar um novo usuário
  - <span style="color:lightblue">PUT</span> http://minhaapi.com/<span style="color:pink">users</span>/<span style="color:orange">1</span>
    - Chamada realizada para rota users com PUT deve alterar o usuário 1 ou PATCH alterar o usuário 1 parcialmente
  - <span style="color:lightblue">DELETE</span> http://minhaapi.com/<span style="color:pink">users</span>/<span style="color:orange">1</span>
    - Chamada realizada para rota users com PUT deve deletar o usuário 1
  
## Beneficios

- Multiplos clientes (front-end) com um unico back-end
- Protocolo de comunicação padronizado
  - Mesma estrutura para web / mobile / API publica
  - Comunicação com serviços externos
- Utiliza JSON (JavaScript Object Notation) como estrutura de comunicação
  - Estrutura global (todas as linguagens de programação entendem)

## Conteúdo da requisição

- <span style='color:lightblue'> GET </span> <span style='color:white; text-decoration:none'> http://api.com </span>/<span style='color:#ff007f'>company </span>/<span style='color:orange'>1</span>/<span style='color:#ff007f'>users</span>/<span style='color:#00DBFF'>?page=2</span>
  - <span style='color:lightblue'> HTTP Method</span>
  - <a href='#'> Domain </a>
  - <span style='color:#ff007f'>Route </span>
  - <span style='color:orange'>Route Params </span>
  - <span style='color:#00DBFF'>Query Params </span>

- <span style='color:lightblue'> POST </span> <span style='color:white; text-decoration:none'> http://api.com </span>/<span style='color:#ff007f'>company </span>/<span style='color:orange'>1</span>/<span style='color:#ff007f'>users</span> <br> 
```json
Header
{
    "locale": "pt_BR"
}
```
```json
Body
{
    "user": {
        "name": "Felippe Chemello",
        "email": "felippechemello@gmail.com"
    }
}
```
  - <span style='color:lightblue'> HTTP Method</span>
  - <a href='#'> Domain </a>
  - <span style='color:#ff007f'>Route </span>
  - <span style='color:orange'>Route Params </span>
  - <span style='color:#00DBFF'>Query Params </span>
  - Request Header
  - Request Body (Apenas para POST e PUT)

### Parametros

- Query Params
  - Filtros e paginação
- Route Params
  - Identificar recursos para atualizar ou deletar
- Request Body
  - Conteúdo para criar ou editar um recurso

## HTTP Codes

- 1xx: Informativo
- 2xx: Sucesso
  - 200: SUCCESS
  - 201: CREATED
- 3xx: Redirecionamento
  - 301: MOVED PERMANENTLY
  - 302: MOVED
- 4xx: Erro no Cliente
  - 400: BAD REQUEST
  - 401: UNAUTHORIZED
  - 404: NOT FOUND
- 5xx: Erro no Servidor
  - 500: INTERNAL SERVER ERROR

## Middleware

- Interceptador de requisições
  - Pode interromper totalmente
  - Pode alterar dados
- Middlewares no Express 
  - Existem 3 formas de utilizar
    1. Utilizando `app.use(middlewareFunction)`
         - Com isso todas as requisições realizadas passarão por este middleware
    2. Chamando após o recurso da rota
          - `app.get('/projects', middlewareFunction1, middlewareFunction2, (request, response) => {})`
          - Dessa forma todas as requisições enviadas para o recurso 'projects' passará primeiro pelo 'middlewareFunction1', após pelo 'middlewareFunction2' e por fim executará sua funcão, que por sua vez também pode ser considerada um middleware
    3. Utilizando `app.use()` informando as rotas as quais devem ser aplicadas 
          -  Com isso todas as rotas que possuirem tal formato, o express se encarregará de, automaticamente, passar por aquele middleware
          -  `app.use('/projects/:id', validateId)`
  - Para que atue como um middleware não bloqueante, ou seja, após sua execução chamar o próximo middleware, deve-se chamar ao final da função `return next()`, este sendo o terceiro parametro da função middleware.
      ```js 
      function middlewareFunction(request, response, next) {
        console.log('Entrei no middleware')

        return next()
      }
      ```
  - Caso de uso curioso
    - Podemos não fazer uso de `return` na função de middleware e com isso executariamos o próximo middleware no meio da execução do primeiro e após seria finalizada a execução do primeiro
    ```js
    function middlewareFunction1(request, response, next) {
      console.log('Passo 1')

      next()

      console.log('Passo 3')
    }

    function middlewareFunction2(request, response, next) {
      console.log('Passo 2')

      return next()
    }

    app.get('/', middlewareFunction1, middlewareFunction2, (req, res) => {
      res.send()
    })

    >>> Passo 1
    >>> Passo 2
    >>> Passo 3
    ```

## CORS

- Para trabalharmos com CORS precisamos instalar esta biblioteca
  - `yarn add cors`