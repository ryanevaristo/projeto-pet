import Loading from "../layout/Loading";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Container from "../layout/Container";
import Message from "../layout/Message";
import styles from "./PetService.module.css";
import PetServiceForm from "../pet_services/PetServiceForm";

function PetService() {
    const { id } = useParams();
    
    const [petService, setPetService] = useState([]);
    const [showPetServiceForm, setShowPetServiceForm] = useState(false);
    const [message, setMessage] = useState();
    const [type, setType] = useState();
    
    useEffect(() => {
        setTimeout(() => {
        fetch(`http://localhost:5000/petServices/${id}`, {
            method: "GET",
            headers: {
            "Content-Type": "application/json",
            },
        })
            .then((resp) => resp.json())
            .then((data) => {
            console.log(data);
            setPetService(data);
            });
        }, 500);
    }, [id]);
    
    function editPetService(petService) {    
        fetch(`http://localhost:5000/petServices/${petService.id}`, {
        method: "PATCH",
        headers: {
            "Content-type": "application/json",
        },
        body: JSON.stringify(petService),
        })
        .then((resp) => resp.json())
        .then((data) => {
            setPetService(data);
            setShowPetServiceForm(false);
            setMessage("Projeto Atualizado");
            setType("success");
        })
        .catch((err) => console.log(err));
    }
    
    function TogglePetServiceForm() {
        setShowPetServiceForm(!showPetServiceForm);
    }

    return ( 
        <>
            {petService.name? (
                <div className={styles.project_details}>
                    {message && <Message type={type} msg={message}/>}
                    <Container customClass='column'>
                        <div className={styles.details_container}>
                            <h1>Serviço: {petService.name}</h1>
                            <button className={styles.btn} onClick={TogglePetServiceForm}>
                                {!showPetServiceForm ? 'Editar Serviço' : "Fechar"}
                            </button>
                            {!showPetServiceForm ? (
                                <div className={styles.project_info}>
                                    <p>
                                        <span>Tipo de Serviço:</span> {petService.name}
                                    </p>
                                    <p>
                                        <span>Valor:</span> {petService.price}
                                    </p>
                                    <p>
                                        <span>Descrição:</span> {petService.description}
                                    </p>
                                    <p>
                                        <span>Tempo de Execução:</span> {petService.executionTime}
                                    </p>
                                </div>
                            ) : (
                                <div className={styles.project_info}>
                                    <PetServiceForm handleSubmit={editPetService} btnText="Concluir" petServiceData={petService}/>
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

export default PetService;