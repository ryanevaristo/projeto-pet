import Loading from '../../layout/Loading'
import {useParams} from 'react-router-dom'
import { useState, useEffect } from "react";
import Container from '../../layout/Container'
import Message from '../../layout/Message'
import styles from './Project.module.css'
import ProjectForm from '../../scheduler/ProjectForm'
function Project() {
    const {id} = useParams()
    
    const [project, setProject] = useState([])
    const [showProjectForm, setShowProjectForm] = useState(false)
    const [message, setMessage] = useState()
    const [type, setType] = useState()

    useEffect(() => {
        setTimeout(() => {
            fetch(`http://localhost:5000/projects/${id}`, {
            method:'GET',
            headers: {
                'Content-Type' : 'application/json',
            },
            })
            .then((resp) => resp.json())
            .then((data) => {
                console.log(data)
                setProject(data)
            })
                },500)
    },[id]);

    function editPost(project){
        if (project.budget < project.cost) {
            setMessage("O orçamento não pode ser menor que o custo do projeto!")
            setType("error")
            return false
        }

        fetch(`http://localhost:5000/projects/${project.id}`, {
            method:'PATCH',
            headers:{
                'Content-type':'application/json',
            },
            body: JSON.stringify(project),
        })
        .then(resp => resp.json())
        .then((data) => {
            setProject(data)
            setShowProjectForm(false)
            setMessage("Projeto Atualizado")
            setType("success")
        })
        .catch(err => console.log(err))
    }

    function ToggleProjectForm () {
        setShowProjectForm(!showProjectForm)
    }

    return ( 
        <>
            {project.name? (
                <div className={styles.project_details}>
                    {message && <Message type={type} msg={message}/>}
                    <Container customClass='column'>
                        <div className={styles.details_container}>
                            <h1>Projeto: {project.name}</h1>
                            <button className={styles.btn} onClick={ToggleProjectForm}>
                                {!showProjectForm ? 'Editar Projeto' : "Fechar"}
                            </button>
                            {!showProjectForm ? (
                                <div className={styles.project_info}>
                                    <p>
                                        <span>Tipo de Serviço:</span> {project.category.name}
                                    </p>
                                    <p>
                                        <span>Valor Total:</span> {project.budget}
                                    </p>
                                </div>
                            ) : (
                                <div className={styles.project_info}>
                                    <ProjectForm handleSubmit={editPost} btnText="Concluir" projectData={project}/>
                                </div>
                            )}
                        </div>
                    </Container>
                </div>
            ):
            (
                <Loading/>
            )
            }
        
        </>
     );
}

export default Project;