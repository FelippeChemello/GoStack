import React, { useState, useEffect } from 'react'
import api from './services/api'

import './App.css'
import backgroundImage from './assets/background.jpg'

import Header from './components/Header'

function App() {
    const [projects, setProjects] = useState([])
    
    useEffect(() => {
        api.get('/projects').then(response => {
            setProjects(response.data)
        })
    }, [])

    function handleAddProject() {
        setProjects([...projects, `Novo projeto ${Date.now()}`])

        console.log(projects)
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