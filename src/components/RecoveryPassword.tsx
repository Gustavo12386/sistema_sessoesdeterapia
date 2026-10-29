import styles from './RecoveryPassword.module.scss'

function RecoveryPassword(){
  return(
     <section className={styles.recovery}>
    
         <header className={styles.recoveryheader}>
           <h1>Recuperação de senha</h1>
           <h3>Digite seu email para receber um link de acesso de recuperação de senha</h3>
         </header>
    
         <form className={styles.recoveryform} action="#" method="POST">
           <div className={styles.field}>
            <label>Login:</label>
            <input
              type="text"
              id="login"
              name="login"
              placeholder="Digite seu email"          
            />
          </div> 
          
          <br></br><br></br>
          <div className={styles.divrecovery}>
            <button type="submit" className={styles['btn-recovery']}>
              Solicitar Recuperação
            </button>        
          </div>
         </form>
    
    
        </section>
  )
}

export default RecoveryPassword