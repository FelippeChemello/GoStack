/**
 * Para criar um usuário necessitamos de: nome, email e senha
 */

interface CreateUserData {
    name?: string,
    email?: string, 
    password?: string
}

export default function createUser({ name = '', email, password } : CreateUserData) {
    const user = {
        name,
        email,
        password
    }

    return user;
}