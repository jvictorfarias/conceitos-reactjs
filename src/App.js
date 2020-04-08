import React, { useEffect, useState } from 'react';

import api from './services/api';

import './styles.css';

function App() {
  const [repositories, setRepositories] = useState([]);
  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('');
  const [techs, setTechs] = useState([]);

  useEffect(() => {
    async function loadData() {
      const response = await api.get('/repositories');
      setRepositories(response.data);
    }
    loadData();
  }, []);

  async function handleAddRepository(e) {
    e.preventDefault();
    const response = await api.post('/repositories', {
      title,
      url,
      techs,
    });

    setRepositories([...repositories, response.data]);
  }

  async function handleRemoveRepository(id) {
    await api.delete(`/repositories/${id}`);

    setRepositories(repositories.filter((repository) => repository.id !== id));
  }

  return (
    <div>
      <form>
        <h4>Adicione um novo repositório</h4>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Nome do repositório"
        ></input>
        <input
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="URL do repositório"
        ></input>
        <input
          value={techs}
          onChange={(e) => setTechs(e.target.value)}
          placeholder="Tecnologias"
        ></input>
        <button type="submit" onClick={handleAddRepository}>
          Adicionar
        </button>
      </form>
      <ul data-testid="repository-list">
        {repositories.map((repository) => (
          <li key={repository.id}>
            <span>{repository.title}</span>
            <button
              type="button"
              onClick={() => handleRemoveRepository(repository.id)}
            >
              Remover
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
