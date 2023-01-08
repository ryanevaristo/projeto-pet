import styles from "./PetServiceForm.module.css"
import { useState, useEffect } from "react"
import SubmitButton from "../form/SubmitButton"
import Input from "../form/Input"

function PetServiceForm({ handleSubmit, petServiceData, btnText }) {
    const [petService, setPetService] = useState(petServiceData || {})



    const submit = (e) => {
        e.preventDefault()
        handleSubmit(petService)
    }

    function handleChange(e) {
        setPetService({ ...petService, [e.target.name]: e.target.value })
    }

    return (
        <form className={styles.form} onSubmit={submit}>
            <Input
                text="Nome do serviço"
                type="text"
                name="name"
                placeholder="Nome do serviço"
                value={petService.name}
                handleOnChange={handleChange}
            />
            
            <Input
                text={"Tempo de duração"}
                type="text"
                name="time"
                placeholder="Exemplo: 30 minutos"
                value={petService.time}
                handleOnChange={handleChange}
            />
            <Input
                text="Preço"
                type="number"
                name="price"
                placeholder="Preçõ do serviço"
                value={petService.value}
                handleOnChange={handleChange}
            />
            <Input
                text="Descrição"
                type="textarea"
                name="description"
                placeholder="Descrição"
                value={petService.description}
                handleOnChange={handleChange}
            />
            <SubmitButton text={btnText} />
            </form>
            
            )}

export default PetServiceForm;