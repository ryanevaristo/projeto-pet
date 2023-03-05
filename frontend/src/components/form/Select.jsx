import styles from './Select.module.css'

function Select({text, name, options, handleOnChange, value, nome}) {

    return ( 
        
        <div className={styles.form_control}>
            <label htmlFor={name}>{text}:</label>
            <select name={name}
             id={name}
              onChange={handleOnChange}
               value={value || ''}>
                <option value="">Selecione uma opção</option>
                {options.map((option) => (
                    <option value={option.id} nome={option.nome} key={option.id}>{option[nome]} </option>
                ))}
            </select>

        </div>
     );
}

export default Select;