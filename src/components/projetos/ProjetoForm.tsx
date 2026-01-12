import { useEffect, useState } from "react";

import Input from "../formularios/Input"
import Select from "../formularios/Select";
import SubmitButton from "../formularios/SubmitButton";

import styles from "./ProjetoForm.module.css"

interface ProjetoFormProps {
    btnText: string;
    type: string;
    text: string;
    name: string;
    placeholder: string;
    handleOnChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    value: string;
    handleSubmit: string;
    projetosData: string;
    category: string;
}

function ProjetoForm({ handleSubmit, btnText, projetosData }: ProjetoFormProps) {
    const [category, setCategory] = useState<{ id: number; name: string }[]>([]) //ver
    const [projetos, setProjetos] = useState(projetosData || {})

    useEffect(() => {
        fetch("http://localhost:5000/categories", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        })

            .then((resp) => resp.json())
            .then((data) => {
                setCategory(data)
            })
            .catch((err) => console.log(err))
    }, [])

    const submit = (e) => {
        e.preventDefault()
        //console.log(projetos)
        handleSubmit(projetos)
    }
    function handleChange(e) {
        setProjetos({ ...projetos, [e.target.name]: e.target.value })

    }
    function handleCategory(e) {
        const selectedOption = e.target.options[e.target.selectedIndex]
        setProjetos({
            ...projetos,
            category: {
                id: e.target.value,
                name: selectedOption.text
            }
        })
    }
    return (
        <form onSubmit={submit} className={styles.form}>
            <Input
                type="text"
                text="Nome do projeto"
                name="name"
                placeholder="Insira o nome do projeto"
                handleOnChange={handleChange}
                value={projetos.name ? projetos.name : ""}
            />
            <Input
                type="number"
                text="orçamento do projeto"
                name="budget"
                placeholder="Insira o orçamento total"
                handleOnChange={handleChange}
                value={projetos.budget ? projetos.budget : ""}
            />
            <Select
                name="category_id"
                text="Selecione a categoria"
                options={category}
                handleOnChange={handleCategory}
                value={projetos.category ? projetos.category.id : ""}
            />
            <SubmitButton text={btnText} />
        </form>
    );
}

export default ProjetoForm