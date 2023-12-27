import { useNavigate } from "react-router-dom";
import PetServiceForm from "../pet_services/PetServiceForm";
import styles from "./NewPetService.module.css";

function NewPetService (){
    const navigate = useNavigate();

    function createPetService(petService){
        fetch("http://localhost:8000/servicos", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(petService),
        })
        .then((resp) => resp.json())
        .then((data) => {
            navigate("/petservices", {state: {message: "Novo serviço adicionado"}});
        });
    }

    return (
        <div className={styles.newpetservice_container}>
            <h1>Adicione um novo serviço</h1>
            <br/>
            <PetServiceForm handleSubmit={createPetService} btnText="Adicionar novo serviço" />
        </div>
    );
}

export default NewPetService;