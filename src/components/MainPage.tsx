import styles from './MainPage.module.scss'
import { Link } from 'react-router-dom'

function MainPage(){
  return(
    <section className={styles.panel}>
     <header className={styles['panel__header']}>
      <Link to={`index.html`} className={styles['btn-quit']}>
        Sair da página
      </Link>
     </header>  
      <div className={styles.title}>
        <h1>
         Olá Gustavo, seja bem-vindo ao
         <span>painel das sessões</span>
        </h1>
      </div>

       <div className={styles.sections}>

      <h2>Sessões a Realizar</h2>

      <div className={styles['section__table-container']}>
        <table className={styles['sections__table']}>
          <thead>
            <tr>
              <th>Dia da sessão</th>
              <th>Inicie sua Sessão</th>
              <th>Você finalizou a sessão?</th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td className={styles['section-date']}>
                <span>Data: 29/10/2026</span>
                <span>Horário: 08:00</span>
              </td>

              <td className={styles['section-action']}>
                <button
                  type="button"
                  className={styles['btn-section-start']}                  
                >
                  Iniciar Sessão
                </button>
              </td>

              <td className={styles['section-action']}>
                <button
                  type="button"
                  className={styles['btn-section-start']} 
                  
                >
                  Finalizei!
                </button>
              </td>
            </tr>

            <tr>
              <td className={styles['section-date']}>
                <span>Data: 06/11/2026</span>
                <span>Horário: 15:00</span>
              </td>

              <td className={styles['section-action']}>
                <button
                  type="button"
                  className={styles['btn-section-finish']}
                  
                >
                  Iniciar Sessão
                </button>
              </td>

              <td className={styles['section-action']}>
                <button
                  type="button"
                  className={styles['btn-section-finish']} 
                  
                >
                  Finalizei!
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

    </div>
    </section>
  )
}

export default MainPage