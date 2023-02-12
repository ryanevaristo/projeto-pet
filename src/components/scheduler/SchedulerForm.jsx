import { useEffect, useState } from 'react';

import Input from '../form/Input';
import styles from './SchedulerForm.module.css'
import Select from '../form/Select';
import SubmitButton from '../form/SubmitButton';
import Select2 from '../form/Select2';
import Select3 from '../form/Select3';


function SchedulerForm({ handleSubmit, SchedulerData, btnText}) {

    const [petservice, setPetService] = useState([])
    const [scheduler , setScheduler] = useState(SchedulerData || {})
    const [horarios, SetHorarios] = useState([])
    const [pet, setPet] = useState([])
    const[func, setFunc] = useState([])
    const [scheduler2, setScheduler2] = useState([])

    useEffect(() =>{
        fetch("http://localhost:5000/funcionarios",
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
        fetch("http://localhost:5000/scheduler",
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
            fetch("http://localhost:5000/petservices",
        {
            method: "GET",
            headers:{
                'Content-type': 'aplication/json'
            }
        }
        ).then((resp) => resp.json())
        .then((data) => {
            setPetService(data)
        })
        .catch((error) => console.log(error))
    }, [])

    useEffect(() =>{
        fetch("http://localhost:5000/horarios",
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
        fetch("http://localhost:5000/pets",
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
        setScheduler({...scheduler, [e.target.name]: e.target.value? e.target.value : null})
        console.log(e.target.value)
        
        
    }

    function handleHorario(e){
        setScheduler({...scheduler, horarios: {
            id: e.target.value,
            name: e.target.options[e.target.selectedIndex].text,
            disponivel: e.target.options[e.target.selectedIndex].dataset.disponivel
        }})
        console.log(JSON.stringify(e.target.options[e.target.selectedIndex].text))
    }

    function handleFunc(e){
        setScheduler({...scheduler, funcionarios: {
            id: e.target.value,
            name: e.target.options[e.target.selectedIndex].text
        }})
        
    }



    function handleService(e) {
        setScheduler({...scheduler, petservices: {
            id: e.target.value,
            name: e.target.options[e.target.selectedIndex].text,
            price: e.target.options[e.target.selectedIndex].dataset.price
        }})


        
        
    }
    function handlePet(e) {
        setScheduler({...scheduler, pet: {
            id: e.target.value,
            name: e.target.options[e.target.selectedIndex].text,
            raca: e.target.options[e.target.selectedIndex].dataset.raca,
            porte: e.target.options[e.target.selectedIndex].dataset.porte
        }
    } )
    

    }



    function filterSchedules(date) {
        // Filtra os agendamentos existentes com a data desejada
        const schedules = scheduler2.filter(schedule => {
          return schedule.date === date;
        });
        
        // Armazena os horários dos agendamentos encontrados
        let horarios = [];
        schedules.forEach(schedule => {
          horarios.push(schedule.horarios.name);
        });
        
        // Retorna os horários encontrados
        return horarios;
    }
      

    return ( 
        <form onSubmit={submit} className={styles.form}>
            <Select2 name="pet_id" 
            text="Nome do Pet" 
            options={pet}
            handleOnChange={handlePet}
            value={scheduler.pet ? scheduler.pet.id : ''} />

            <div className={styles.flex}>
            <Input
                type="text"
                text="Raça do Pet"
                name="pet"
                placeholder="Raça do Pet"
                disabled={true}
                handleOnChange={handlePet}
                value={scheduler.pet ? scheduler.pet.raca : ""}
            />

            <Input
                type="text"
                text="Porte do Pet"
                name="porte"
                placeholder="Porte do Pet"
                disabled={true}
                handleOnChange={handlePet}
                value={scheduler.pet ? scheduler.pet.porte : ""}
            />
            </div>

            <Select name="service" 
            text="Selecione o tipo do Serviço" 
            options={petservice}
            handleOnChange={handleService}
            value={scheduler.petservices ? scheduler.petservices.id : ''} />

            <Input
                type="text"
                text="Preço do Serviço"
                name="price"
                placeholder="Preço do Serviço"
                disabled={true}
                handleOnChange={handleChange}
                value={scheduler.petservices ? "R$ "+ scheduler.petservices.price +",00" : ""}
            />

            <div className={styles.flex}>
                <Input
                    type="date"
                    text="Data do Serviço"
                    name="date"
                    placeholder="Data do Serviço"
                    handleOnChange={handleChange}
                    value={scheduler.date ? scheduler.date : ""}
                />
                <Select3 name="horario" 
                text="Horario disponivel" 
                options={horarios.filter((item) => {
                   if (filterSchedules(scheduler.date).includes(item.name)) {
                    return false;
                }else{
                    return true;
                }
            }
                )
                
            
            }
                handleOnChange={handleHorario}
                value={scheduler.horarios ? scheduler.horarios.id : ''} />
            </div>

            <Select 
            name="funcionario" 
            text="Selecione um Funcionario disponivel" 
            options={func}
            handleOnChange={handleFunc}
            value={scheduler.funcionarios ? scheduler.funcionarios.id : ''} />
            <SubmitButton text={btnText}/>

        </form>
        
     );
}

export default SchedulerForm;