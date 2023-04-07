import styles from './SchedulerCard.module.css'
import { Link } from "react-router-dom";
import {BsPencil, BsFillTrashFill} from 'react-icons/bs'
function SchedulerCard({id, name, petservice, porte, raca, price, horario, date, func, handleRemove}) {

    const remove = (e) => {
        e.preventDefault()
        handleRemove(id)
    }
    return ( 
        // <div className={styles.project_card}>
        //     <div className={styles.project_card_title}>
        //         <h4>Pet: {name}</h4>
        //         <h4>porte:  {porte}</h4>
        //         <h4>Raça:   {raca}</h4>
        //     </div>
            
        //     <p className={styles.value_text}>
        //         <span style={
        //             {marginRight: '10px'}
        //         } >Serviço: </span> {petservice} <span className={styles.number}> </span>
        //         <span>Valor:</span> R$ {price},00
        //     </p>
        //     <p>
        //         <span>Data:</span> {date.split('-').reverse().join('/')} <span className={styles.number}>Horário</span> {horario}
        //     </p>
        //     <p>
        //         <span>Funcionário:</span> {func}
        //     </p>
        //     <div className={styles.project_card_actions}>
        //         <Link to={`/scheduler/${id}`}>
        //             <BsPencil/> Editar
        //         </Link>
        //         <button onClick={remove}>
        //             <BsFillTrashFill/> Excluir
        //         </button>
        //     </div>
        // </div>
    <div className="px-2 mb-6">
        <div className="bg-white rounded-lg overflow-hidden shadow-lg w-max" style={{width:'30rem'}}>
  <div class="px-4 py-3 border-b border-gray-200">
    <h2 class="text-2xl font-bold">{name}</h2>
    <p class="text-gray-600">Ryan Evaristo de Lima</p>
  </div>
  <div class="px-4 py-2 border-b border-gray-200 flex justify-between items-center">
    <div class="w-1/2">
    <div className="w-full h-40 bg-cover bg-center" style={{ backgroundImage: `url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSIRyMpCY1M0sLMFFvGPODkFYTgDEWze2SrxB5VWiOA&s')` }}></div>

    </div>
    <div class="w-2/3 ml-4">
      <p class="text-gray-600 mb-2">{date} - {horario}</p>
      <p class="text-gray-600 mb-2">{porte} | {raca}</p>
      <p class="text-gray-600 mb-2">(79) 9999-9999</p>
      <p class="text-gray-600 mb-2">{petservice}</p>
      <p class="text-gray-600">R${price},00</p>
    </div>
  </div>
  <div className={`${styles.project_card_actions} justify-evenly mb-2`}>
                 <Link to={`/scheduler/${id}`}>
                     <BsPencil/> Editar
                 </Link>
                 <button onClick={remove}>
                     <BsFillTrashFill/> Excluir
                 </button>
             </div>
</div>
    </div>

     );
}

export default SchedulerCard;