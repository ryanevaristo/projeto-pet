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
                <li className={styles.item}><Link to={"/clients"}>Meus Clientes</Link></li>
                <li className={styles.item}><Link to={"/clients/new"}>Novo Cliente</Link></li>
                <li className={styles.item}><Link to={"/petservices"}> Meus Serviços</Link></li>
                <li className={styles.item}><Link to={"/funcionarios"}> Meus Funcionarios</Link></li>
                </ul>
            </Container>
            
        </nav>
     );
}

export default NavBar;