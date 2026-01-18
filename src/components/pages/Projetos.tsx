import { useLocation } from 'react-router-dom'

import { useState, useEffect } from 'react'

import Message from './Message'
import styles from './Projetos.module.css'
import Container from '../layout/Container'
import LinkButton from '../layout/LinkButton'
import ProjetosCard from '../projetos/ProjetosCard'

interface Projeto {
  id: number | string;
  name: string;
  budget: number;
  category: string;
}

function Projetos() {
  const [projetos, setProjetos] = useState<Projeto[]>([])

  const location = useLocation()
  const message = location.state?.message

  useEffect(() => {

    fetch('http://localhost:5000/projects', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(resp => resp.json())
      .then(data => {
        console.log(data)
        setProjetos(data)
      })
      .catch(err => console.log(err))

  }, [])

  return (
    <div className={styles.projetos_container}>
      <div className={styles.title_container}>
        <h1>Meus Projetos</h1>
        <LinkButton to="/novoprojeto" text="Criar Projeto" />
      </div>
      {message && <Message type="success" msg={message} />}
      <Container customClass="start">
        {projetos.length > 0 &&
          projetos.map((projeto) =>
            <ProjetosCard
              key={projeto.id}
              id={projeto.id}
              name={projeto.name}
              budget={projeto.budget}
              category={projeto.category.name}
              handleRemove={() => console.log('Remover projeto')}
              
            />)}
      </Container>
    </div>
  );
}

export default Projetos