import Loading from "../../layout/Loading";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Container from "../../layout/Container";
import Message from "../../layout/Message";
import styles from "./Funcionario.module.css";
import FuncionarioForm from "../../funcionarios/FuncionarioForm";

function Funcionario (){
    const {id} = useParams()

    const [func, setFunc] = useState([])
    const [showFuncForm, setShowFuncForm] = useState(false)
    const [message, setMessage] = useState()
    const [type, setType] = useState()

    useEffect(() => {
        setTimeout(() => {
            fetch(`http://localhost:5000/funcionarios/${id}`, {
            method:'GET',
            headers: {
                'Content-Type' : 'application/json',
            },
            })
            .then((resp) => resp.json())
            .then((data) => {
                console.log(data)
                setFunc(data)
            })
                },500)
    },[id]);

    function editFunc(func){
        fetch(`http://localhost:5000/funcionarios/${id}`, {
            method:'PATCH',
            headers: {
                'Content-Type' : 'application/json',
            },
            body: JSON.stringify(func),
        })
        .then((resp) => resp.json())
        .then((data) => {
            console.log(data)
            setFunc(data)
            setMessage('Funcionario editado com sucesso')
            setType('success')
            setShowFuncForm(false)
            setTimeout(() => {
                setMessage()
                setType()
            }, 3000);
        })
    }

    function ToggleFuncForm () {
        setShowFuncForm(!showFuncForm)
    }

    return ( 
        <>
            {func.name? (
                <div className={styles.client_details}>
                    {message && <Message type={type} msg={message}/>}
                    <Container customClass='column'>
                        <div className={styles.details_container}>
                            <h1>Nome do Funcionario: {func.name}</h1>
                            <button className={styles.btn} onClick={ToggleFuncForm}>
                                {!showFuncForm ? 'Editar Funcionario' : "Fechar"}
                            </button>
                            {!showFuncForm ? (
                                <div className={styles.client_info}>
                                    <p>
                                        <span>CPF:</span> {func.cpf}
                                    </p>
                                    <p>
                                        <span>Endereço:</span> {func.endereco}
                                    </p>
                                </div>
                            ) : (
                                <div className={styles.client_info}>
                                    <FuncionarioForm
                                    handleSubmit={editFunc}
                                    FuncionarioData={func}
                                    btnText='Editar Funcionario'/>
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

export default Funcionario;