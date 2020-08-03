# Conceitos React

## O que é React?

- Biblioteca para construção de interfaces
- Utilizado para construção de Single-Page-Applications (SPA)
- É considerado uma biblioteca, porém ao analisar ao ecossistema React pode ser considerado um framework
- Tudo fica dentro do JavaScript
  - Incluindo HTML e CSS
- **React:** Biblioteca de construção de interfaces e componentização
- **ReactJS:** Comportamento do React no Browser (ReactDOM - Facebook)
- **React Native:** React para Mobile (Integração com bibliotecas nativas)

## Vantagens

- Organização do código
  - Componentização
    - Dividir partes da tela em pequenos componentes <br>
        <img src="./Assets/Componentizacao.png" width=720>
- Divisão de responsabilidade
  - Back-end: Regra de negócio
  - Front-end: Interface
- Uma API, múltiplos clientes <br>
<img src="./Assets/API-Cliente.png" width=360>
- Programação declarativa

## JSX

- HTML dentro do JS (JavaScript + XML)
- Com React podemos criar nossos próprios elementos
    <img src="./Assets/jsx.png" width=360>

## Imperativo VS Declarativo

- Na programação imperativa passamos todas as instruções e casos possíveis ao computador comparando com estado anterior
- Na programação declarativa apenas informamos que deve possuir um elemento com o numero atual, sendo o numero atual retornado do back-end, ou seja, o front-end preocupa-se em receber o valor atual e não no estado que possuia antes para montar ou não um componente
<img src="./Assets/ImpVsdec.png" width=720>

## Babel / Webpack

- O browser não entende todos esses códigos novos
- O **Babel** converte (transpila) o código JS de uma forma que o qualquer browser entenda
- O **Webpack**
  - Cria um bundle com todos os códigos da aplicação
  - Permite ao JS como importar CSS, imagens e etc.
  - Live reload com Webpack Dev Server
  
## Loaders

- Utilizado pelo webpack para carregar o código
  - babel-loader
    - Converter o JS em algo que o browser entenda
  - css-loader
    - Converter CSS em algo que o browser entenda
  - image-loader
  - ...

# Criando um projeto

```bash
yarn init -y
yarn add react react-dom
yarn add @babel/core @babel/preset-env @babel/preset-react webpack webpack-cli
yarn add @babel/cli
```

## Babel Presets

- @babel/preset-env 
  - Entende o ambiente em que está sendo executado e converte o JS para rodas naquele ambiente
- @babel/preset-react
  - Converte as funcionalidade do React para que o browser consiga entender
  ```js
  babel.config.js

  module.exports = {
      presets: [
          '@babel/preset-env',
          '@babel/preset-react'
      ],
  }
  ```

## Babel CLI

- Transpila de forma manual o código escrito em ES6 para permitir ser lido em qualquer browser
```bash
yarn babel src/index.js --out-file public/bundle.js
```