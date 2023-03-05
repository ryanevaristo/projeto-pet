import styles from './PetForm.module.css'
import { useState, useEffect } from 'react';
import Select from '../form/Select';
import SubmitButton from '../form/SubmitButton';
import Input from '../form/Input';
import { useParams } from "react-router-dom";
import{ raca, pelagem, sexo, porte } from '../../localstorage/LocalStorage'




function PetForm({ handleSubmit, animalData, btnText}) {
    const [animal , setAnimal] = useState(animalData || {})

    const {id} = useParams()
    
    useEffect(() => {
        // supondo que você tenha o dono_id no estado do componente pai
        const dono_id = parseInt(id);
        setAnimal(prevState => ({ ...prevState, dono_id }));
      }, []);
      
    // GET DONOS


    const submit = (e) => {
        e.preventDefault()
        handleSubmit(animal)
        console.log(animal);
    }

    function handleChange(e) {
        setAnimal({...animal, [e.target.name]:  e.target.value})
        
    }
    console.log(animal);

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
            <Select name="raca"
                text="Raça"
                options={raca}
                nome = {"nome"}
                handleOnChange={handleChange}
                value={animal.raca ? animal.raca: ''}
                />
            <Select name="sexo"
                text="Sexo"
                options={sexo}
                nome = {"nome"}
                handleOnChange={handleChange}
                value={animal.sexo ? animal.sexo : ''}
                />
            <Select name="porte"
                text="Porte"
                options={porte}
                nome = {"nome"}
                handleOnChange={handleChange}
                value={animal.porte ? animal.porte : ''}
                />
            <Select name="pelagem"
                text="Pelagem"
                options={pelagem}
                nome = {"nome"}
                handleOnChange={handleChange}
                value={animal.pelagem ? animal.pelagem : ''}
            />
            <Input
                type="text"
                text="Observações"
                name="observacoes"
                placeholder="Insira alguma observação"
                handleOnChange={handleChange}
                value={animal.observacoes ? animal.observacoes : ""}
            />
            <SubmitButton text={btnText}  />
            </form>
            )

}

export default PetForm;