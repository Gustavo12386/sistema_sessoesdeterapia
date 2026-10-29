import styles from './RecoveryPassword.module.scss'

function RecoveryPassword(){
  return(
     <section className={styles.recovery}>
    
         <header className={styles.recoveryheader}>
           <h1>Crie uma nova senha</h1>           
         </header>
    
         <form className={styles.recoveryform} action="#" method="POST">
           <div className={styles.field}>            
            <input
              type="password"
              id="senha"
              name="senha"
              placeholder="Digite sua nova senha"          
            />
          </div> 
          <br></br>
          <div className={styles.field}>            
            <input
              type="password"
              id="senha"
              name="senha"
              placeholder="Confirme a senha"          
            />
          </div> 
          
          <br></br><br></br>
          <div className={styles.divrecovery}>
            <button type="submit" className={styles['btn-recovery']}>
              Recuperar Senha
            </button>        
          </div>
         </form>
    
    
        </section>
  )
}

export default RecoveryPassword