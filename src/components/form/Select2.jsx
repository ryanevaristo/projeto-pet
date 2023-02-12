import styles from './Select.module.css'

function Select2({text, name, options, handleOnChange, value}) {
    return ( 
        
        <div className={styles.form_control}>
            <label htmlFor={name}>{text}:</label>
            <select name={name}
             id={name}
              onChange={handleOnChange}
               value={value || ''}>
                <option value="">Selecione uma opção</option>
                {options.map((option) => (
                    <option value={option.id} data-raca={option.raca.name}  data-porte={option.porte} key={option.id}>{option.name} </option>

                    
                    
                    
                ))}
            </select>

        </div>
     );
}

export default Select2;