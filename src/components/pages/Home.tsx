import styles from './Home.module.css'
import savings from '../../assets/savings.svg'

function Home() {
    return (
        <section className={styles.home_container}>
            <h1>Bem-vindo ao <span>Costs</span></h1>
            <p>Come a gerenciar seus projetos!</p>
            <a href="/">Criar Projeto</a>
            <img src={savings} alt="Costs" />
        </section>
    )
}
export default Home