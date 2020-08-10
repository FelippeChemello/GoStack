import { Request, Response } from 'express'
import createUser from './services/CreateUser'

export function helloWorld(request: Request, response: Response) {
    const user = createUser({ 
        email: 'felippechemello@gmail.com', 
        password: '123456' 
    })

    console.log(user.name)
    
    return response.json({ message: 'hello world' });
}