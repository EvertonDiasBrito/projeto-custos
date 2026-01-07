import { FaFacebook, FaInstagram, FaLinkedin } from 'react-icons/fa';
import styles from './Footer.module.css';

function Footer() {
  return (
    <footer className={styles.footer}>
      <ul className={styles.social_list}>
        <li><a href="https://facebook.com" target="_blank"><FaFacebook /></a></li>
        <li><a href="https://instagram.com" target="_blank"><FaInstagram /></a></li>
        <li><a href="https://linkedin.com" target="_blank"><FaLinkedin /></a></li>
      </ul>
      <p className={styles.copy_right}><span>Costs</span>&copy; 2026</p>
    </footer>
  );
}
export default Footer;