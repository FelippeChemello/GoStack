/**
 * Para criar um usuário necessitamos de: nome, email e senha
 */

 interface TechObject {
     title: string,
     experience: number
 }
 
interface CreateUserData {
    name?: string,
    email: string, 
    password: string,
    techs: Array<string | TechObject>,
    contact: number[]
}

export default function createUser({ name = '', email, password } : CreateUserData) {
    const user = {
        name,
        email,
        password
    }

    return user;
}