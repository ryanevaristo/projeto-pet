import styles from "./PetServiceForm.module.css"
import { useState} from "react"
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
                name="nome_servico"
                placeholder="Nome do serviço"
                value={petService.nome_servico}
                handleOnChange={handleChange}
            />
            
            <Input
                text={"Tempo de duração"}
                type="text"
                name="tempo"
                placeholder="Exemplo: 30 minutos"
                value={petService.tempo}
                handleOnChange={handleChange}
            />
            <Input
                text="Preço"
                type="number"
                name="valor"
                placeholder="Preço do Serviço"
                value={petService.valor}
                handleOnChange={handleChange}
            />
            <Input
                text="Descrição"
                type="textarea"
                name="descricao"
                placeholder="Descrição"
                value={petService.descricao}
                handleOnChange={handleChange}
            />
            <SubmitButton text={btnText} />
            </form>
            
            )}

export default PetServiceForm;