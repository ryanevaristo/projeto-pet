import { useNavigate } from 'react-router-dom'
import PetForm from '../pet/PetForm'
import styles from './NewPet.module.css'

function NewPet() {
  const navigate = useNavigate()

  function createPost(project) {
    // initialize cost and services

    fetch('http://localhost:5000/Pets', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(project),
    })
      .then((resp) => resp.json())
      .then((data) => {
        navigate('/Pets', { state: {message: 'Novo pet adicionado'} })
      })
  }

  return (
    <div className={styles.newproject_container}>
      <h1>Adicione um novo Pet</h1>
      <br/>
      <PetForm handleSubmit={createPost} btnText="Adicionar novo Pet" />
    </div>
  )
}

export default NewPet