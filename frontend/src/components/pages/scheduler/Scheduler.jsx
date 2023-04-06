import Message from "../../layout/Message";
import Container from '../../layout/Container'
import LinkButton from "../../layout/LinkButton";
import SchedulerCard from "../../scheduler/SchedulerCard";
import DayButton from "../../layout/DayButton";

import { useLocation } from "react-router-dom";

import styles from './Scheduler.module.css'
import { useState, useEffect } from "react";
import Loading from "../../layout/Loading";
import SubmitButton from "../../form/SubmitButton";

function Scheduler() {
    
    let hoje = new Date().toLocaleString().slice(0,10).split('/').reverse().join('-')
    const [scheduler, setScheduler] = useState([])
    const [horarios, setHorarios] = useState([])
    const [pet, setPet] = useState([])
    const [func, setFunc] = useState([])
    const [servicos, setServicos] = useState([])
    const [removeLoad, setRemoveLoad] = useState(false)
    const [projectMsg, setSchedulerMsg] = useState('')
    const [query , setQuery] = useState(hoje)
    

    const location = useLocation()
    let message = ''
    if (location.state) {
        message = location.state.message
    }

    useEffect(() => {
        setTimeout(() => {
            fetch('http://192.168.0.12:8000/schedulers', {
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
        }, 0)
        

    },[])

    useEffect(() => {
        fetch('http://192.168.0.12:8000/horarios', {
            method:'GET',
            headers: {
                'Content-Type' : 'application/json',
            },
        })
        .then((resp) => resp.json())
        .then((data) => {
            console.log(data)
            setHorarios(data)
        })
        .catch((err) => console.log(err))
    },[])

    useEffect(() => {
        fetch('http://192.168.0.12:8000/pets', {
            method:'GET',
            headers: {
                'Content-Type' : 'application/json',
            },
        })
        .then((resp) => resp.json())
        .then((data) => {
            console.log(data)
            setPet(data)
        })
        .catch((err) => console.log(err))
    },[])

    useEffect(() => {
        fetch('http://192.168.0.12:8000/usuarios', {
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
        .catch((err) => console.log(err))
    },[])


    useEffect(() => {
        fetch('http://192.168.0.12:8000/servicos', {
            method:'GET',
            headers: {
                'Content-Type' : 'application/json',
            },
        })
        .then((resp) => resp.json())
        .then((data) => {
            console.log(data)
            setServicos(data)
        })
        .catch((err) => console.log(err))
    },[])

    const submit = (e) => {
        e.preventDefault()
        setQuery(e.target.date.value)
           
        
    }

    function daysWeek(param) {
        let days = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado']
        let day = new Date().getDay() + param
        if (param === 0) {
            return 'Hoje'
        } else if (param === 1) {
            return 'Amanhã'
        } else if (day > 6) {
            day = day - 7
        }
        return days[day]
    }
    
    function dayClick (e) {
        console.log(e.target.innerText)
        if ( e.target.innerText === daysWeek(0) ) {
            let hoje = new Date().toLocaleString().slice(0,10).split('/').reverse().join('-')

            console.log(hoje)
            setQuery(hoje)
        } else if (e.target.innerText === daysWeek(1) ) {
            let timezoneOffset = (-3 * 60) * 60 * 1000;
            let amanha = new Date(new Date().getTime() + timezoneOffset + 24 * 60 * 60 * 1000).toISOString().slice(0,10)
            setQuery(amanha)
        } else if (e.target.innerText === daysWeek(2) ) {
            let timezoneOffset = (-3 * 60) * 60 * 1000;
            let segunda = new Date(new Date().getTime() + timezoneOffset + 24 * 60 * 60 * 1000 * 2).toISOString().slice(0,10)
            setQuery(segunda)
        } else if (e.target.innerText === daysWeek(3) ) {
            let timezoneOffset = (-3 * 60) * 60 * 1000;
            let terca = new Date(new Date().getTime() + timezoneOffset + 24 * 60 * 60 * 1000 * 3).toISOString().slice(0,10)
            setQuery(terca)
        } else if (e.target.innerText === daysWeek(4) ) {
            let timezoneOffset = (-3 * 60) * 60 * 1000;
            let quarta = new Date(new Date().getTime() + timezoneOffset + 24 * 60 * 60 * 1000 * 4).toISOString().slice(0,10)
            setQuery(quarta)
        } else if (e.target.innerText === daysWeek(5) ) {
            let timezoneOffset = (-3 * 60) * 60 * 1000;
            let quinta = new Date(new Date().getTime() + timezoneOffset + 24 * 60 * 60 * 1000 * 5).toISOString().slice(0,10)
            setQuery(quinta)
        } else if (e.target.innerText === daysWeek(6) ) {
            let timezoneOffset = (-3 * 60) * 60 * 1000;
            let sabado = new Date(new Date().getTime() + timezoneOffset + 24 * 60 * 60 * 1000 * 6).toISOString().slice(0,10)
            setQuery(sabado)
        } else{
            setQuery('')
        }

    }




    function RemoveScheduler(id) {
        fetch(`http://192.168.0.12:8000/schedulers/${id}`, {
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
                <h1></h1>
                <LinkButton to={'/scheduler/new'} text={"Adicionar Horário"}></LinkButton>
            </div>
            <div className={styles.filter_container}>
                <DayButton text={daysWeek(0)} onClick={dayClick}/>  <DayButton text={daysWeek(1)} onClick={dayClick}/>  
                <DayButton text={daysWeek(2)} onClick={dayClick}/>  <DayButton text={daysWeek(3)} onClick={dayClick}/> 
                <DayButton text={daysWeek(4)} onClick={dayClick}/>  <DayButton text={daysWeek(5)} onClick={dayClick}/> 
                <DayButton text={daysWeek(6)} onClick={dayClick}/> <DayButton text={'Todos'} onClick={dayClick}/>
                <form onSubmit={submit} className={styles.filter_btn}>
                    <input type="date" name="date" id="date" />
                    <SubmitButton text={'Filtrar'}/>
                </form>
            </div>
            <br />
            {message && <Message msg={message} type='success'/>}
            {projectMsg && <Message msg={projectMsg} type='success'/>}
            <Container customClass='start'>
            {scheduler.length > 0 && scheduler.filter((scheduler) => {
                    if (query === '' || query === undefined) {
                        return scheduler
                    } else if (scheduler.created_by.includes(query)) {
                        return scheduler
                    }
                }).map((scheduler) => {
                    return (
                        <SchedulerCard
                        key={scheduler.id}
                        id={scheduler.id}
                        date={scheduler.created_by}
                        petservice={
                            servicos.map((servico) => {
                                if (servico.id === scheduler.servico_id) {
                                    return servico.nome_servico
                                }
                                
                            })
                        }
                        name= {pet.map((pet) => {
                            if (pet.id === scheduler.pet_id) {
                                return pet.nome
                            }
                            
                        })}
                        porte={
                            pet.map((pet) => {
                                if (pet.id === scheduler.pet_id) {
                                    return pet.porte
                                }
                                
                            })
                        }
                        raca={
                            pet.map((pet) => {
                                if (pet.id === scheduler.pet_id) {
                                    return pet.raca
                                }
                            })
                        }
                        func={
                            func.map((func) => {
                                if (func.id === scheduler.usuario_id) {
                                    return func.nome
                                }
                                
                            })
                        }
                        removeScheduler={RemoveScheduler}
                        horario={
                            horarios.map((horario) => {
                                if (horario.id === scheduler.horario_id) {
                                    return horario.hora
                                }else{return ' '}
                            })
                        }
                        price={
                            servicos.map((servico) => {
                                if (servico.id === scheduler.servico_id) {
                                    return servico.valor
                                }
                            })
                        }

                    />
                    )
                    })
                }
                {!removeLoad && <Loading/>}
                {removeLoad && scheduler.length === 0 && (
                    <p>Sem Horários:(</p>
                )}
            </Container>
           
        </div>
     );
}

export default Scheduler;