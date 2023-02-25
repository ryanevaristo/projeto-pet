import styles from './DayButton.module.css'

function DayButton({text, onClick} ) {
    return ( 
        <button className={styles.btn} onClick={onClick}>{text}</button>
        
     );
}

export default DayButton;