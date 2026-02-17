import {useState} from 'react';

import Input from '../formularios/Input';
import SubmitButton from '../formularios/SubmitButton';

import styles from "../projetos/ProjetoForm.module.css";


function ServiceForm(HanddleSubmit, btnText, projetoData) {
    const [formData, setFormData] = useState({
        name: '',
        cost: '',
        description: ''
    });

    function submit() {


    }

    function hanndeOnChange(e: React.ChangeEvent<HTMLInputElement>) {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    }

    return (
        <form onSubmit={submit} className={styles.form}>
            <Input 
                type="text" 
                text='Nome do serviço'
                name="name" 
                placeholder="Insira o nome do serviço"
                value={formData.name}
                handleOnChange={hanndeOnChange}
            />

            <Input 
                type="number" 
                text='Custo do serviço'
                name="cost" 
                placeholder="Insira o custo valor total"
                value={formData.cost}
                handleOnChange={hanndeOnChange}
            />
            <Input 
                type="text" 
                text='descrição do serviço'
                name="description" 
                placeholder="Insira a descrição do serviço"
                value={formData.description}
                handleOnChange={hanndeOnChange}
            />
            
            <SubmitButton text={btnText}/>
        </form>
    )
}

export default ServiceForm;