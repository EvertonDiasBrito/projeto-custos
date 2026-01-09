import Input from "../formularios/input"
import Select from "../formularios/Select";
import SubmitButton from "../formularios/SubmitButton";
import styles from "./ProjetoForm.module.css"

function ProjetoForm({ btnText }) {
    return (
        <form className={styles.form}>
            <Input 
                type="text"
                text="Nome do projeto"
                name="name"
                placeholder="Insira o nome do projeto"
            />
            <Input 
                type="number"
                text="orçamento do projeto"
                name="buget"
                placeholder="Insira o orçamento total"
            />
            <Select name="category_id" text="Selecione a categoria"/>
            <SubmitButton text={btnText}/>
        </form>
    );
}

export default ProjetoForm