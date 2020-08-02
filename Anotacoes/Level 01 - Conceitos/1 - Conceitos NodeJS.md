# Conceitos Node.js

## O que é Node.js?

- JavaScript no back-end
  - Regras de negócio
  - Não lida com eventos do usuário final
  - Rotas e Integrações
    - Através das Rotas interagimos com o usuário
- Não é uma linguagem, mas sim uma plataforma que permite o uso de JS no back-end
- Construída em cima do Motor V8 (Compilador JS do Chrome)
- Comparável ao PHP / Ruby / Python

## O que é NPM?

- Instalar bibliotecas de terceiros
- Fornecer/Criar bibliotecas
- Por que utilizar Yarn? 
  - Mais atual
  - Possui Workspaces
- Comparavel:
  - Composer do PHP
  - Gems do Ruby
  - PIP do Python

## Características do Node

- Arquitetura Event-loop
  - Baseada em eventos (rotas na maioria das vezes)
  - Call Stack
- Single-thread
  - C++ por trás do libuv
    - Permite multi-thread
  - Background threads
- Non-blocking I/O
  - Permite retorno constante sem bloquear o carregamento

## Frameworks

- ExpressJS
  - Não limita o desenvolvimento
  - Microframework (Ótimo para iniciar)
  - Micro-serviços
- AdonisJS
- NestJS