import styles from "./FuncionarioCard.module.css"
import { Link } from "react-router-dom";
import {BsPencil, BsFillTrashFill} from 'react-icons/bs'

function FuncionarioCard({id, name, endereco, phone, cpf, email, handleRemove}) {
    
        const remove = (e) => {
            e.preventDefault()
            handleRemove(id)
        }
        
        return ( 
            <div className={styles.project_card}>
                <h4>{name}</h4>
                <p>
                <span>Cliente:</span> {name}<span className={styles.number}>{cpf}</span>
                
                </p>
                <p>
                    <span>Telefone:</span> {phone} <span className={styles.number}>{email}</span>

                </p>
                <p>
                    <span>Endereço: {endereco}</span>
                </p>
    
                <br />
                <div className={styles.project_card_actions}>
                    <Link to={`/funcionario/${id}`}>
                        <BsPencil/> Editar
                    </Link>
                    <button onClick={remove}>
                        <BsFillTrashFill/> Excluir
                    </button>
                </div>
            </div>
        );
    }

export default FuncionarioCard;