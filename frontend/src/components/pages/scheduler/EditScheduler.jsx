import Loading from "../../layout/Loading";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Container from "../../layout/Container";
import Message from "../../layout/Message";
import styles from "./EditScheduler.module.css";
import SchedulerForm from "../../scheduler/SchedulerForm";

function EditScheduler() {
    const { id } = useParams();
    
    const [scheduler, setScheduler] = useState([]);
    const [showSchedulerForm, setShowSchedulerForm] = useState(false);
    const [message, setMessage] = useState();
    const [type, setType] = useState();
    
    useEffect(() => {
        setTimeout(() => {
        fetch(`http://localhost:5000/scheduler/${id}`, {
            method: "GET",
            headers: {
            "Content-Type": "application/json",
            },
        })
            .then((resp) => resp.json())
            .then((data) => {
            console.log(data);
            setScheduler(data);
            });
        }, 500);
    }, [id]);
    
    function editScheduler(scheduler) {    
        fetch(`http://localhost:5000/scheduler/${scheduler.id}`, {
        method: "PATCH",
        headers: {
            "Content-type": "application/json",
        },
        body: JSON.stringify(scheduler),
        })
        .then((resp) => resp.json())
        .then((data) => {
            setScheduler(data);
            setShowSchedulerForm(false);
            setMessage("Scheduler Atualizado");
            setType("success");
        })
        .catch((err) => console.log(err));
    }
    
    function ToggleSchedulerForm() {
        setShowSchedulerForm(!showSchedulerForm);
    }

    return ( 
        <>
            {scheduler.id? (
                <div className={styles.client_details}>
                    {message && <Message type={type} msg={message}/>}
                    <Container customClass='column'>
                        <div className={styles.details_container}>
                            <h1>Pet: {scheduler.pet.name}</h1>
                            <button className={styles.btn} onClick={ToggleSchedulerForm}>
                                {!showSchedulerForm ? 'Editar Horario' : "Fechar"}
                            </button>
                            {!showSchedulerForm ? (
                                <div className={styles.client_info}>
                                    <p>
                                        <span>Nome do Serviço:</span> {scheduler.petservices.name}
                                    </p>
                                    <p>
                                        <span>Valor:</span> {scheduler.petservices.price}
                                    </p>
                                    <p>
                                        <span>Data de Agendamento:</span> {scheduler.date} horario: {scheduler.horarios.name}
                                    </p>
                                    <p>
                                        <span>Funcionario Responsavel:</span> {scheduler.funcionarios.name}
                                    </p>
                                </div>
                            ) : (
                                <div className={styles.client_info}>
                                    <SchedulerForm handleSubmit={editScheduler} btnText="Concluir" SchedulerData={scheduler}/>
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

export default EditScheduler;