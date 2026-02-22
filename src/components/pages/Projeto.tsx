import styles from './Projeto.module.css';

import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';


import Loading from '../layout/Loading';
import Container from '../layout/Container';
import ProjetoForm from '../projetos/ProjetoForm';
import ServiceForm from '../servicos/ServiceForm';
import ServiceCard from '../servicos/ServiceCard';
import Message from './Message';

function Projeto() {
    const { id } = useParams();

    const [projeto, setProjeto] = useState({} as any)

    const [services, setServices] = useState({} as any)

    const[showProjetoForm, setShowProjetoForm] = useState(false);

    const[message, setMessage] = useState<string | undefined>();

    const[showServiceForm, setShowServiceForm] = useState(false);

    const[type, setType] = useState<string | undefined>();


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
            setServices(data.services);
        })
        .catch((err) => console.log(err));
        }, 300);
    }, [id])

    function editPost(projeto: any) {

        setMessage('');

        if(projeto.budget < projeto.cost) {
            setMessage('O orçamento não pode ser menor que o custo do projeto!');
            setType('error');
            return false;
        }
        fetch(`http://localhost:5000/projects/${projeto.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(projeto),

    })
    .then((resp) => resp.json())
    .then((data) => {
        setProjeto(data);
        
        setShowProjetoForm(false);
        setMessage('Projeto atualizado com sucesso!');
        setType('success');
    })
    .catch((err) => console.log(err));
    }

    function createService(projeto: any) {

        setMessage('');

        // 1. Garantir que o array de serviços existe
        if (!projeto.services) {
            projeto.services = [];
        }

        // 2. Pegar o último serviço adicionado pelo formulário e gerar ID
        const lastService = projeto.services[projeto.services.length - 1];
        lastService.id = uuidv4();

        const lastServiceCost = lastService.cost;
        const newCost = parseFloat(projeto.cost || 0) + parseFloat(lastServiceCost);

        // 3. Validação de orçamento
        if (newCost > parseFloat(projeto.budget)) {
            setMessage('Orçamento ultrapassado, verifique o valor do serviço!');
            setType('error');
            projeto.services.pop(); // Remove o serviço inválido
            return false;
        }

        // 4. Atualizar o custo total do projeto
        projeto.cost = newCost;

        // 5. Atualizar o projeto no backend (PATCH)
        fetch(`http://localhost:5000/projects/${projeto.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(projeto),
        })
        .then((resp) => resp.json())
        .then((data) => {
            setProjeto(data);
            setShowServiceForm(false);
            setMessage('Serviço adicionado com sucesso!');
            setType('success');
        })
        .catch((err) => console.log(err));
    }

    function removeService() {

    }

    
    function toggleProjetoForm() {
        setShowProjetoForm(!showProjetoForm);
    } 
     function toggleServiceForm() {
        setShowServiceForm(!showServiceForm);
    } 
        return (
        <>
            {projeto.name ? (
                <div className={styles.projeto_detalhes}>
                    <Container customClass='column'>
                        {message && <Message type={type ?? ''} msg={message ?? ''} />}
                        <div className={styles.detalhes_container}>
                            <h1>Projeto: {projeto.name}</h1>
                            <button className={styles.btn} onClick={toggleProjetoForm}>
                                {!showProjetoForm ? "Editar projeto" : "Fechar edição"}
                            </button>
                            {!showProjetoForm ? (
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
                                    <ProjetoForm 
                                        handleSubmit={editPost}
                                        btnText='Concluir Edição'
                                        projetosData={projeto}
                                    />  
                                </div>
                            )}
                        </div>
                        <div className={styles.service_from_container}> 
                            <h2>Adicione um serviço</h2>
                            <button className={styles.btn} onClick={toggleServiceForm}>
                                {!showServiceForm ? 'Adicionar serviço' : 'Fechar'}
                            </button>
                                <div className={styles.projeto_info}>
                                    {showServiceForm && <ServiceForm
                                        handleSubmit={createService}
                                        btnText="Adicionar serviço"
                                        projetosData={projeto}
                                    />}
                                </div>
                        </div>
                        <h2>Serviços</h2>
                        <Container customClass='start'>
                            {services && services.length > 0 && 
                                services.map((service: any) => (
                                    <ServiceCard
                                        key={service.id}
                                        id={service.id}
                                        name={service.name}
                                        cost={service.cost}
                                        description={service.description}
                                        handleRemove={removeService}
                                    />
                                    
                                ))
                            }
                            {(!services || services.length === 0) && <p>Não há serviços cadastrados.</p>} 
                        </Container>
                    </Container>
                </div>
            ) : (
                <Loading />
            )}
        </>
    );
}

export default Projeto;