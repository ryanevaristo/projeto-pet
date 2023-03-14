import Message from "../layout/Message";
import Container from '../layout/Container'
import LinkButton from "../layout/LinkButton";

import { useLocation } from "react-router-dom";

import styles from './Pets.module.css'
import { useState, useEffect } from "react";
import Loading from "../layout/Loading";
import PetServiceCard from "../pet_services/PetServiceCard";


function PetServices() {
    const [petServices, setPetServices] = useState([])
    const [removeLoad, setRemoveLoad] = useState(false)
    const [petServiceMsg, setPetServiceMsg] = useState('')
    const location = useLocation()
    let message = ''
    if (location.state) {
        message = location.state.message
    }

    useEffect(() => {
        setTimeout(() => {
            fetch('http://192.168.0.12:8000/servicos', {
            method:'GET',
            headers: {
                'Content-Type' : 'application/json',
            },
        })
        .then((resp) => resp.json())
        .then((data) => {
            console.log(data)
            setPetServices(data)
            setRemoveLoad(true)
        })
        .catch((err) => console.log(err))
        }, 1000)

    },[])

    function RemovePetServices(id){
        fetch(`http://192.168.0.12:8000/servicos/${id}`,{
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
        }).then(resp => resp.json())
        .then(data => {
            setPetServices(petServices.filter((petService) => petService.id !== id))
            setPetServiceMsg('Pet removido com sucesso!')

        })
        .catch(err => console.log(err))
    }

    return (
        <div className={styles.pets_container}>
            <div className={styles.title_container}>
            <h1>Serviços</h1>
            <br/>
            <LinkButton to="/petservices/new" text="Adicionar novo serviço" />
            </div>
            {message && <Message message={message} />}
            {petServiceMsg && <Message message={petServiceMsg} />}
            <Container customClass='start'>
                {petServices.length > 0 &&
                  petServices.map((petService) => (
                    <PetServiceCard
                    key={petService.id}
                    id={petService.id}
                    name={petService.nome}
                    description={petService.descricao}
                    price={petService.valor}
                    executionTime={petService.tempo}
                    RemovePetServices={RemovePetServices}
                    handleRemove={RemovePetServices}
                    />
                ))}
                {!removeLoad && <Loading />}
                {!removeLoad && petServices.length === 0 && <p>Nenhum serviço cadastrado</p>}
                
            </Container>

            </div>

    )
}

export default PetServices;
