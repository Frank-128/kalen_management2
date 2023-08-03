import React, { useEffect } from 'react'
import { useAppContext } from '../UserContext'
import { useNavigate } from 'react-router-dom';

function AllStaff() {
  const {users} = useAppContext();
  
  const navigate = useNavigate();
  return (
    <div className='flex items-center flex-col'>
     { users.length!=0 ?<>
      <p className='font-bold text-2xl p-2 border-b-2 w-full text-center'>Manager</p>
      <div className='flex gap-10'>
     {users.filter(item=>item.role?.toLowerCase() === "manager").map((it,k)=> <div key={k} onClick={()=>navigate('/profile/'+it.id)} className='p-2 flex flex-col items-center'>
      <img src={it.gender=="female"?"/female.png":"/male.png"} alt="avatar" className='rounded-full md:w-36 md:h-36 w-16 h-16 object-cover' />
      <span className='font-light text-xs sm:text-lg'>{it.name}</span>
      </div>)}

      </div>
      <p className='font-bold text-2xl p-2 border-b-2 w-full text-center'>Digital Marketing</p>
     <div className='flex w-5/6 md:gap-10  overflow-x-scroll '>
    {users.filter(item=>item.role?.toLowerCase() === "digital marketing director").map((it,k)=> <div key={k} onClick={()=>navigate('/profile/'+it.id)} className='p-2 flex flex-col items-center'>
      <img src={it.gender=="female"?"./female.png":"./male.png"} alt="avatar" className='rounded-full md:w-36 md:h-36 w-16 h-16 overflow-x-scroll object-cover' />
      <span className='font-light text-xs sm:text-lg'>{it.name}</span>
      </div>)}
     
     </div>
      <p className='font-bold text-2xl p-2 border-b-2 w-full text-center'>Developers</p>
      <div className='flex gap-5'>
      {users.filter(item=>item.role?.toLowerCase() === "developer").map((it,k)=> <div key={k} onClick={()=>navigate('/profile/'+it.id)} className='p-2 flex flex-col items-center'>
      <img src={it.gender=="female"?"./female.png":"./male.png"} alt="avatar" className='rounded-full md:w-36 md:h-36 w-16 h-16 overflow-x-scroll' />
      <span className='font-light text-xs sm:text-lg'>{it.name}</span>
      </div>)}
     
      </div>
     </>:<p>Loading...</p>}
    </div>
  )
}

export default AllStaff