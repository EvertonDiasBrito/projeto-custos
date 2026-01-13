import { useNavigate } from 'react-router-dom'
import ProjetoForm from '../projetos/ProjetoForm'
import styles from './NovoProjeto.module.css'

function NovoProjeto() {
    
    const navigate = useNavigate()
    function createPost(projetos: { [key: string]: any }) {
        // iniciando os serviços 
        projetos.cost = 0
        projetos.service = []

        fetch("http://localhost:5000/projects",{
            method: "POST",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify(projetos),
        })
            .then((resp) => resp.json())
            .then((data) =>{
                console.log(data)
                //redicecionando
                navigate('/projetos', { state: { message: "Projeto criado com sucesso!" } })
            })
            .catch((err) => console.log(err))
    }

    return (
        <div className={styles.novoprojeto_container}>
            <h1>Criar Projeto</h1>
            <p>Crie seu projeto para depois adicionar os serviços</p>
            <ProjetoForm handleSubmit={createPost} btnText="Criar Projeto"/>
        </div>
    )
}
export default NovoProjeto