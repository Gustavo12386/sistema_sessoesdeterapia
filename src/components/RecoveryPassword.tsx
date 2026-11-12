import { useState } from 'react';
import styles from './RecoveryPassword.module.scss'
import { useNavigate } from 'react-router-dom';

function RecoveryPassword(){
  const navigate = useNavigate();
   const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  
  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
  event.preventDefault();
 
  try {
    setLoading(true);
    const response = await fetch(
      "http://localhost:8080/auth/forgot-password",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email })
      }
    );

    if (!response.ok) {
      throw new Error("E-mail não encontrado.");
    }

    const data = await response.json();

    navigate(`/newpassword?id=${data.patientId}`);

  } catch (error) {
    console.error(error);
    setMessage("Não foi possível iniciar a recuperação.");
  } finally {
      setLoading(false);
    }
}

  return(
     <section className={styles.recovery}>
    
         <header className={styles.recoveryheader}>
           <h1>Recuperação de senha</h1>
           <h3>Digite seu email para dar inicio a criação de uma nova senha</h3>
         </header>
    
         <form className={styles.recoveryform} onSubmit={handleSubmit}>
           <div className={styles.field}>
            <label>Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Digite seu email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div> 
          
          <br></br><br></br>
          <div className={styles.divrecovery}>
             <button
                type="submit"
                className={styles["btn-recovery"]}
                disabled={loading}
              >
                {loading ? "Prosseguindo..." : "Prosseguir"}
              </button>       
          </div>
          {message && <p role="status">{message}</p>}
         </form>
    
    
        </section>
  )
}

export default RecoveryPassword