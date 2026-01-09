import styles from "./Select.module.css";

interface InputProps {
  text: string;
  name: string;
  options: string;
  handleOnChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
}

function Select({ text, name, handleOnChange, options, value }: InputProps) {
    return(
        <div className={styles.form_control}>
            <label htmlFor={name}>{text}</label>
            <select name={name} id={name}>
                <option>Selecione uma opçáo</option>
            </select>

        </div>
    )
}

export default Select