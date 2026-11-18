import styles from '../FormPagamento.module.scss';

function PIX(){
    return(
       <div className={styles['card-information']}>
          <p className={styles.textinformation}>
            Ao continuar, você será direcionado ao Mercado Pago,
            onde poderá gerar o QR Code e realizar o pagamento via Pix.
          </p>
    </div>
    )
}

export default PIX