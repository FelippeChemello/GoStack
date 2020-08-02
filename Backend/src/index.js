const express = require('express')
const { response } = require('express')

const port = process.env.PORT || 3333

const app = express()

app.get('/projects', (request, response) => {
    return response.json([
        'Projeto 1',
        'Projeto 2'
    ])
})

app.post('/projects', (request, response) => {
    return response.json([
        'Projeto 1',
        'Projeto 2',
        'Projeto 3'
    ])
})

app.put('/projects/:id', (request, response) => {
    return response.json([
        'Projeto 0',
        'Projeto 2',
        'Projeto 3'
    ])
})

app.delete('/projects/:id', (request, response) => {
    return response.json([
        'Projeto 2',
        'Projeto 3'
    ])
})

app.listen(port, () => {
    console.log("Back-end Started!")
})