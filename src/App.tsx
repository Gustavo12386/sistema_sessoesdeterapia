import './App.scss'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from './components/Header.tsx'
import Login from './components/Login.tsx'
import Recovery from './components/RecoveryPassword.tsx'
import Main from './components/MainPage.tsx'
import logo from './assets/logo Clinica DM.png'
import FormDados from './components/FormDados.tsx'
import FormPagamento from './components/FormPagamento.tsx'
import NewPassword from './components/NewPassword.tsx'

function App() {  

  return (
    <>
    <div className='divlogo'>
       <img src={logo} className='logo' alt='logo'/>
    </div> 
    <Router>
     <Routes>
       <Route path='/' element={<><Header/> <FormDados/></>}/>
       <Route path='/formpayment' element={<FormPagamento/>}/>
       <Route path='/login' element={<Login/>}/>
       <Route path='/recoverypassword' element={<Recovery/>}/>
       <Route path='/newpassword' element={<NewPassword/>}/>
       <Route path='/mainpage' element={<Main/>} />
     </Routes>
    </Router>  
   
    </>
  )
}

export default App
