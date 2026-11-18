import styles from '../FormPagamento.module.scss'
import { useState} from "react";

interface NavigationProps{
  updateTopic: (id: number) => void; 
}

function FormadePagamento({updateTopic}: NavigationProps){

  const [selected, setSelected] = useState(0);

  const handleChange = (id: number) => {
    setSelected(id);
    updateTopic(id);
  };

    return(
       <div className={styles.paymentoptions}>

          <label className={styles.paymentmethod}>
            <input
              type="radio"
              id="cartao"
              name="forma_pagamento"
              value="cartao_credito"              
              checked={selected === 0}
              onChange={() => handleChange(0)}
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
              checked={selected === 1}
              onChange={() => handleChange(1)}
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
    );
}

export default FormadePagamento