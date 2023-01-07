import {Link} from 'react-router-dom'
import Container from './Container'
import styles from './NavBar.module.css'
import logo from '../../img/logo.png'

function NavBar() {
    return ( 
        <nav className={styles.navbar}>
            <Container >
                <Link to={"/"}>
                    <img src={logo} alt="" />
                </Link>
                <ul className={styles.list}>
                <li className={styles.item}><Link to="/">Home</Link></li>
                <li className={styles.item}><Link to="/contact">Contato</Link></li>
                <li className={styles.item}><Link to={"/company"}>Empresa</Link></li>
                <li className={styles.item}><Link to={"/projects"}>Meus Clientes</Link></li>
                <li className={styles.item}><Link to={"/newclient"}>Novo Cliente</Link></li>
                <li className={styles.item}><Link to={"/newpet"}>Novo Pet</Link></li>

                </ul>
            </Container>
            
        </nav>
     );
}

export default NavBar;