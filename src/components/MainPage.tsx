import styles from './MainPage.module.scss'
import { Link } from 'react-router-dom'

function MainPage(){
  return(
    <section className={styles.panel}>
     <header className={styles['painel__header']}>
      <Link to={`index.html`} className={styles['btn-sair']}>
        Sair da página
      </Link>
     </header>  
      <div className={styles.title}>
        <h1>
         Olá Gustavo, seja bem-vindo ao
         <span>painel das sessões</span>
        </h1>
      </div>
    </section>
  )
}

export default MainPage