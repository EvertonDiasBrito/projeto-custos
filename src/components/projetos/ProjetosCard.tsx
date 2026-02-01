
import { Link } from 'react-router-dom';
import styles from './ProjetosCard.module.css'
import { BsFillTabletFill, BsPencil } from 'react-icons/bs';
import type React from 'react';



interface ProjetosCardProps {
  id: number | string;
  name: string;
  budget: number;
  category: string;
  handleRemove: (id: number | string) => void;
}

function ProjetosCard({id, name, budget, category, handleRemove }: ProjetosCardProps) {

  const remove = (e: React.MouseEvent) => {
    e.preventDefault();
    handleRemove(id);
  }

  return (
    <div className={styles.project_card}>
      <h4>{name}</h4>
      <p>
        <span>Orçamento:</span> R${budget}
      </p>
      <p className={styles.category_text}>
        <span className={styles[`category_text_${category.toLocaleLowerCase()}`]}></span>
        {category}
      </p>
      <div className={styles.project_card_actions}>
        <Link to={`/projetos/${id}`}>
            <h1><BsPencil /> Editar </h1>
        </Link>
        <button onClick={remove}>
            <BsFillTabletFill /> Excluir
        </button>
       
      </div>
    </div>
  )
}

export default ProjetosCard