import styles from './Projeto.module.css';

import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Loading from '../layout/Loading';
import Container from '../layout/Container';

function Projeto() {
    const { id } = useParams();

    const [projeto, setProjeto] = useState({} as any)

    const[showProjetoForm, setShowProjetoForm] = useState(false);

    useEffect(() => {
        setTimeout(() => {
            fetch(`http://localhost:5000/projects/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
        .then((resp) => resp.json())
        .then((data) => {
            setProjeto(data);
        })
        .catch((err) => console.log(err));
        }, 300);
    }, [id])

    function toggleProjetoForm() {
        setShowProjetoForm(!showProjetoForm);
    } 
    
    return (
        <>
            {projeto.name ? (
                <div className={styles.projeto_detalhes}>
                    <Container customClass='column'>
                        <div className={styles.detalhes_container}>
                            <h1>Projeto: {projeto.name}</h1>
                            <button className={styles.btn} onClick={toggleProjetoForm}>
                                {! showProjetoForm ? "Editar projeto" : "Fechar edição"}
                            </button>
                            {! showProjetoForm ? (
                                <div className={styles.projeto_info}>
                                    <p>
                                        <span>Categoria:</span> {projeto.category.name}
                                    </p>
                                    <p>
                                        <span>Total de Orçamento:</span> R${projeto.budget}
                                    </p>
                                    <p>
                                        <span>Total Utilizado:</span> R${projeto.cost}
                                    </p>
                                </div>
                            ) : (
                                <div className={styles.projeto_info}>
                                    <p> Formulario </p>
                                </div>
                            )}
                        </div>
                    </Container>
                </div>
        
            ) : (
                <Loading />
            )}
        </>
    )
}

export default Projeto;