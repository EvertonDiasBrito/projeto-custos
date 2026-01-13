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
    handleSubmit: (projetos: { [key: string]: any }) => void;
    projetosData: { [key: string]: any };
    category: string;
    
}

function ProjetoForm({ handleSubmit, btnText, projetosData }: ProjetoFormProps) {
  const [category, setCategory] = useState<{ id: number; name: string }[]>([])
  const [projetos, setProjetos] = useState<{ [key: string]: any }>(projetosData || {})

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

    const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    handleSubmit(projetos)
  }
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