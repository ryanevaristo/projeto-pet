import Message from "../../layout/Message";
import Container from '../../layout/Container'
import LinkButton from "../LinkButton";
import SchedulerCard from "../../scheduler/SchedulerCard";
import DayButton from "../../layout/DayButton";

import { useLocation } from "react-router-dom";

import styles from './Scheduler.module.css'
import { useState, useEffect } from "react";
import Loading from "../../layout/Loading";

function Scheduler() {

    const [scheduler, setScheduler] = useState([])
    const [removeLoad, setRemoveLoad] = useState(false)
    const [projectMsg, setSchedulerMsg] = useState('')

    const location = useLocation()
    let message = ''
    if (location.state) {
        message = location.state.message
    }

    useEffect(() => {
        setTimeout(() => {
            fetch('http://localhost:5000/scheduler', {
            method:'GET',
            headers: {
                'Content-Type' : 'application/json',
            },
        })
        .then((resp) => resp.json())
        .then((data) => {
            console.log(data)
            setScheduler(data)
            setRemoveLoad(true)
        })
        .catch((err) => console.log(err))
        }, 1000)
        

    },[])

    // reload page in 1 minute


    const reload = () => {
        // reload page in 1 minute
        setTimeout(() => {
            window.location.reload()
        }
        , 60000)

    }


    function RemoveScheduler(id) {
        fetch(`http://localhost:5000/scheduler/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },

        }).then(resp => resp.json())
        .then(data => {
            setScheduler(scheduler.filter((scheduler) => scheduler.id !== id))
            setSchedulerMsg('Agendamento removido com sucesso!')
        })
        .cath(err => console.log(err))
        
    }

    return ( 
        <div className={styles.project_container}> 
            <div className={styles.title_container}>
                <h1>Agenda</h1>
                <LinkButton to={'/scheduler/new'} text={"Adicionar Horário"}></LinkButton>
            </div>
            <div className={styles.filter_container}>
                <DayButton text={'Hoje'}/>  <DayButton text={'Amanhã'}/>  <DayButton text={'Quarta'}/> 
                <DayButton text={'Quinta'}/> <DayButton text={'Sexta'}/> <input type="date" name="" id="" />
            </div>
            {message && <Message msg={message} type='success'/>}
            {projectMsg && <Message msg={projectMsg} type='success'/>}
            <Container customClass='start'>
                
                {scheduler.length > 0 &&
                scheduler.map((scheduler) => (
                    <SchedulerCard
                    key={scheduler.id}
                    id={scheduler.id}
                    name={scheduler.pets.name}
                    petservice={scheduler.petservices.name}
                    porte={scheduler.pets.porte}
                    raca={scheduler.pets.raca.name}
                    price={scheduler.petservices.price}
                    horario={scheduler.horarios.horario}
                    data={scheduler.data}
                    func={scheduler.funcionarios.name}
                    dono={scheduler.pets.donos.name}
                    phone={scheduler.pets.donos.phone}
                    handleRemove={RemoveScheduler}
                    />
                ))}
                {!removeLoad && <Loading/>}
                {removeLoad && scheduler.length === 0 && (
                    <p>Sem Horários:(</p>
                )}
            </Container>
           
        </div>
     );
}

export default Scheduler;