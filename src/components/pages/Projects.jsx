import Message from "../layout/Message";
import Container from '../layout/Container'
import LinkButton from "./LinkButton";
import ProjectCard from "../project/ProjectCard";

import { useLocation } from "react-router-dom";

import styles from './Projects.module.css'
import { useState, useEffect } from "react";
import Loading from "../layout/Loading";

function Projects() {

    const [projects, setProjects] = useState([])
    const [removeLoad, setRemoveLoad] = useState(false)
    const [projectMsg, setProjectMsg] = useState('')

    const location = useLocation()
    let message = ''
    if (location.state) {
        message = location.state.message
    }

    useEffect(() => {
        setTimeout(() => {
            fetch('http://localhost:5000/projects', {
            method:'GET',
            headers: {
                'Content-Type' : 'application/json',
            },
        })
        .then((resp) => resp.json())
        .then((data) => {
            console.log(data)
            setProjects(data)
            setRemoveLoad(true)
        })
        .catch((err) => console.log(err))
        }, 1000)
        

    },[])


    function RemoveProject(id) {
        fetch(`http://localhost:5000/projects/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },

        }).then(resp => resp.json())
        .then(data => {
            setProjects(projects.filter((project) => project.id != id))
            setProjectMsg('Projeto removido com sucesso!')
        })
        .cath(err => console.log(err))
        
    }

    return ( 
        <div className={styles.project_container}> 
            <div className={styles.title_container}>
                <h1>Meus Projetos</h1>
                <LinkButton to={'/newproject'} text={"Novo Projeto"}></LinkButton>
            </div>
            {message && <Message msg={message} type='success'/>}
            {projectMsg && <Message msg={projectMsg} type='success'/>}
            <Container customClass='start'>
                {projects.length > 0 &&
                projects.map((project) => (
                    <ProjectCard
                    key={project.id}
                    id={project.id}
                    name={project.name}
                    budget={project.budget}
                    category={project.category.name }
                    handleRemove={RemoveProject}
                    />
                ))}
                {!removeLoad && <Loading/>}
                {removeLoad && projects.length === 0 && (
                    <p>Sem projetos :(</p>
                )}
            </Container>
           
        </div>
     );
}

export default Projects;