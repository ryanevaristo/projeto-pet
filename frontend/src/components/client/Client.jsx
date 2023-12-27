import Loading from "../layout/Loading";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Container from "../layout/Container";
import Message from "../layout/Message";
import styles from "./Client.module.css";
import ClientForm from "./ClientForm";
import LinkButton from "../layout/LinkButton";
import PetCard from "../pet/PetCard";

function Client (){
    const {id} = useParams()

    const [client, setClient] = useState([])
    const [showClientForm, setShowClientForm] = useState(false)
    const [message, setMessage] = useState()
    const [type, setType] = useState()

    useEffect(() => {
        setTimeout(() => {
            fetch(`http://localhost:8000/donos/${id}`, {
            method:'GET',
            headers: {
                'Content-Type' : 'application/json',
            },
            })
            .then((resp) => resp.json())
            .then((data) => {
                console.log(data)
                setClient(data)
            })
                },500)
    },[id]);

    function editClient(client){
        fetch(`http://localhost:8000/donos/${id}`, {
            method:'PUT',
            headers: {
                'Content-Type' : 'application/json',
            },
            body: JSON.stringify(client),
        })
        .then((resp) => resp.json())
        .then((data) => {
            console.log(data)
            setClient(data)
            setMessage('Cliente editado com sucesso')
            setType('success')
            setShowClientForm(false)
            setTimeout(() => {
                setMessage()
                setType()
            }, 0);
        })
    }

    function ToggleClientForm () {
        setShowClientForm(!showClientForm)
    }

    return ( 
        <>
            {client.nome? (
                <div className={styles.client_details}>
                    {message && <Message type={type} msg={message}/>}
                    <Container customClass='column'>
                        <div className={styles.details_container}>
                            <h1>Nome do Cliente: {client.nome}</h1>
                            <button className={styles.btn} onClick={ToggleClientForm}>
                                {!showClientForm ? 'Editar Cliente' : "Fechar"}
                            </button>
                            {!showClientForm ? (
                                <div className={styles.client_info}>
                                    <p>
                                        <span>CPF:</span> {client.cpf}
                                    </p>
                                    <p>
                                        <span>Endereço:</span> {client.endereco}
                                    </p>
                                    <p>
                                        <LinkButton className={styles.btn} to={`/client/${client.id}/pets/new`} text={'Adicionar Pet'}>
                                            
                                        </LinkButton>
                                    </p>

                                    <Container customClass='start'>
                                        {client.pets.length > 0 &&
                                            client.pets.map((pet) => (
                                                
                                                <PetCard
                                                key={pet.id}
                                                id={pet.id}
                                                name={pet.nome}
                                                porte={pet.porte}
                                                raca= {pet.raca}
                                                />
                                            ))}
                                    </Container>
                                            
                                </div>
                            ) : (
                                <div className={styles.client_info}>
                                    <ClientForm
                                    handleSubmit={editClient}
                                    clientData={client}
                                    btnText='Editar Cliente'/>
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

export default Client