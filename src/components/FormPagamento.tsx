import styles from './FormPagamento.module.scss';

function FormPagamento(){
   return(
    <section className={styles.payment}>

     <header className={styles.paymentheader}>
       <h1>Realize seu Pagamento</h1>
     </header>

     <form className={styles.paymentform} action="#" method="POST">
       <div className={styles.field}>
        <label>Cupom de Desconto</label>
        <input
          type="text"
          id="cupom"
          name="cupom"
          placeholder="Tem um cupom de desconto? Digite aqui"          
        />
      </div>

    
      <fieldset className={styles.paymentoptionfield}>
        <legend>Selecione uma forma de pagamento?</legend>

        <div className={styles.paymentoptions}>

          <label className={styles.paymentmethod}>
            <input
              type="radio"
              id="cartao"
              name="forma_pagamento"
              value="cartao_credito"
              checked
              required
            />

            <svg className={styles['payment-method-iconcard']}
                 xmlns="http://www.w3.org/2000/svg"
                 width="18" height="14"
                 viewBox="0 0 24 18"
                 fill="none"
                 stroke="currentColor"
                 stroke-width="1.5">
              <rect x="1" y="1" width="22" height="16" rx="2"/>
              <path d="M1 6h22"/>
              <path d="M5 12h5"/>
            </svg>

            <span>Cartão de Crédito</span>
          </label>

          <label className={styles.paymentmethod}>
            <input
              type="radio"
              id="pix"
              name="forma_pagamento"
              value="pix"
              required
            />

            <svg className={styles['payment-method-iconpix']}
                 xmlns="http://www.w3.org/2000/svg"
                 width="16" height="16"
                 viewBox="0 0 24 24"
                 fill="currentColor">
              <path d="M8.2 2.5a3.2 3.2 0 0 1 4.5 0l1.7 1.7-2.1 2.1a2.1 2.1 0 0 1-3 0L7.2 4.2z"/>
              <path d="m15.8 2.5 1.7 1.7-2.1 2.1a2.1 2.1 0 0 1-3 0l-2.1-2.1 1.7-1.7a3.2 3.2 0 0 1 4.5 0z" opacity=".8"/>
              <path d="m4.2 7.2 2.1-2.1 2.1 2.1a2.1 2.1 0 0 1 0 3l-2.1 2.1-2.1-2.1a2.1 2.1 0 0 1 0-3z"/>
              <path d="m19.8 7.2-2.1-2.1-2.1 2.1a2.1 2.1 0 0 0 0 3l2.1 2.1 2.1-2.1a2.1 2.1 0 0 0 0-3z"/>
              <path d="m8.2 13.5 2.1-2.1a2.1 2.1 0 0 1 3 0l2.1 2.1-2.1 2.1a2.1 2.1 0 0 1-3 0z"/>
              <path d="m7.2 14.5 2.1-2.1a2.1 2.1 0 0 1 3 0l2.1 2.1-1.7 1.7a3.2 3.2 0 0 1-4.5 0z" opacity=".8"/>
            </svg>

            <span>PIX:</span>
          </label>

        </div>
      </fieldset>

    
      <div className={styles['card-information']} id="dadosCartao">

        <div className={styles.field}>
          <label>Número do Cartão:</label>
          <input
            type="text"
            id="numero_cartao"
            name="numero_cartao"
            placeholder="0000 0000 0000 0000"           
          />
        </div>

        <div className={styles['information-card-line']}>

          <div className={styles.field}>
            <label>Validade:</label>
            <input
              type="text"
              id="validade"
              name="validade"
              placeholder="MM/AA"     
              className={styles.validated}         
            />
          </div>

          <div className={styles.field}>
            <label className={styles.labelcvv}>CVV:</label>
            <input
              type="password"
              id="cvv"
              name="cvv"
              placeholder="3 ou 4 dígitos" 
              className={styles.cvv}
            />
          </div>

        </div>

       <div className={styles.field}>
          <label>Nome do Titular:</label>
          <input
            type="text"
            id="titular"
            name="titular"
            placeholder="Digite o nome impresso no cartão"   
                  
          />
        </div>

        <div className={styles.field}>
          <label>Selecione o número de parcelas:</label>
          <select id="parcelas" name="parcelas">
            <option value="1">1 parcela de 141,41 BRL</option>
            <option value="2">2 parcelas de 70,71 BRL</option>
            <option value="3">3 parcelas de 47,14 BRL</option>
          </select>
        </div>
        

      </div>    

     
      <div className={styles.actionspayment}>
        <button type="submit" className={styles['btn-payment']}>
          Comprar Agora
        </button>
        
        <button
          type="button"
          className={styles['btn-dificulty']}
          id="btn-dificulty"
        >
          Estou com dificuldades para realizar o pagamento
        </button>
      </div>
     </form>


    </section>
   );
}

export default FormPagamento