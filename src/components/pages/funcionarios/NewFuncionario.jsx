import { useNavigate } from 'react-router-dom'
import FuncionarioForm from '../../funcionarios/FuncionarioForm'


import styles from './NewFuncionario.module.css'

function NewFuncionario() {
  const navigate = useNavigate()

  function createPost(project) {
    // initialize cost and services

    fetch('http://localhost:5000/funcionarios', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(project),
    })
      .then((resp) => resp.json())
      .then((data) => {
        navigate('/funcionarios', { state: {message: 'Novo funcionario adicionado'} })
      })
  }

  return (
    <div className={styles.newproject_container}>
      <h1>Adicione um novo colaborador</h1>
      <p>Organize seus colaboradores.</p>
      <FuncionarioForm handleSubmit={createPost} btnText="Adicionar Funcionario" />
    </div>
  )
}

export default NewFuncionario