import styles from "./PetCard.module.css"
import { Link } from "react-router-dom";
import {BsPencil, BsFillTrashFill} from 'react-icons/bs'
function PetCard({id, name, porte, raca, handleRemove}) {

    const remove = (e) => {
        e.preventDefault()
        handleRemove(id)
    }
    
    return ( 
        <div className={styles.project_card}>
            <h4>{name}</h4>
            <p>
                <span>Pet:</span> {name}  <span className={styles.number}>Porte: </span> {porte}
            </p>

            <p>
                <span >Raça: </span>  {raca}
            </p>
            
            <br />
            <div className={styles.project_card_actions}>
                <Link to={`/pets/${id}`}>
                    <BsPencil/> Editar
                </Link>
                <button onClick={remove}>
                    <BsFillTrashFill/> Excluir
                </button>
            </div>
        </div>
     );
}

export default PetCard;