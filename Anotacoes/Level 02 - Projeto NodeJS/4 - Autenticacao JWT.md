# Autenticação JWT (JSON Web Token)

## Como funciona

- Envia para uma rota `/sessions` uma requisição post com o usuário e senha para criar uma sessão
- Esta rota valida e verifica se as informações estão corretas
- Estando corretas, gera um Token JWT
    <img src="./Assets/jwt.png" style="display:block">
