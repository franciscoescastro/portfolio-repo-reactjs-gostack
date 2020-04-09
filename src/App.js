import React, { useState, useEffect } from "react"

import "./styles.css"

import api from './services/api'

function App() {
  const [repositories, setRepositories] = useState([])
  const [nextRepositoryNumber, setNextRepositoryNumber] = useState(1)

  useEffect(() => {
    api.get('/repositories').then(response => {
      setRepositories(response.data)
      setNextRepositoryNumber(response.data.length + 1)
    })
  }, [])

  async function handleAddRepository() {
    const title = `Repository ${nextRepositoryNumber}`
    try {
      const response = await api.post('/repositories', {
        title,
        url: '',
        techs: []
      })
      repositories.push(response.data)
      setRepositories(repositories)
      setNextRepositoryNumber(nextRepositoryNumber + 1)
    } catch (error) {
      alert('Erro ao adicionar, tente novamente.')
    }
  }

  async function handleRemoveRepository(id) {
    try {
      await api.delete(`/repositories/${id}`)
      
      setRepositories(repositories.filter(repository => repository.id !== id))
    } catch (error) {
      alert('Erro ao remover, tente novamente.')
    }
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repository => (
          <li key={repository.id}>
            {repository.title}

            <button onClick={() => handleRemoveRepository(repository.id)}>
              Remover
          </button>
          </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  )
}

export default App
