const express = require('express')
const { response } = require('express')

const port = process.env.PORT || 3333

const app = express()

//Método 'use' faz com que todas as requisições passem por ela
//Com isso conseguimos informar que desejamos utilizar JSON no expres
//Permitindo ler o Request Body
app.use(express.json()) 

app.get('/projects', (request, response) => {
    const {title, owner} = request.query

    console.log(title, owner)
    
    return response.json([
        'Projeto 1',
        'Projeto 2'
    ])
})

app.post('/projects', (request, response) => {
    const {title, owner} = request.body

    console.log(title, owner)
    
    return response.json([
        'Projeto 1',
        'Projeto 2',
        'Projeto 3'
    ])
})

app.put('/projects/:id', (request, response) => {
    const { id } = request.params

    console.log(id)
    
    return response.json([
        'Projeto 0',
        'Projeto 2',
        'Projeto 3'
    ])
})

app.delete('/projects/:id', (request, response) => {
    const { id } = request.params

    console.log(id)
    
    return response.json([
        'Projeto 2',
        'Projeto 3'
    ])
})

app.listen(port, () => {
    console.log("Back-end Started!")
})