import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Start from './Pages/Start'
import UserSignup from './Pages/UserSignup'
import UserLogin from './Pages/UserLogin'
import CaptainSignup from './Pages/CaptainSignup'
import CaptainLogin from './Pages/CaptainLogin'
import Home from './Pages/Home'
import UserProtectedWrapper from './Pages/UserProtectedWrapper'
import UserLogout from './Pages/UserLogout'

const App = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Start/>}/>
        <Route path='/signup' element={<UserSignup/>}/>
        <Route path='/login' element={<UserLogin/>}/>
        <Route path='/captain-signup' element={<CaptainSignup/>}/>
        <Route path='/captain-login' element={<CaptainLogin/>}/>

        <Route path='/home' element={<UserProtectedWrapper>
          <Home/>
        </UserProtectedWrapper>}/>
        <Route path='/user/logout' element={<UserProtectedWrapper>
          <UserLogout/>
        </UserProtectedWrapper>}/>
      </Routes>
    </div>
  )
}

export default App
