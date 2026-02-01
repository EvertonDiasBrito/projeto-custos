import { useLocation } from 'react-router-dom'

import { useState, useEffect } from 'react'

import Message from './Message'
import styles from './Projetos.module.css'
import Container from '../layout/Container'
import Loading from '../layout/Loading'
import LinkButton from '../layout/LinkButton'
import ProjetosCard from '../projetos/ProjetosCard'

interface Projeto {
  id: number | string;
  name: string;
  budget: number;
  category: { id: number | string; name: string; }
  
  
}

function Projetos() {
  const [projetos, setProjetos] = useState<Projeto[]>([])
  const [removeLoading, setRemoveLoading] = useState(false)
  const [projectMessage, setProjectMessage] = useState('')

  const location = useLocation()
  const message = location.state?.message

  useEffect(() => {
    setTimeout(() => {

      fetch('http://localhost:5000/projects', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then(resp => resp.json())
        .then(data => {
          console.log(data)
          setProjetos(data)
          setRemoveLoading(true)
          
        })
        .catch(err => console.log(err))
    }, 300);
    }, [])

    function removeProjeto(id: number | string) {
      fetch(`http://localhost:5000/projects/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        
      })
        .then(resp => resp.json())
        .then(data => {
          console.log(data)
          setProjetos(projetos.filter(projeto => projeto.id !== id))
          setProjectMessage('Projeto removido com sucesso!')
        })
        .catch(err => console.log(err))
    }

  return (
    <div className={styles.projetos_container}>
      <div className={styles.title_container}>
        <h1>Meus Projetos</h1>
        <LinkButton to="/novoprojeto" text="Criar Projeto" />
      </div>
      {message && <Message type="success" msg={message} />}
      {projectMessage && <Message type="success" msg={projectMessage} />}
      <Container customClass="start">
        {projetos.length > 0 &&
          projetos.map((projeto) =>
            <ProjetosCard
              key={projeto.id}
              id={projeto.id}
              name={projeto.name}
              budget={projeto.budget}
              category={projeto.category.name}
              handleRemove={removeProjeto}
              
            />)}  
            {!removeLoading && <Loading />}
            {removeLoading && projetos.length === 0 && (<p>Não há projetos cadastrados!</p>
            )}
            
      </Container>
    </div>
  );
}

export default Projetos