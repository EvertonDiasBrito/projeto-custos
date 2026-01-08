function NovoProjeto() {
    return (
        <h1>Novo Projeto</h1>
    )
}
export default NovoProjeto
import styles from './NovoProjeto.module.css'

function NovoProjeto() {
    return (
        <div className={styles.novoprojeto_container}>
            <h1>Criar Projeto</h1>
            <p>Crie seu projeto para depois adicionar os serviços</p>
            <p>Formulário</p>
        </div>
    )
}
export default NovoProjeto