const express = require('express')
const { uuid, isUuid } = require('uuidv4')

const port = process.env.PORT || 3333

const app = express()

//Método 'use' faz com que todas as requisições passem por ela
//Com isso conseguimos informar que desejamos utilizar JSON no expres
//Permitindo ler o Request Body
app.use(express.json()) 

const projects = []

function logRequests(request, response, next) {
    const { method, url } = request

    const logLabel = `[${method.toUpperCase()}] ${url}`

    console.time(logLabel)

    next() //Serve para permitir que o fluxo seja seguido, caso contrário interromperia a requisição

    console.timeEnd(logLabel)
} 

function validateProjectId(request, response, next) {
    const { id } = request.params

    if (!isUuid(id)) {
        return response.status(400).json({ error: "Invalid project ID" })
    }

    return next()
}

app.use(logRequests)
// app.use('/projects/:id', validateProjectId)

app.get('/projects', (request, response) => {
    const { title } = request.query

    const results = title 
        ? projects.filter(project => project.title.includes(title))
        : projects
    
    return response.json(results)
})

app.post('/projects', (request, response) => {
    const {title, owner} = request.body

    const project = { id: uuid(), title, owner }
    
    projects.push(project)

    return response.json(project)
})

app.put('/projects/:id', validateProjectId, (request, response) => {
    const { id } = request.params
    const {title, owner} = request.body

    //Método "find" retorna o objeto encontrado quando a equação for satisfeita
    //Método "findIndex" retorna o indice do objeto encontrado quando a equação for satisfeita
    const projectIndex = projects.findIndex(project => project.id === id)

    if (projectIndex < 0) {
        return response.status(400).json({ error: 'Project Not Found!' })
    }

    const project = {
        id,
        title,
        owner
    }

    projects[projectIndex] = project

    return response.json(project)
})

app.delete('/projects/:id', validateProjectId, (request, response) => {
    const { id } = request.params

    const projectIndex = projects.findIndex(project => project.id === id)
    if (projectIndex < 0) {
        return response.status(400).json({ error: 'Project Not Found!' })
    }

    projects.splice(projectIndex, 1)
    
    return response.status(204).send()
})

app.listen(port, () => {
    console.log("Back-end Started!")
})