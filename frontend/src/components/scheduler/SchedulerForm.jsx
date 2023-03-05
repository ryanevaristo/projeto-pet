import { useEffect, useState } from 'react';

import Input from '../form/Input';
import styles from './SchedulerForm.module.css'
import Select from '../form/Select';
import SubmitButton from '../form/SubmitButton';


function SchedulerForm({ handleSubmit, SchedulerData, btnText}) {

    const [servicos, setServicos] = useState([])
    const [scheduler , setScheduler] = useState(SchedulerData || {})
    const [horarios, SetHorarios] = useState([])
    const [pet, setPet] = useState([])
    const[func, setFunc] = useState([])
    const [scheduler2, setScheduler2] = useState([])

    useEffect(() =>{
        fetch("http://localhost:8000/usuarios",
    {
        method: "GET",
        headers:{
            'Content-type': 'aplication/json'
        }
    }
    ).then((resp) => resp.json())
    .then((data) => {
        setFunc(data)
    })
    .catch((error) => console.log(error))
}, [])

    useEffect(() =>{
        fetch("http://localhost:8000/schedulers",
        {
            method: "GET",
            headers:{
                'Content-type': 'aplication/json'
            }
        }
        ).then((resp) => resp.json())
        .then((data) => {
            setScheduler2(data)
        })
        .catch((error) => console.log(error))
        }, [])

    useEffect(() =>{
            fetch("http://localhost:8000/servicos",
        {
            method: "GET",
            headers:{
                'Content-type': 'aplication/json'
            }
        }
        ).then((resp) => resp.json())
        .then((data) => {
            setServicos(data)
        })
        .catch((error) => console.log(error))
    }, [])

    useEffect(() =>{
        fetch("http://localhost:8000/horarios",
    {
        method: "GET",
        headers:{
            'Content-type': 'aplication/json'
        }
    }
    ).then((resp) => resp.json())
    .then((data) => {
        SetHorarios(data)
    })
    .catch((error) => console.log(error))
}, [])

    useEffect(() =>{
        fetch("http://localhost:8000/pets",
    {
        method: "GET",
        headers:{
            'Content-type': 'aplication/json'
        }
    }
    ).then((resp) => resp.json())
    .then((data) => {
        setPet(data)
    })
    .catch((error) => console.log(error))
    }, [])

    const submit = (e) => {
        e.preventDefault()
        handleSubmit(scheduler)
    }

    function handleChange(e) {
        const allowedKeys = new Set(["pet_id", "servico_id", "dono_id", "horario_id","usuario_id"]);
        const value = allowedKeys.has(e.target.name) ? parseInt(e.target.value) : e.target.value;
        setScheduler({...scheduler, [e.target.name]: value});
    }

    


    function filterSchedules(date) {
        // Filtra os agendamentos existentes com a data desejada
        const schedules = scheduler2.filter(schedule => {
          return schedule.created_by === date;
        });
        // Armazena os horários dos agendamentos encontrados
        let horarios = [];
        schedules.forEach(schedule => {
          horarios.push(schedule.horario_id);
        });
        // Retorna os horários encontrados
        return horarios;
    }
      

    return ( 
        <form onSubmit={submit} className={styles.form}>
            <Select name="pet_id" 
            text="Nome do Pet" 
            options={pet}
            nome={"nome"}
            handleOnChange={handleChange}
            value={scheduler.pet_id ? scheduler.pet_id : ''} />

            <div className={styles.flex}>
            <Input
                type="text"
                text="Raça do Pet"
                name="pet"
                placeholder="Raça do Pet"
                disabled={true}
                handleOnChange={handleChange}
                value={
                    pet ? pet.map(
                        (pet) => pet.id === scheduler.pet_id ? pet.raca : ""
                    ) : ""
                }
            />

            <Input
                type="text"
                text="Porte do Pet"
                name="porte"
                placeholder="Porte do Pet"
                disabled={true}
                handleOnChange={handleChange}
                value={
                    pet ? pet.map(
                        (pet) => pet.id === scheduler.pet_id ? pet.porte : ""
                    ) : ""
                }
            />
            </div>

            <Select name="servico_id" 
            text="Selecione o tipo do Serviço" 
            options={servicos}
            nome={"nome_servico"}
            handleOnChange={handleChange}
            value={scheduler.servico_id ? scheduler.servico_id : ''} />

            <Input
                type="text"
                text="Preço do Serviço"
                name="price"
                placeholder="Preço do Serviço"
                disabled={true}
                handleOnChange={handleChange}
                value={
                    servicos ? servicos.map(
                        (servicos) => servicos.id === scheduler.servico_id ? "R$ " + servicos.valor + ",00" : ""
                    ) : ""
                }
            />

            <div className={styles.flex}>
                <Input
                    type="date"
                    text="Data do Serviço"
                    name="created_by"
                    placeholder="Data do Serviço"
                    disabled={false}
                    handleOnChange={handleChange}
                    value={scheduler.created_by ? scheduler.date : ''}
                />

                <Select 
                name="horario_id" 
                text="Horario disponivel" 
                nome={"hora"}
                options={horarios.filter((item) => {
                   if (filterSchedules(scheduler.created_by).includes(item.id)) {
                    return false;
                }else{
                    return true;
                }
            }
                )
                
            
            }
                
                handleOnChange={handleChange}
                value={scheduler ? scheduler.horario_id : ''} />
            </div>

            <Select 
            name="usuario_id" 
            text="Selecione um Funcionario disponivel" 
            options={func}
            nome={"nome"}
            handleOnChange={handleChange}
            value={scheduler.usuario_id ? scheduler.usuario_id : ''} />
            <SubmitButton text={btnText}/>

        </form>
        
     );
}

export default SchedulerForm;