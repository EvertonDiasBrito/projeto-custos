import {useState} from 'react';
import { useNavigate } from 'react-router-dom';

import Input from '../formularios/Input';
import SubmitButton from '../formularios/SubmitButton';

import styles from "../projetos/ProjetoForm.module.css";

interface ServiceFormProps {
    handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
    btnText: string;
    projetosData: any;
    name?: string;
    cost?: number;
    description?: string;
}

interface Servico {
    name?: string;
    cost?: number;
    description?: string;
}


function ServiceForm({ handleSubmit, btnText, projetosData }: ServiceFormProps) {
    const [servico, setServico] = useState<Servico>({});
    const navigate = useNavigate()

    function submit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        if (!projetosData.services) {
            projetosData.services = [];
        }
        projetosData.services.push(servico);
        handleSubmit(projetosData);
        navigate(`/projetos/${projetosData.id}`)
    }

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        setServico({
            ...servico,
            [e.target.name]: e.target.value,
        })
    }

    return (
        <form onSubmit={submit} className={styles.form}>
            <Input 
                type="text" 
                text='Nome do serviço'
                name="name" 
                placeholder="Insira o nome do serviço"
                value={servico.name}
                handleOnChange={handleChange}
            />

            <Input 
                type="number" 
                text='Custo do serviço'
                name="cost" 
                placeholder="Insira o custo valor total"
                value={servico.cost}
                handleOnChange={handleChange}
            />
            <Input 
                type="text" 
                text='descrição do serviço'
                name="description" 
                placeholder="Insira a descrição do serviço"
                value={servico.description}
                handleOnChange={handleChange}
            />
            
            <SubmitButton text={btnText}/>
        </form>
    )
}

export default ServiceForm;