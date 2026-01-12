import styles from "./Select.module.css";

interface InputProps {
  text: string;
  name: string;
  options: { id: number; name: string }[]
  handleOnChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  value: string;
}

function Select({ text, name, options, handleOnChange, value }: InputProps) {
    return (
        <div className={styles.form_control}>
            <label htmlFor={name}>{text}</label>
            <select 
                name={name} 
                id={name} 
                value={value || ""} 
                onChange={handleOnChange}
            > 
                <option>Selecione uma opçáo</option>
                {options.map((option) => (
                    <option value={option.id} key={option.id}>{option.name}</option>
                ))}
            </select>

        </div>
    )
}

export default Select