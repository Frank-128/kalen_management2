import React from 'react'
import { BrowserRouter,Routes,Route,Navigate } from 'react-router-dom'
import Home from './pages/Home'
import AllStaff from './components/AllStaff'
import Manage from './components/Manage'
import Login from './pages/login/Login'
import Register from './pages/Register'
import Profile from './components/Profile'
import { useAppContext } from './UserContext'
import TheDataTable from './components/TheDataTable'
import Billing from './components/billing/Billing'

function App() {
  const {loggedUser} = useAppContext();
  console.log(loggedUser?.role)
  return (
    <>
    <Routes>
      <Route path='/login' element={<Login/>} />
      <Route path='/register' element={<Register/>} />
      <Route path='/' element={loggedUser.active?<Home/>:<Login/>} >
        <Route path='/' element={<AllStaff/>} />
       {loggedUser?.role=="manager" && <Route path='/staff' element={<TheDataTable/>} />}
        <Route path='/billing' element={<Billing/>} />
        <Route path='/profile/:id' element={<Profile/>} />
      </Route>
      <Route path='*' element={<Navigate to='/' />} />
    </Routes>
    </>
  )
}

export default App