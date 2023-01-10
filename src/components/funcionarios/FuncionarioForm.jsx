import styles from "./FuncionarioForm.module.css"
import { useState} from "react"
import SubmitButton from "../form/SubmitButton"
import Input from "../form/Input"
import Select from "../form/Select"

function FuncionarioForm({ handleSubmit, FuncionarioData, btnText }) {
    const [func, setFuncionario] = useState(FuncionarioData || {})



    const submit = (e) => {
        e.preventDefault()
        handleSubmit(func)
    }

    function handleChange(e) {
        setFuncionario({ ...func, [e.target.name]: e.target.value })
    }

    return (
        <form className={styles.form} onSubmit={submit}>
            <Input
                text="Nome completo"
                type="text"
                name="name"
                placeholder="Nome do funcionário"
                value={func.name}
                handleOnChange={handleChange}
            />
            
            <Input
                text={"CPF"}
                type="text"
                name="cpf"
                placeholder="Exemplo: 000.000.000-00"
                value={func.cpf}
                handleOnChange={handleChange}
            />
            <Select
                text="Cargo"
                name="cargo"
                value={func.cargo}
                handleOnChange={handleChange}
                options={[
                    {id: 'G', name: 'Gerente'}, 
                    {id: 'T', name: 'Tosador'},
                    {id: 'O', name: 'Outro'}
                ]}
            />
            <Input
                type="text"
                text="Comissão"
                name="comissao"
                placeholder={"Exemplo: 10%"}
                value={func.comissao}
                handleOnChange={handleChange}
            />
            <Input
                type="email"
                text="Email"
                name="email"
                placeholder={"exemplo@gmail.com"}
                value={func.email}
                handleOnChange={handleChange}
            />
            <Input
                type="text"
                text="Telefone"
                name="telefone"
                placeholder={"(00) 00000-0000"}
                value={func.telefone}
                handleOnChange={handleChange}
            />
            <Input
                type="text"
                text="Endereço"
                name="endereco"
                placeholder={"Rua, Número, Bairro, Cidade, Estado"}
                value={func.endereco}
                handleOnChange={handleChange}
            />
            <SubmitButton text={btnText} />
            </form>
            
            )}

export default FuncionarioForm;