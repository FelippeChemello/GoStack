import { Request, Response } from 'express'
import createUser from './services/CreateUser'

export function helloWorld(request: Request, response: Response) {
    const user = createUser('Felippe', 'felippechemello@gmail.com', '123456')
    
    return response.json({ message: 'hello world' });
}