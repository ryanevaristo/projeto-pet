import styles from "./FuncionarioForm.module.css"
import { useState} from "react"
import SubmitButton from "../form/SubmitButton"
import Input from "../form/Input"

function FuncionarioForm({ handleSubmit, FuncionarioData, btnText }) {
    const [funcionario, setFuncionario] = useState(FuncionarioData || {})



    const submit = (e) => {
        e.preventDefault()
        handleSubmit(funcionario)
    }

    function handleChange(e) {
        setFuncionario({ ...funcionario, [e.target.name]: e.target.value })
    }

    return (
        <form className={styles.form} onSubmit={submit}>
            <Input
                text="Nome completo"
                type="text"
                name="name"
                placeholder="Nome do funcionário"
                value={funcionario.name}
                handleOnChange={handleChange}
            />
            
            <Input
                text={"CPF"}
                type="text"
                name="cpf"
                placeholder="Exemplo: 000.000.000-00"
                value={petService.cpf}
                handleOnChange={handleChange}
            />
            <Input
                type="email"
                text="Email"
                name="email"
                placeholder={"exemplo@gmail.com"}
                value={funcionario.email}
                handleOnChange={handleChange}
            />
            <Input
                type="text"
                text="Telefone"
                name="telefone"
                placeholder={"(00) 00000-0000"}
                value={funcionario.telefone}
                handleOnChange={handleChange}
            />
            <Input
                type="text"
                text="Endereço"
                name="endereco"
                placeholder={"Rua, Número, Bairro, Cidade, Estado"}
                value={funcionario.endereco}
                handleOnChange={handleChange}
            />
            <SubmitButton text={btnText} />
            </form>
            
            )}

export default FuncionarioForm;