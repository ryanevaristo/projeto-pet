import styles from './AnimalForm.module.css'
import { useState, useEffect } from 'react';
import Select from '../form/Select';
import SubmitButton from '../form/SubmitButton';
import Input from '../form/Input';
function AnimalForm({ handleSubmit, animalData, btnText}) {
    const [animal , setAnimal] = useState(animalData || {})
    const [raca, setRaca] = useState([])
    const [dono, setDono] = useState([])
    // GET RACAS
    useEffect(() =>{
        fetch("http://localhost:5000/Racas",
    {
        method: "GET",
        headers:{
            'Content-type': 'aplication/json'
        }
    }
    ).then((resp) => resp.json())
    .then((data) => {
        setRaca(data)
    }).
    catch((error) => console.log(error));
    },[])
    // GET DONOS
    useEffect(() =>{
        fetch("http://localhost:5000/Donos",
    {
        method: "GET",
        headers:{
            'Content-type': 'aplication/json'
        }
    }
    ).then((resp) => resp.json())
    .then((data) => {
        setDono(data)
    }).
    catch((error) => console.log(error));
    },[])

    const submit = (e) => {
        e.preventDefault()
        handleSubmit(animal)
    }

    function handleChange(e) {
        setAnimal({...animal, [e.target.name]: e.target.value})
    }
    function handleRaca(e) {
        setAnimal({...animal, raca: {
            id: e.target.value,
            name: e.target.options[e.target.selectedIndex].text
        }})
    }
    return (
        <form className={styles.form} onSubmit={submit}>
           <Input
                type="text"
                text="Nome do Pet"
                name="nome"
                placeholder="Insira o nome do Pet"
                handleOnChange={handleChange}
                value={animal.nome ? animal.nome : ""}
           />
           <Select name="dono_id"
                text="Dono"
                options={dono}
                handleOnChange={handleRaca}
                value={animal.dono ? animal.dono.id : ''}
                />
            <Select name="raca_id"
                text="Raça"
                options={raca}
                handleOnChange={handleRaca}
                value={animal.raca ? animal.raca.id : ''}
                />
            <Select name="sexo"
                text="Sexo"
                options={[{id: 'M', name: 'Macho'}, {id: 'F', name: 'Fêmea'}]}
                handleOnChange={handleChange}
                value={animal.sexo ? animal.sexo : ''}
                />
            <Select name="porte"
                text="Porte"
                options={[{id: 'P', name: 'Pequeno'}, {id: 'M', name: 'Médio'}, {id: 'G', name: 'Grande'}]}
                handleOnChange={handleChange}
                value={animal.porte ? animal.porte : ''}
                />
            <SubmitButton text={btnText} />
            </form>
            )

}

export default AnimalForm;