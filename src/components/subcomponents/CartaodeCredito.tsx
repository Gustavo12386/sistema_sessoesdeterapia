import styles from '../FormPagamento.module.scss'

function CartaodeCredito(){
    return(
      <div className={styles['card-information']}>       
         <p className={styles.textinformation}>
          Você será direcionado ao ambiente seguro do Mercado Pago
          para informar os dados do seu cartão de crédito.
        </p>
      </div>    
    )
}

export default CartaodeCredito