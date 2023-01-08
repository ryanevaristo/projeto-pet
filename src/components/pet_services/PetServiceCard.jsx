import styles from "./PetServiceCard.module.css"
import { Link } from "react-router-dom";
import {BsPencil, BsFillTrashFill} from 'react-icons/bs'

function PetServiceCard({id, name, description, time, value, handleRemove}) {
    
        const remove = (e) => {
            e.preventDefault()
            handleRemove(id)
        }
        
        return ( 
            <div className={styles.project_card}>
                <h4>{name}</h4>
                <p>
                    <span>Descrição:</span> {description}
                </p>

                <p>
                    <span>Tempo:</span> {time}
                </p>

                <p>
                    <span>Valor:</span> {value}
                </p>
    
                <br />
                <div className={styles.project_card_actions}>
                    <Link to={`/petservices/${id}`}>
                        <BsPencil/> Editar
                    </Link>
                    <button onClick={remove}>
                        <BsFillTrashFill/> Excluir
                    </button>
                </div>
            </div>
        );
    }

export default PetServiceCard;