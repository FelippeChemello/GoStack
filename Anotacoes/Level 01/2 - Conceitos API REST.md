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
    - Chamada realizada para rota users com PUT deve alterar o usuário 1
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
```
Header
{
    "locale": "pt_BR"
}
```
```
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