import { useState, useEffect } from 'react';
import styles from './MainPage.module.scss'
import { useNavigate } from 'react-router-dom'

interface Patient {
  id: string;
  name: string;
  email: string;
  phone: string;
  date_birth: string;
  especiality_name: string;
}

interface Appointment {
  appointmentId: string;
  date: string;
  hour: string;
}

function MainPage(){
  const [patient, setPatient] = useState<Patient | null>(null);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
  async function loadPatient() {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
      return;
    }

    try {
      const response = await fetch(
        "http://localhost:8080/patient/me",
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      if (!response.ok) {
          localStorage.removeItem("token");
          navigate("/login");
          return;
      }

      const data: Patient = await response.json();

      setPatient(data);

    } catch {
      navigate("/login");
    }
  }

  loadPatient();

  async function loadAppointments() {
  const token = localStorage.getItem("token");

  if (!token) {
    navigate("/login");
    return;
  }

  const response = await fetch(
    "http://localhost:8080/patient/appointments",
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );

  if (!response.ok) {
    console.error("Erro ao carregar agendamentos:", response.status);
    return;
  }

  const data: Appointment[] = await response.json();

  setAppointments(data);
}
loadAppointments()
}, [navigate]);



function handleLogout() {
  // Remove o token JWT
  localStorage.removeItem("token");

  // Redireciona para o login
  navigate("/login", { replace: true });
}

async function handleDeleteAppointment(appointmentId: string) {

  const confirmed = window.confirm(
    "Deseja realmente excluir esta sessão?"
  );

  if (!confirmed) return;

  const token = localStorage.getItem("token");

  if (!token) {
    navigate("/login");
    return;
  }

  try {
    const response = await fetch(
      `http://localhost:8080/patient/appointments/${appointmentId}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    if (!response.ok) {
      throw new Error("Não foi possível excluir a sessão.");
    }

    // Remove a sessão da lista exibida
    setAppointments((previous) =>
      previous.filter(
        (appointment) => appointment.appointmentId !== appointmentId
      )
    );

  } catch (error) {
    console.error("Erro ao excluir sessão:", error);
    alert("Não foi possível excluir a sessão.");
  }
}

function isToday(date: string): boolean {
  const today = new Date();

  const todayFormatted = [
    today.getFullYear(),
    String(today.getMonth() + 1).padStart(2, "0"),
    String(today.getDate()).padStart(2, "0")
  ].join("-");

  return date === todayFormatted;
}

  return(
    <section className={styles.panel}>
     <header className={styles['panel__header']}>
      <button
          type="button"
          className={styles["btn-quit"]}
          onClick={handleLogout}
        >
          Sair da página
        </button>
     </header>  
      <div className={styles.title}>
        <h1>
           Olá, {patient?.name || "Paciente"}, seja bem-vindo ao
           <span> painel das sessões</span>
        </h1>
      </div>

       <div className={styles.sections}>

      <h2>Sessões a Realizar</h2>

      <div className={styles['section__table-container']}>
        <table className={styles['sections__table']}>
          <thead>
            <tr>
              <th>Dia da sessão</th>
              <th>Inicie sua Sessão</th>
              <th>Você finalizou a sessão?</th>
            </tr>
          </thead>

          <tbody>
            {appointments.map((appointment) => (
              <tr key={appointment.appointmentId}>

                <td className={styles["section-date"]}>
                  <span>
                    Data: {new Date(
                      `${appointment.date}T00:00:00`
                    ).toLocaleDateString("pt-BR")}
                  </span>

                  <span>
                    Horário: {appointment.hour.slice(0, 5)}
                  </span>
                </td>

                 <td className={styles['section-action']}>
                    <button
                      type="button"
                      className={styles['btn-section-start']}      
                      disabled={!isToday(appointment.date)}     
                    >
                      Iniciar Sessão
                    </button>
                  </td>

                  <td className={styles['section-action']}>
                    <button
                      type="button"
                      className={styles["btn-section-start"]}
                      disabled={!isToday(appointment.date)}
                     onClick={() => handleDeleteAppointment(appointment.appointmentId)}
                    >
                      Finalizei!
                    </button>
                  </td>

              </tr>
            ))}
         
          </tbody>
        </table>
      </div>

    </div>
    </section>
  )
}

export default MainPage