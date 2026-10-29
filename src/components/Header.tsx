import styles from './Header.module.scss';

function Header() {
 
  return (
    <>
     <main className={styles.consult}>
       <header className={styles.consultheader}>
        <h1>Faça seu cadastro e pagamento para dar início a realização das sessões da Terapia</h1>      
       </header>       
     </main>
    </>
  )
}

export default Header