import { useState } from 'react';
import styles from './Login.module.scss';
import { Link, useNavigate } from 'react-router-dom';

interface LoginResponse {
  accessToken: string;
  tokenType: string;
  expiresIn: number;
}

function Login(){
  const navigate = useNavigate();
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setError("");
    setLoading(true);

    console.log("Dados enviados:", {
      email,
      password: password ? "Senha preenchida" : "Senha vazia"
    });

    try {
      const response = await fetch(
        "http://localhost:8080/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            email,
            password
          })
        }
      );

      if (!response.ok) {
        throw new Error(
          response.status === 401
            ? "E-mail ou senha incorretos."
            : "Não foi possível realizar o login."
        );
      }

      const data: LoginResponse = await response.json();

      console.log("Resposta do login:", data);

      if (!data.accessToken) {
        throw new Error("O backend não retornou o token JWT.");
      }

      // Armazena o JWT
      localStorage.setItem("token", data.accessToken);

      console.log(
        "Token armazenado:",
        localStorage.getItem("token") !== null
      );

      // Redireciona para o painel
      navigate("/painel", { replace: true });

    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Erro inesperado ao realizar login."
      );
    } finally {
      setLoading(false);
    }
  }

  return(
    <section className={styles.login}>

     <header className={styles.loginheader}>
       <h1>Fazer Login</h1>
     </header>

     <form className={styles.loginform} onSubmit={handleSubmit}>
       <div className={styles.field}>
        <label>Login:</label>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="Digite seu email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div> 
      <br></br>
      <div className={styles.field}>
        <label>Senha:</label>
        <input
          type="password"
          id="password"
          name="password"
          placeholder="Digite sua senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>    

      {error && (
          <p className={styles.error}>
            {error}
          </p>
        )}

      <Link className={styles.linkProfile} to={`/recoverypassword`}>
        Esqueceu sua senha?
      </Link>

      <br></br><br></br>
      <div className={styles.divlogin}>
        <button
          type="submit"
          className={styles["btn-login"]}
          disabled={loading}
        >
          {loading ? "Acessando..." : "Acessar"}
        </button>      
      </div>
     </form>


    </section>
  )
}

export default Login