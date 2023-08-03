import React from 'react'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import Home from './pages/Home'
import AllStaff from './components/AllStaff'
import Manage from './components/Manage'
import About from './components/About'
import Login from './pages/Login'
import Register from './pages/Register'
import Profile from './components/Profile'
import { useAppContext } from './UserContext'
import TheDataTable from './components/TheDataTable'

function App() {
  const {loggedUser} = useAppContext();
  return (
    <>
    <Routes>
      <Route path='/login' element={<Login/>} />
      <Route path='/register' element={<Register/>} />
      <Route path='/' element={loggedUser.active?<Home/>:<Login/>} >
        <Route path='/' element={<AllStaff/>} />
        <Route path='/staff' element={<TheDataTable/>} />
        <Route path='/billing' element={<About/>} />
        <Route path='/profile/:id' element={<Profile/>} />
      </Route>
      <Route path='*' element={<Login/>} />
    </Routes>
    </>
  )
}

export default App