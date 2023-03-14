import Message from "../layout/Message";
import Container from '../layout/Container'
import LinkButton from "../layout/LinkButton";


import { useLocation } from "react-router-dom";

import styles from './Pets.module.css'
import { useState, useEffect } from "react";
import Loading from "../layout/Loading";
import PetCard from "../pet/PetCard";


function Pets() {

    const [pets, setPets] = useState([])
    const [removeLoad, setRemoveLoad] = useState(false)
    const [petMsg, setPetMsg] = useState('')
    const [query, setQuery] = useState('')

    const location = useLocation()
    let message = ''
    if (location.state) {
        message = location.state.message
    }

    function handleSearch(e){
        setQuery(e.target.value)
    }
    console.log(
        pets.filter((pet) => pet.name.toLowerCase().includes(query.toLowerCase()))
    )
    useEffect(() => {
        setTimeout(() => {
            fetch('http://192.168.0.12:8000/Pets', {
            method:'GET',
            headers: {
                'Content-Type' : 'application/json',
            },
        })
        .then((resp) => resp.json())
        .then((data) => {
            console.log(data)
            setPets(data)
            setRemoveLoad(true)
        }
        )
        .catch((err) => console.log(err))
        }, 1000)

    },[])

    function RemovePets(id){
        fetch(`http://192.168.0.12:8000/Pets/${id}`,{
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
        }).then(resp => resp.json())
        .then(data => {
            setPets(pets.filter((pet) => pet.id !== id))
            setPetMsg('Pet removido com sucesso!')

        })
        .catch(err => console.log(err))
    }

    return (
        <div className={styles.project_container}>
            <div className={styles.title_container}>
                <h1 className={styles.title}>Pets</h1>
                <LinkButton to="/pets/new" text="Novo Pet" />

            </div>
            {message && <Message message={message} />}
            {petMsg && <Message message={petMsg} />}
            <Container customClass='start'>
            {pets.length > 0 &&
                pets.filter((pet) => pet.name.toLowerCase().includes(query.toLowerCase()))
                .map((pets) => (
                    <PetCard
                    key={pets.id}
                    id={pets.id}
                    name={pets.name}
                    porte={pets.porte}
                    raca= {pets.raca.name}
                    handleRemove={RemovePets}/>

                ))}
                {!removeLoad && <Loading/>}
                {!removeLoad && pets.length === 0 && <p>Nenhum pet cadastrado</p>}
            </Container>
        </div>
    )
    
}

export default Pets