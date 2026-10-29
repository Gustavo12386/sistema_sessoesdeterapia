import styles from './Header.module.scss';

function Header() {
 
  return (
    <>
     <main className={styles.consult}>
       <header className={styles.consultheader}>
        <h1 className={styles.title}>Faça seu cadastro e pagamento para dar início</h1> 
        <span className={styles.spantitle}> a realização das sessões da Terapia</span>     
       </header>       
     </main>
    </>
  )
}

export default Header