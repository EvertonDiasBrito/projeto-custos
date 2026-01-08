import styles from './LinkButton.module.css';
import {Link} from "react-router-dom"

interface Props {
  to: string;
  text: string;
}

function LinkButton({ to, text }: Props){
    return (
        <Link className={styles.btn} to={to}>
            {text}        
        </Link>
    );
}

export default LinkButton;