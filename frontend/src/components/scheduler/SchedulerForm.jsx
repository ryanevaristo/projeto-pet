import { useEffect, useState } from 'react';
import axios from 'axios';
import Input from '../form/Input';
import styles from './SchedulerForm.module.css'
import Select from '../form/Select';
import SubmitButton from '../form/SubmitButton';
import {Multiselect} from 'multiselect-react-dropdown';


function SchedulerForm({ handleSubmit, SchedulerData, btnText}) {

    const [servicos, setServicos] = useState([])
    const [scheduler , setScheduler] = useState(SchedulerData || {})
    const [horarios, SetHorarios] = useState([])
    const [pet, setPet] = useState([])
    const [func, setFunc] = useState([])
    const [scheduler2, setScheduler2] = useState([])
    const [selectedItems, setSelectedItems] = useState([]);
    const [, updateState] = useState();

    useEffect(() => {
        Promise.all([
            axios.get('http://localhost:8000/usuarios'),
            axios.get('http://localhost:8000/schedulers'),
            axios.get('http://localhost:8000/servicos'),
            axios.get('http://localhost:8000/horarios'),
            axios.get('http://localhost:8000/pets')
        ])
        .then(([usuarios, schedulers, servicos, horarios, pets]) => {
            setFunc(usuarios.data);
            setScheduler2(schedulers.data);
            setServicos(servicos.data);
            SetHorarios(horarios.data);
            setPet(pets.data);
        })
        .catch(error => {
            console.log('Erro ao buscar dados:', error);
        });
    }, []);

    const submit = (e) => {
        e.preventDefault()
        handleSubmit(scheduler)
    }

    function handleChange(e) {
        const allowedKeys = new Set(["pet_id", "dono_id", "horario_id","usuario_id"]);
        const value = allowedKeys.has(e.target.name) ? parseInt(e.target.value) : e.target.value;
        setScheduler({...scheduler, [e.target.name]: value});
        console.log(scheduler)
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

    

    const handleSelect = (selected) => {
        setSelectedItems(selected);
      
        // Obter o nome do serviço selecionado
        const servico_name = selected.map((item) => item.nome_servico).join(", ");
        servico_name.trim();
      
        const servico_id=1;
        // Obter o valor total selecionado
        const valor_final = somaValoresSelecionados();
      
        // Atualizar as propriedades "servico_name" e "valor_final" do objeto "scheduler"
        setScheduler({
          ...scheduler,
          servico_id,
          servico_name,
          valor_final,
        });
      
        // Atualizar o estado do componente
        updateState();
      
        console.log(scheduler);
      };
    const handleRemove = (removedItem) => {
        setSelectedItems(selectedItems.filter(item => item !== removedItem));
        updateState({});
    };
    

  const somaValoresSelecionados = () => {
        let total = 0;
        selectedItems.forEach((item) => {
            total += item.valor;
        });
        return total;
    };
      

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
                    pet ? pet.find(
                        (pet) => pet.id === scheduler.pet_id
                    )?.raca : ""
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
                    pet ? pet.find(
                        (pet) => pet.id === scheduler.pet_id
                    )?.porte : ""
                }
            />
            </div>

            <Multiselect
            showArrow={true}
            style={{ chips: { background: "pink" },  searchBox: { background: "white", border:"1em", padding: "0.7em" } }}
            displayValue="nome_servico"
            isObject={true}
            placeholder=''
            searchBox={true}
            onKeyPressFn={function noRefCheck(){}}
            onSearch={function noRefCheck(){}}
            onSelect={handleSelect}
            onRemove={handleRemove}
            onSubmit={function noRefCheck(){}}
            options={servicos || []} 
            />


            <Input
                type="text"
                text="Preço do Serviço"
                name="price"
                placeholder="Preço do Serviço"
                disabled={true}
                handleOnChange={handleSelect}
                value={"R$"+somaValoresSelecionados()+",00"}
                

              
            />

            <div className="flex justify-between space-x-2 ">
                <Input
                    type="date"
                    text="Data do Serviço"
                    name="created_by"
                    placeholder="Data do Serviço"
                    disabled={false}
                    handleOnChange={handleChange}
                    value={scheduler.created_by ? scheduler.date : ''}
                />

                <div className='h-12'>
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