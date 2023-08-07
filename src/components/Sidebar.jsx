import React, { useEffect, useRef } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useAppContext } from '../UserContext';
import { Close, Dashboard,  Logout, Money, PeopleAlt,  } from '@mui/icons-material';
import Swal from 'sweetalert2';


function Sidebar() {
    const navigate = useNavigate();
    const {logout,loggedUser,sidebar,setSidebar} = useAppContext()
    const location = useLocation();
    const page = location.pathname.split('/')[1];
    
   
  return (
    <div className='basis-1/4  '>
      {/* for large devices  */}
      <div className=' h-full hidden md:flex flex-col bg-slate-200  text-2xl gap-1  border-r-2 border-slate-300 '>
       <div className='flex items-center bg-slate-50 justify-center h-1/6 w-full'> <img src="/tesla.png" alt="logo" className='h-full w-1/2 rounded object-cover' /></div>
        
        <div  onClick={()=>{navigate('/');}} id='dashboard' className={`${page == ""?'bg-slate-500 text-white':'bg-transparent'} text-slate-900 rounded flex items-center justify-start  p-4 gap-3 hover:opacity-70 duration-200 cursor-pointer`}>
            <Dashboard/>
            <span>Dashboard </span>
        </div>
       
        {loggedUser.role === "manager" && <div onClick={()=>{navigate('/staff')}} className={`${page=="staff"?'bg-slate-500 text-white':'bg-transparent'} text-slate-900 rounded p-4 gap-3 flex items-center justify-start hover:opacity-70  duration-200 cursor-pointer`}>
          <PeopleAlt/>
          <span>Staff</span>
        </div>}
        <div onClick={()=>{navigate('/billing');}} className={`${page=="billing"?'bg-slate-500 text-white':'bg-transparent'} text-slate-900 flex justify-start items-center gap-3 rounded p-4 hover:opacity-70  duration-200 cursor-pointer`}>
            <Money/>
            <span>Billing</span>
        </div>
        <div onClick={logout} className='text-slate-900 rounded p-4 flex justify-start gap-3 items-center hover:opacity-70  duration-500 cursor-pointer'>
            <Logout/>
            <span>Logout </span>
        </div>
    </div>
    {/* for smaller devices */}
    {sidebar && <div className='basis-1/4 z-50 flex md:hidden absolute w-full h-full flex-col  bg-slate-200  text-2xl gap-1  border-r-2 border-slate-300 '>
        <div className='flex h-1/6 justify-center '>
        <img src="/tesla.png" alt="logo" className='h-full w-3/4 rounded object-cover' />
        </div>
        
        <div  onClick={()=>{navigate('/');setSidebar(false);}} id='dashboard' className={`${page == ""?'bg-slate-500 text-white':'bg-transparent'} text-slate-900 rounded flex items-center justify-start  p-4 gap-3 hover:opacity-70 duration-200 cursor-pointer`}>
            <Dashboard/>
            <span>Dashboard </span>
        </div>
       
        {loggedUser.role === "manager" && <div onClick={()=>{navigate('/staff');setSidebar(false)}} className={`${page=="staff"?'bg-slate-500 text-white':'bg-transparent'} text-slate-900 rounded p-4 gap-3 flex items-center justify-start hover:opacity-70  duration-200 cursor-pointer`}>
          <PeopleAlt/>
          <span>Staff</span>
        </div>}
        <div onClick={()=>{navigate('/billing');setSidebar(false);}} className={`${page=="billing"?'bg-slate-500 text-white':'bg-transparent'} text-slate-900 flex justify-start items-center gap-3 rounded p-4 hover:opacity-70  duration-200 cursor-pointer`}>
            <Money/>
            <span>Billing</span>
        </div>
        <div onClick={logout} className='text-slate-900 rounded p-4 flex justify-start gap-3 items-center hover:opacity-70  duration-500 cursor-pointer'>
            <Logout/>
            <span>Logout </span>
        </div>
        <span onClick={()=>setSidebar(false)} className='absolute bottom-4 flex justify-center w-full rounded-full '>
          <Close/>
        </span>
    </div>}
   
    </div>
  )
}

export default Sidebar