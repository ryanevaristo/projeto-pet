import Message from "../../layout/Message";
import Container from '../../layout/Container'
import LinkButton from "../../layout/LinkButton";

import { useLocation } from "react-router-dom";

import styles from './Funcionarios.module.css'
import { useState, useEffect } from "react";
import Loading from "../../layout/Loading";
import FuncionarioCard from "../../funcionarios/FuncionarioCard";


function Funcionarios() {

    const [funcionarios, setFuncionarios] = useState([])
    const [removeLoad, setRemoveLoad] = useState(false)
    const [funcMsg, setFuncMsg] = useState('')

    const location = useLocation()
    let message = ''
    if (location.state) {
        message = location.state.message
    }

    useEffect(() => {
        setTimeout(() => {
            fetch('http://localhost:5000/funcionarios', {
            method:'GET',
            headers: {
                'Content-Type' : 'application/json',
            },
        })
        .then((resp) => resp.json())
        .then((data) => {
            console.log(data)
            setFuncionarios(data)
            setRemoveLoad(true)
        })
        .catch((err) => console.log(err))
        }, 1000)
        

    },[])


    function RemoveFunc(id) {
        fetch(`http://localhost:5000/funcionarios/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },

        }).then(resp => resp.json())
        .then(data => {
            setFuncionarios(funcionarios.filter((project) => project.id !== id))
            setFuncMsg('Cliente removido com sucesso!')
        })
        .cath(err => console.log(err))
        
    }

    return ( 
        <div className={styles.project_container}> 
            <div className={styles.title_container}>
                <h1>Funcionários</h1>
                <LinkButton to={'/funcionarios/new'} text={"Adicionar novo funcionário"}></LinkButton>
            </div>
            {message && <Message msg={message} type='success'/>}
            {funcMsg && <Message msg={funcMsg} type='success'/>}
            <Container customClass='start'>
                {funcionarios.length > 0 &&
                funcionarios.map((funcionarios) => (
                    <FuncionarioCard
                    key={funcionarios.id}
                    id={funcionarios.id}
                    name={funcionarios.name}
                    cpf={funcionarios.cpf}
                    phone={funcionarios.phone}
                    email={funcionarios.email}
                    endereco={funcionarios.endereco}
                    handleRemove={RemoveFunc}
                    />
                ))}
                {!removeLoad && <Loading/>}
                {removeLoad && funcionarios.length === 0 && (
                    <p>Sem Clientes:(</p>
                )}
            </Container>
           
        </div>
     );
}

export default Funcionarios;