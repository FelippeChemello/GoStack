import React, { useState, useEffect } from 'react'
import api from './services/api'

import './App.css'
import backgroundImage from './assets/background.jpg'

import Header from './components/Header'

function App() {
    const [projects, setProjects] = useState([])
    
    useEffect(() => {
        //Podemos utilizar tanto then como async await, neste caso não pois o useEffect não suporta
        api.get('/projects').then(response => {
            setProjects(response.data)
        })
    }, [])

    //Vamos utilizar async await, apenas outra forma de fazer (sem o then)
    async function handleAddProject() {
        const response = await api.post('/projects', {
            title: "Novo Projeto " + Math.round(Math.random()*100),
            owner: "Felippe Chemello"
        })

        const project = response.data

        setProjects([...projects, project])
    }

    return (
        <>
            <Header title="Projects" />

            <ul>
                {projects.map(project => <li key={project.id}>{project.title}</li>)}
            </ul>

            <button type="button" onClick={handleAddProject}>Adicionar projeto</button>
            <br />
            <img height={540} src={backgroundImage}/>
        </>
    )
}

export default App