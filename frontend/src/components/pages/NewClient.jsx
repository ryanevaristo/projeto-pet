import { useNavigate } from 'react-router-dom'
import ClientForm from '../client/ClientForm'

import styles from './NewClient.module.css'

function NewClient() {
  const navigate = useNavigate()

  function createPost(project) {
    // initialize cost and services

    fetch('http://localhost:8000/donos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(project),
    })
      .then((resp) => resp.json())
      .then((data) => {
        navigate('/clients', { state: {message: 'Novo pet adicionado'} })
      })
  }

  return (
    <div className={styles.newproject_container}>
      <h1>Adicione um Dono de Pet</h1>
      <p>Organize seus clientes.</p>
      <ClientForm handleSubmit={createPost} btnText="Adicionar Cliente" />
    </div>
  )
}

export default NewClient