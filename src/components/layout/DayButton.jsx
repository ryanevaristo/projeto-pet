import styles from './DayButton.module.css'

function DayButton({text}) {
    return ( 
        <button className={styles.btn}>{text}</button>
     );
}

export default DayButton;