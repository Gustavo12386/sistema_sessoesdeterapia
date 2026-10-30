import styles from './FormDados.module.scss'

function FormDados() {
  return(
    <form className={styles.consultform} > 
    <div className={styles.field}>
        <label>Nome Completo:</label>
        <input
          type="text"
          id="nome"
          name="nome"
          placeholder="Digite seu nome completo"          
          required
        />
      </div>

      <div className={styles.field}>
        <label>Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="Digite seu email"         
          required
        />
      </div>

      <div className={styles.field}>
        <label>Senha:</label>
        <input
          type="password"
          id="email"
          name="email"
          placeholder="Digite sua Senha"         
          required
        />
      </div>

      <div className={styles.field}>
        <label>Confirme sua Senha:</label>
        <input
          type="password"
          id="email"
          name="email"
          placeholder="Confirme sua Senha"         
          required
        />
      </div>

      <div className={styles.field}>
        <label>Data de nascimento:</label>
        <input
          type="date"
          id="nascimento"
          name="data_nascimento"
          required
        />
      </div>

      <div className={styles.field}>
        <label>Telefone (WhatsApp):</label>
        <input
          type="tel"
          id="telefone"
          name="telefone"
          placeholder="(00) 00000 - 0000"        
          required
        />
      </div>
     
      <div className={styles.field}>
        <label>Agende sua data:</label>
        <select id="data_consulta" name="data_consulta" required>
          <option value="" selected disabled>
            Selecione uma data disponível:
          </option>
        </select>
      </div>

      <div className={styles.field}>
        <label>Agende seu horário:</label>
        <select id="horario" name="horario" required disabled>
          <option value="" selected disabled>
            Selecione um horário disponível:
          </option>
        </select>
      </div>      

      <div className={styles['consult-actions']}>
        <button type="submit" className={styles['btn-next']}>
          Avançar
        </button>
      </div>

    </form>
  );  
   
}

export default FormDados