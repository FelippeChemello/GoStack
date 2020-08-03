import React, { useState, useEffect } from "react";
import api from './services/api'

import "./styles.css";

function App() {
  	const [repos, setRepos] = useState([])

  	useEffect(() => {
		api.get('/repositories').then(response => {
			setRepos(response.data)
		})
	}, [])

	async function handleAddRepository() {
		const response = await api.post('/repositories', {
            title: "Novo Repositório " + Math.round(Math.random()*100),
			"url": "github.com",
			"techs": ["NodeJS", "ReacJS"]
        })

        const repo = response.data

        setRepos([...repos, repo])
	}

	async function handleRemoveRepository(id) {
		const response = await api.delete(`/repositories/${id}`)

		if (response.status !== 204) {
			console.log("Erro ao remover repositório")
		}

		const repoIndex = repos.findIndex(repo => repo.id === id)
		repos.splice(repoIndex, 1)
		
        setRepos([...repos])
	}

	return (
		<div>
		<ul data-testid="repository-list">
			{repos.map(({id, title, url, techs}) => {return(
			<li key={id}>
				{title}

				<button onClick={() => handleRemoveRepository(id)}>
				Remover
				</button>
			</li>
			)})}
		</ul>

		<button onClick={handleAddRepository}>Adicionar</button>
		</div>
	);
	}

export default App;
