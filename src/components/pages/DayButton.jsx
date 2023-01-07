import styles from './DayButton.module.css'
import {Link} from 'react-router-dom'

function DayButton({text}) {
    return ( 
        <button className={styles.btn}>{text}</button>
     );
}

export default DayButton;