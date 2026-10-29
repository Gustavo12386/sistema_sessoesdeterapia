import styles from './Login.module.scss';
import { Link } from 'react-router-dom';

function Login(){
  return(
    <section className={styles.login}>

     <header className={styles.loginheader}>
       <h1>Fazer Login</h1>
     </header>

     <form className={styles.loginform} action="#" method="POST">
       <div className={styles.field}>
        <label>Login:</label>
        <input
          type="text"
          id="login"
          name="login"
          placeholder="Digite seu nome de usuário ou email"          
        />
      </div> 
      <br></br>
      <div className={styles.field}>
        <label>Senha:</label>
        <input
          type="password"
          id="senha"
          name="senha"
          placeholder="Digite sua senha"          
        />
      </div>    

      <Link className={styles.linkProfile} to={`/recoverypassword`}>
        Esqueceu sua senha?
      </Link>

      <br></br><br></br>
      <div className={styles.divlogin}>
        <button type="submit" className={styles['btn-login']}>
          Acessar
        </button>        
      </div>
     </form>


    </section>
  )
}

export default Login