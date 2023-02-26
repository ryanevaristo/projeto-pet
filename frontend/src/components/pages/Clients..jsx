import Message from "../layout/Message";
import Container from '../layout/Container'
import LinkButton from "../layout/LinkButton";


import { useLocation } from "react-router-dom";

import styles from './Clients.module.css'
import { useState, useEffect } from "react";
import Loading from "../layout/Loading";
import ClientCard from "../client/ClientCard";

function Clients() {

    const [clients, setClients] = useState([])
    const [removeLoad, setRemoveLoad] = useState(false)
    const [projectMsg, setProjectMsg] = useState('')

    const location = useLocation()
    let message = ''
    if (location.state) {
        message = location.state.message
    }

    useEffect(() => {
        setTimeout(() => {
            fetch('http://localhost:8000/donos', {
            method:'GET',
            headers: {
                'Content-Type' : 'application/json',
            },
        })
        .then((resp) => resp.json())
        .then((data) => {
            console.log(data)
            setClients(data)
            setRemoveLoad(true)
        })
        .catch((err) => console.log(err))
        }, 1000)
        

    },[])


    function RemoveClients(id) {
        fetch(`http://localhost:5000/Donos/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },

        }).then(resp => resp.json())
        .then(data => {
            setClients(clients.filter((project) => project.id !== id))
            setProjectMsg('Cliente removido com sucesso!')
        })
        .cath(err => console.log(err))
        
    }

    return ( 
        <div className={styles.project_container}> 
            <div className={styles.title_container}>
                <h1>Clientes</h1>
                <LinkButton to={'/clients/new'} text={"Adicionar novo cliente"}></LinkButton>
            </div>
            {message && <Message msg={message} type='success'/>}
            {projectMsg && <Message msg={projectMsg} type='success'/>}
            <Container customClass='start'>
                {clients.length > 0 &&
                clients.map((clients) => (
                    <ClientCard
                    key={clients.id}
                    id={clients.id}
                    name={clients.nome}
                    cpf={"cpf"}
                    phone={clients.telefone}
                    email={clients.email}
                    endereco={clients.endereco}
                    handleRemove={RemoveClients}
                    />
                ))}
                {!removeLoad && <Loading/>}
                {removeLoad && clients.length === 0 && (
                    <p>Sem Clientes:(</p>
                )}
            </Container>
           
        </div>
     );
}

export default Clients;