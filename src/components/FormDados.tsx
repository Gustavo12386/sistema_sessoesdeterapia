import styles from './FormDados.module.scss'
import { useState, type ChangeEvent } from "react";
import especialidades from "../services/especialidades.json";

const API_URL = "http://localhost:8080";

function FormDados() {
  const [especialityId, setEspecialityId] = useState("");
  const [especialityName, setEspecialityName] = useState("");
  const [dates, setDates] = useState([]);
  
  const [dateBirth, setDateBirth] = useState("");
  const [ageError, setAgeError] = useState("");

  const [selectedDates, setSelectedDates] = useState([]);
  const [hoursByDate, setHoursByDate] = useState({});

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [text, setText] = useState('');
  const limit = 15;

  const TelMask = (e: ChangeEvent<HTMLInputElement>) => {
      setText(e.target.value);     
  };

  const handleEspecialityChange = async (especialityId: string, name: string) => {
   setEspecialityId(especialityId);
  setEspecialityName(name);

  setSelectedDates([]);
  setHoursByDate({});
  setDates([]);
  setError("");

  try {
    console.log("Especialidade selecionada:", especialityId);
    const response = await fetch(
      `${API_URL}/especialities/${especialityId}/dates`
    );

    console.log("Status da requisição:", response.status);

    if (!response.ok) {
      throw new Error("Erro ao consultar datas.");
    }

    const data = await response.json();
    console.log("Datas recebidas:", data);
    setDates(data);

  } catch (error) {
    setError(
      error instanceof Error ? error.message : "Erro ao consultar datas."
    );
  }
};
const handleDateCheck = async (date, checked) => {
   if (checked) {
    try {
      const response = await fetch(
        `${API_URL}/especialities/${especialityId}/dates/${date.dateId}/hours`
      );

      if (!response.ok) {
        throw new Error("Erro ao buscar horários.");
      }

      const data = await response.json();

      setHoursByDate(prev => ({
        ...prev,
        [date.dateId]: data
      }));

      setSelectedDates(prev => [
        ...prev,
        {
          dateId: date.dateId,
          dateValue: date.currentDate,
          hourId: ""
        }
      ]);

    } catch (error) {
      setError(
        error instanceof Error ? error.message : "Erro ao buscar horários."
      );
    }

  } else {
    setSelectedDates(prev =>
      prev.filter(item => item.dateId !== date.dateId)
    );

    setHoursByDate(prev => {
      const updated = { ...prev };
      delete updated[date.dateId];
      return updated;
    });
  }
};

const handleHourChange = (dateId, hourId) => {
  setSelectedDates(prev =>
    prev.map(item =>
      item.dateId === dateId
        ? { ...item, hourId }
        : item
    )
  );
};

function calculateAge(birthDate: string): number {
  const today = new Date();
  const birth = new Date(`${birthDate}T00:00:00`);

  let age = today.getFullYear() - birth.getFullYear();

  const monthDifference = today.getMonth() - birth.getMonth();

  if (
    monthDifference < 0 ||
    (monthDifference === 0 && today.getDate() < birth.getDate())
  ) {
    age--;
  }

  return age;
}

const handleSubmit = async (e) => {
 e.preventDefault();
 

  if (!especialityId || selectedDates.length === 0) {
    setError("Selecione a especialidade e pelo menos uma data.");
    return;
  }

  // Verifica se todos os horários foram selecionados
  const incomplete = selectedDates.some(
    item => !item.hourId
  );

  if (incomplete) {
    setError("Selecione um horário para cada data escolhida.");
    return;
  }

  const formData = new FormData(e.currentTarget);

   const password = formData.get("password") as string;
  const confirmPassword = formData.get("confirmPassword") as string;

  if (password !== confirmPassword) {
    setError("As senhas não coincidem.");
    return;
  }

  setError("");
  
  const payload = {
     especialityId,
     especiality_name: especialityName,

     name: formData.get("name"),
     phone: formData.get("phone"),
     email: formData.get("email"),
     password: formData.get("password"),
     date_birth: formData.get("date_birth"),

     appointments: selectedDates.map(item => ({
        dateId: item.dateId,
        hourId: item.hourId
     }))
  };

  try {
    setLoading(true);
    console.log("Dados enviados:", payload);
    const response = await fetch(
      `${API_URL}/patient/registersessions`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify(payload)
      }
    );

    const result = await response.json();

    if (!response.ok) {
      throw new Error(
        result.message || "Não foi possível realizar o cadastro."
      );
    }

    alert("Sessões cadastradas com sucesso!");

    console.log("Cadastro realizado:", result);

  } catch (error) {
    setError(
      error instanceof Error ? error.message : "Erro no cadastro."
    );

    console.error("Erro no cadastro:", error);

  } finally {
    setLoading(false);
  }
};
  return(
    <>
    <main className={styles.consult}>
       <header className={styles.consultheader}>
        <h1 className={styles.title}>Faça seu cadastro e pagamento para dar início</h1> 
        <span className={styles.spantitle}> a realização das sessões da Terapia</span>     
       </header>       
          <fieldset className={styles.especialities}>
             <legend className={styles['sr-only']}>Selecione a especialidade</legend>
          {especialidades.map((especialidade) => (   
           <label
            className={styles.especiality}
            key={especialidade.especializationId}
          >

            <input
              type="radio"
              name="especiality"
              value={especialidade.especializationId}
              checked={
                especialityId === especialidade.especializationId
              }
              onChange={() =>
                handleEspecialityChange(
                  especialidade.especializationId,
                  especialidade.especializationName
                )
              }
              required
            />

            <span className={styles["especiality__info"]}>

              <span className={styles["especialidade__nome"]}>
                {especialidade.especializationName}
              </span>
              <span className={styles['especialidade__valor']}>
                {especialidade.especializationValue.toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                })}
              </span>
            </span>

          </label>
         ))}
        </fieldset>
     </main>
    <form className={styles.consultform} onSubmit={handleSubmit}>
    <input
      type="hidden"
      name="especialityId"
      value={especialityId}
    />

    <input
      type="hidden"
      name="especiality_name"
      value={especialityName}
    /> 
    <div className={styles.field}>
        <label>Nome Completo:</label>
        <input
          type="text"
          id="name"
          name="name"
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
          id="password"
          name="password"
          placeholder="Digite sua Senha"         
          required
        />
      </div>

      <div className={styles.field}>
        <label>Confirme sua Senha:</label>
        <input
          type="password"
          id="confirmPassword"
          name="confirmPassword"
          placeholder="Confirme sua Senha"         
          required
          onChange={(e) => {
          const password = e.currentTarget.form?.querySelector<HTMLInputElement>(
            "#password"
          )
            if (password) {
            e.currentTarget.setCustomValidity(
              e.currentTarget.value !== password.value
                ? "As senhas não coincidem."
                : ""
            );
          }
        }}
        />
      </div>

      <div className={styles.field}>
        <label>Data de nascimento:</label>
        <input
          type="date"
          id="date_birth"
          name="date_birth"
          required
          onChange={(event) => {
          const value = event.target.value;

          setDateBirth(value);

          if (!value) {
            setAgeError("");
            return;
          }

          const age = calculateAge(value);

          if (age < 16) {
            setAgeError("O cadastro não é permitido para menores de 16 anos.");
          } else if (age > 80) {
            setAgeError("O cadastro não é permitido para pessoas acima de 80 anos.");
          } else {
            setAgeError("");
          }
        }}
        />
      </div>
        {ageError && (
            <span className={styles.error}>
              {ageError}
            </span>
          )}
      <div className={styles.field}>
        <label>Telefone (WhatsApp):</label>
        <input
          type="tel"
          id="phone"
          name="phone"
          placeholder="(00) 00000 - 0000"          
          onChange={TelMask} maxLength={limit}  
          value={text}     
          required 
        />
      </div>    
      <br/>
       <div className={styles['consult-actions']}>
        <button type="submit" className={styles['btn-next']} disabled={!!ageError || !dateBirth || loading}>
           Avançar
        </button>
      </div>   
     <h1 className={styles.titleform2}>Selecione as datas e horários disponíveis</h1>     
     <br/>
        <div className={styles.field}>
        <label>Agende suas datas:</label>
            {dates.map(date => (
      <div className={styles.fieldcheckbox} key={date.dateId}>
        <input
          type="checkbox"
          id={date.dateId}
          checked={selectedDates.some(
            item => item.dateId === date.dateId
          )}
          onChange={e =>
            handleDateCheck(date, e.target.checked)
          }
       
        />

        <label htmlFor={date.dateId}>
          {date.currentDate}
        </label>
      </div>
    ))}      
      </div>
     <br/>
      <div className={styles.field}>
        <label>Agende seu horário:</label>        
          {selectedDates.map(selectedDate => (
      <div key={selectedDate.dateId}>

        <label>
          Data: {selectedDate.dateValue}
        </label>

        <select
          value={selectedDate.hourId}
          onChange={e =>
            handleHourChange(
              selectedDate.dateId,
              e.target.value
            )
          }
          className={styles.selecthour}
          
        >
          <option value="">
            Selecione um horário
          </option>

          {(hoursByDate[selectedDate.dateId] || []).map(hour => (
            <option
              key={hour.hourId}
              value={hour.hourId}
            >
              {hour.currentHour}
            </option>
          ))}
        </select>
        
      </div>
    ))} 
      </div>      
         {error && (
        <p role="alert" className={styles.error}>
          {error}
        </p>
      )}
       <br/>
       <div className={styles['consult-actions']}>
        <button type="submit" className={styles['btn-next']} disabled={!!ageError || !dateBirth || loading}>
           {loading ? "Enviando..." : "Avançar"}
        </button>
      </div>

       </form>  
    </>
  );  
   
}

export default FormDados