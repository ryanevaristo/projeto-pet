import {useState } from 'react'

import styles from './ClientForm.module.css'
import Input from '../form/Input'
import SubmitButton from '../form/SubmitButton'


function ClientForm({ handleSubmit, clientData, btnText}) {
    const [client , setClient] = useState(clientData || {})


    const submit = (e) => {
        e.preventDefault()
        handleSubmit(client)
    }

    function handleChange(e) {
        setClient({ ...client, [e.target.name]: e.target.value })
      }

    return (
        <form className={styles.form} onSubmit={submit}>
           <Input
                
                type="text"
                text="Nome do Cliente"
                name="name"
                placeholder="Insira o nome do Cliente"
                value={client.name}
                handleOnChange={handleChange}
            />
            <Input
                type="text"
                text="CPF"
                name="cpf"
                placeholder={"000.000.000-00"}
                value={client.cpf}
                handleOnChange={handleChange}
            
            />
            <Input
                type="email"
                text="Email"
                name="email"
                placeholder={"exemplo@gmail.com"}
                value={client.email}
                handleOnChange={handleChange}
            />
            <Input
                type="text"
                text="Telefone"
                name="telefone"
                placeholder={"(00) 00000-0000"}
                value={client.telefone}
                handleOnChange={handleChange}
            />
            <Input
                type="text"
                text="Endereço"
                name="endereco"
                placeholder={"Rua, Número, Bairro, Cidade, Estado"}
                value={client.endereco}
                handleOnChange={handleChange}
            />
            
            
            <SubmitButton text={btnText} />
        </form>
    )
}

export default ClientForm