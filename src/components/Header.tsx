import styles from './Header.module.scss';

function Header() {
 
  return (
    <>
     <main className={styles.consult}>
       <header className={styles.consultheader}>
        <h1 className={styles.title}>Faça seu cadastro e pagamento para dar início</h1> 
        <span className={styles.spantitle}> a realização das sessões da Terapia</span>     
       </header>       
          <fieldset className={styles.especialities}>
             <legend className={styles['sr-only']}>Selecione a especialidade</legend>
              <label className={styles.especiality}>
          <input
            type="radio"
            id="neuropsicologo"
            name="especialidade"
            value="neuropsicologo"
            data-valor="141.41"
            checked
            required
          />

          <span className={styles['especiality__info']}>
            <span className={styles['especialidade__nome']}>
              Neuropsicologia
            </span>
            <span className={styles['especialidade__valor']}>
              Valor: 141,41 BRL
            </span>
          </span>
        </label>

        <label className={styles.especiality}>
          <input
            type="radio"
            id="psicologo"
            name="especialidade"
            value="psicologo_clinico"
            data-valor="150.65"
            required
          />

          <span className={styles['especiality__info']}>
            <span className={styles['especialidade__nome']}>
              Psicologia
            </span>
            <span className={styles['especialidade__valor']}>
              Valor: 150,65 BRL
            </span>
          </span>
        </label>

        <label className={styles.especiality}>
          <input
            type="radio"
            id="psicologo"
            name="especialidade"
            value="psicologo_clinico"
            data-valor="150.65"
            required
          />

          <span className={styles['especiality__info']}>
            <span className={styles['especialidade__nome']}>
              Nutrição
            </span>
            <span className={styles['especialidade__valor']}>
              Valor: 150,65 BRL
            </span>
          </span>
        </label>
        </fieldset>
     </main>
    </>
  )
}

export default Header