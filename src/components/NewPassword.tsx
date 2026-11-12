import { useNavigate, useSearchParams } from 'react-router-dom';
import styles from './NewPassword.module.scss';
import { useState } from 'react';

function NewPassword(){
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const patientId = searchParams.get("id");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage("");
  

    if (password.length < 8) {
      setMessage("A senha deve possuir pelo menos 8 caracteres.");
      return;
    }

    if (password !== confirmPassword) {
      setMessage("As senhas não correspondem.");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(
      "http://localhost:8080/auth/reset-password",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          patientId,
          newPassword: password
        })
      }
    );

      if (!response.ok) {
        throw new Error("Token inválido ou expirado.");
      }

      setMessage("Senha alterada com sucesso!");

      setTimeout(() => {
        navigate("/login", { replace: true });
      }, 1500);

    } catch (error) {
      setMessage(
        error instanceof Error
          ? error.message
          : "Erro ao redefinir a senha."
      );
    } finally {
      setLoading(false);
    }
  }


  return(
     <section className={styles.newpassword}>
    
         <header className={styles.newpasswordheader}>
           <h1>Crie uma nova senha</h1>           
         </header>
    
         <form className={styles.newpasswordform} onSubmit={handleSubmit}>
           <div className={styles.field}>            
            <input
              type="password"
              id="senha"
              name="password"
              placeholder="Digite sua nova senha" 
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required            
            />
          </div> 
          <br></br>
          <div className={styles.field}>            
            <input
              type="password"
              id="confirmar-senha"
              name="confirmPassword"
              placeholder="Confirme a senha" 
              value={confirmPassword}
              onChange={(event) => setConfirmPassword(event.target.value)}
              required            
            />
          </div> 
          
          <br></br><br></br>
          <div className={styles.divnewpassword}>
            <button type="submit" className={styles['btn-newpassword']}>
               {loading ? "Alterando..." : "Recuperar senha"}
            </button>        
          </div>

        {message && <p role="status">{message}</p>}
         </form>
    
    
        </section>
  )
}

export default NewPassword