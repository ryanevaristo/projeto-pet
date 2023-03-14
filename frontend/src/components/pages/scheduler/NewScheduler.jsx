import { useNavigate } from 'react-router-dom'
import SchedulerForm from '../../scheduler/SchedulerForm'
import styles from './NewScheduler.module.css'

function NewScheduler() {
  const navigate = useNavigate()

  function createPost(project) {
    // initialize cost and services

    fetch('http://192.168.0.12:8000/schedulers', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(project),
    })
      .then((resp) => resp.json())
      .then((data) => {
        navigate('/scheduler', { state: {message: 'Novo Horario adicionado'} })
      })
  }

  return (
    <div className={styles.newproject_container}>
      <h1>Adicione um novo Horario</h1>
      <br/>
      <SchedulerForm handleSubmit={createPost} btnText="Adicionar Horario Pet" />
    </div>
  )
}

export default NewScheduler