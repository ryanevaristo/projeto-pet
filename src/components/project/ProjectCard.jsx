import styles from "./ProjectCard.module.css"
import { Link } from "react-router-dom";
import {BsPencil, BsFillTrashFill} from 'react-icons/bs'
function ProjectCard({id, name, budget, category, handleRemove}) {

    const remove = (e) => {
        e.preventDefault()
        handleRemove(id)
    }
    return ( 
        <div className={styles.project_card}>
            <h4>{name}</h4>
            <p className={styles.value_text}>
                <span>Valor do Serviço:</span> R${budget}
            </p>
            <p>
                <span>Cliente:</span> {name}<span className={styles.number}>Telefone</span> 000000000
                
            </p>
            <p>
                <span>Data</span> 00/00/0000 <span className={styles.number}>Horário</span> 00:00
            </p>
            <p className={styles.category_text}>
                <span className={`${styles[category.toLowerCase()]}`}></span> {category}
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