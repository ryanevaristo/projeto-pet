import styles from './Home.module.css'
import savings from '../../img/savings.svg'
import LinkButton from '../layout/LinkButton';

function Home() {
    return ( 
        <section className={styles.home_container}>
            <h1>Bem-vindo a <span>Vipet</span></h1>
            <p>Comece a gerenciar a seu Petshop agora mesmo!</p>
            <LinkButton to={'/Scheduler'} text={"Minha Agenda"}></LinkButton>
            <img src={savings} alt="Costs" />
        </section>
     );
}

export default Home;