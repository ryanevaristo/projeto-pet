import styles from "./SchedulerCard.module.css"
import { Link } from "react-router-dom";
import {BsPencil, BsFillTrashFill} from 'react-icons/bs'
function ProjectCard({id, name, petservice, porte, raca, price, horario, data, func, dono, phone, handleRemove}) {

    const remove = (e) => {
        e.preventDefault()
        handleRemove(id)
    }
    return ( 
        <div className={styles.project_card}>
            <div className={styles.project_card_title}>
                <h4>Pet: {name}</h4>
                <h4>porte:  {porte}</h4>
                <h4>Raça:   {raca}</h4>
            </div>
            
            <p className={styles.value_text}>
                <span style={
                    {marginRight: '10px'}
                } >Serviço: </span> {petservice} <span className={styles.number}> </span>
                <span>Valor:</span> R$ {price},00
            </p>
            <p>
                <span>Dono:</span> {dono}<span className={styles.number}>Telefone:</span> {phone}
                
            </p>
            <p>
                <span>Data:</span> {data} <span className={styles.number}>Horário</span> {horario}
            </p>
            <p>
                <span>Funcionário:</span> {func}
            </p>
            <div className={styles.project_card_actions}>
                <Link to={`/project/${id}`}>
                    <BsPencil/> Editar
                </Link>
                <button onClick={remove}>
                    <BsFillTrashFill/> Excluir
                </button>
            </div>
        </div>
     );
}

export default ProjectCard;