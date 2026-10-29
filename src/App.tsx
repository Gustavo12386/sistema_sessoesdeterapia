import './App.scss'
import Header from './components/Header.tsx'
import logo from './assets/logo Clinica DM.png'
import FormDados from './components/FormDados.tsx'
import FormPagamento from './components/FormPagamento.tsx'

function App() {  

  return (
    <>
    <div className='divlogo'>
       <img src={logo} className='logo' alt='logo'/>
    </div> 
    <Header/>
    <FormDados/>
    <FormPagamento/>
    </>
  )
}

export default App
