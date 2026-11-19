import styles from './FormPagamento.module.scss';
import { useState, useEffect} from "react";

const API_URL = "http://localhost:8080";

interface FormPagamentoProps {
  informationId: string;  
}

interface CouponResponse {
  couponId: string;
  couponCode: string;
  discountPercentage: number;
  validUntil: string;
}

function FormPagamento({
  informationId,  
}: FormPagamentoProps){
  
  const [error, setError] = useState("");
  const [couponCode, setCouponCode] = useState("");

  const [appliedCoupon, setAppliedCoupon] =
    useState<CouponResponse | null>(null);

  const [couponError, setCouponError] = useState("");
  const [couponSuccess, setCouponSuccess] = useState("");

  const [validatingCoupon, setValidatingCoupon] = useState(false);
  const [loading, setLoading] = useState(false);
  const [patientname, setPatientName] = useState("");

  // Valor da consulta retornado pelo Java
  const [consultationAmount, setConsultationAmount] =
    useState<number | null>(null);

  const [priceError, setPriceError] = useState("");


  // Buscar valor da consulta no backend
  useEffect(() => {
    const fetchConsultationAmount = async () => {
      try {
        setPriceError("");

        const response = await fetch(
          `${API_URL}/payments/consultation-amount`
        );

        if (!response.ok) {
          throw new Error(
            "Não foi possível consultar o valor da consulta."
          );
        }

        const result: unknown = await response.json();

        const amount = Number(result);

        if (!Number.isFinite(amount) || amount <= 0) {
          throw new Error("O valor retornado pela API é inválido.");
        }

        setConsultationAmount(amount);

      } catch (error) {
        setPriceError(
          error instanceof Error
            ? error.message
            : "Erro ao consultar o valor da consulta."
        );
      }
    };

    const fetchPatientName = async () => {
    try {
      const response = await fetch(
        `${API_URL}/patient/first-consultation/${informationId}/name`
      );

      if (!response.ok) {
        throw new Error("Não foi possível carregar o nome do paciente.");
      }

      const result = await response.text();

      setPatientName(result);

    } catch (error) {
      console.error(error);
    }
  };

  if (informationId) {
    fetchPatientName();
  }

    fetchConsultationAmount();
  }, [informationId]);



  // Cálculo do desconto
  const discountPercentage =
    appliedCoupon?.discountPercentage ?? 0;

  const discountAmount =
    (consultationAmount ?? 0) *
    (discountPercentage / 100);

  const finalAmount =
    (consultationAmount ?? 0) - discountAmount;


  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value);
  };

  // Validação do cupom
  const handleApplyCoupon = async () => {
     setCouponError("");
    setCouponSuccess("");
    setAppliedCoupon(null);

    const code = couponCode.trim().toUpperCase();

    if (!code) {
      setCouponError("Digite um código de cupom.");
      return;
    }

    try {
      setValidatingCoupon(true);

      const response = await fetch(
        `${API_URL}/coupons/validate/${encodeURIComponent(code)}`
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(
          "Cupom inválido ou expirado."
        );
      }

      setAppliedCoupon(result);

      setCouponSuccess(
        `Cupom ${result.couponCode} aplicado! Desconto de ${result.discountPercentage}%.`
      );

    } catch (error) {

      setCouponError(
        "Não foi possível validar o cupom."
      );

    } finally {
      setValidatingCoupon(false);
    }
  };

  
   // Envio para o Checkout Pro
  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {

     e.preventDefault();

    setError("");

    if (consultationAmount === null) {
      setError("Aguarde o carregamento do valor da consulta.");
      return;
    }

    setLoading(true);

    try {

      const response = await fetch(
        `${API_URL}/payments/checkout`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            informationId,
            couponCode: appliedCoupon?.couponCode ?? null,
            paymentMethod: "both",
          }),
        }
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(
          result.message || "Não foi possível realizar o pagamento."
        );
      }

      if (!result.checkoutUrl) {
        throw new Error(
          "O endereço do checkout não foi retornado."
        );
      }

      window.location.href = result.checkoutUrl;

    } catch (error) {

      setError(
        error instanceof Error
          ? error.message
          : "Erro inesperado ao processar pagamento."
      );

    } finally {
      setLoading(false);
    }
  };

   return(
    <section className={styles.payment}>

     <header className={styles.paymentheader}>
       <h1 className={styles.titlepage}>Realize seu Pagamento</h1>
     </header>

     <form className={styles.paymentform} onSubmit={handleSubmit}>
       <div className={styles.fieldpatient}>
          <label className={styles.labelname}>Paciente:</label><span className={styles.patientname}>{patientname || "Carregando nome..."}</span>        
            <input
              type="hidden"
              name="patientName"
              value={patientname}
            />
        </div>
        <div className={styles.field}>

          <label htmlFor="cupom">
            Cupom de Desconto
          </label>
            <input
              type="text"
              id="cupom"
              name="cupom"
              placeholder="Tem um cupom de desconto?"
              value={couponCode}
              className={styles.inputcoupon}
              onChange={(e) => {
                setCouponCode(e.target.value.toUpperCase());
                setAppliedCoupon(null);
                setCouponError("");
                setCouponSuccess("");
              }}
            />

            <button
              type="button"
              onClick={handleApplyCoupon}
              disabled={validatingCoupon || !couponCode.trim()}
              className={styles['btn-coupon']}
            >
              {validatingCoupon ? "Validando..." : "Aplicar cupom"}
            </button>

          <div className={styles.couponcontainer}>           
            

          </div>

          {couponError && (
            <p className={styles.error} role="alert">
              {couponError}
            </p>
          )}

          {couponSuccess && (
            <p className={styles.success}>
              {couponSuccess}
            </p>
          )}

        </div>

        <div className={styles.paymentSummary}>

          <h3>Resumo do pagamento</h3>
        {consultationAmount === null ? (
            <p>Carregando valor da consulta...</p>
          ) : (
          <p>
            Valor da consulta:
            <strong>{formatCurrency(consultationAmount)}</strong>
          </p>
          )}
          {appliedCoupon && (
            <>
              <p>
                Desconto ({discountPercentage}%):
                <strong>
                  - {formatCurrency(discountAmount)}
                </strong>
              </p>
            </>
          )}

          <p>
            Valor total:
            <strong>{formatCurrency(finalAmount)}</strong>
          </p>

        </div>    
      <fieldset className={styles.paymentoptionfield}>
           <div className={styles['card-information']}>       
            <p className={styles.textinformation}>
              Você será direcionado ao ambiente seguro do Mercado Pago
              para concluir a compra.
            </p>
          </div>     
      </fieldset>     
      <br></br>

      {error && (
        <p role="alert" className={styles.error}>
          {error}
        </p>
      )}

      <div className={styles.actionspayment}>
          <button
            type="submit"
            className={styles['btn-payment']}
            disabled={
            loading ||
            consultationAmount === null ||
            !!priceError
          }
          >
            {loading
              ? 'Gerando pagamento...'
              : 'Finalizar Agora'}
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