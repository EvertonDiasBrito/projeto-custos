import { Link } from "react-router-dom";
import Container from "./Container";
import logo from '../../assets/costs_logo.png';
import styles from './NavBar.module.css';


function NavBar() {
    return (
        <nav className={styles.navbar}>
            <Container>
                <Link to="/"><img src={logo} alt="Costs" /></Link>
                <ul className={styles.list}>
                    <li className={styles.item}><Link to="/">Home</Link></li>
                    <li className={styles.item}><Link to="/projects">Projetos</Link></li>
                    <li className={styles.item}><Link to="/sobre">Sobre</Link></li>
                    <li className={styles.item}><Link to="/contato">Contato</Link></li>                    
                </ul>               
            </Container>
        </nav>
    );
}

export default NavBar;
