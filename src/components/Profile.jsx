import React, { useEffect, useState } from 'react'
import { Button, CircularProgress, Modal } from '@mui/material'
import { useLocation, useNavigate } from 'react-router-dom'
import { useAppContext } from '../UserContext';
import TheDataTable from './TheDataTable'

function Profile() {
    const navigate = useNavigate();
    const location = useLocation();
    const [editOpen,setEditOpen] =useState(false);
    const [editedUser,setEditedUser]=useState({});
    const {users,handleUpdate,isLoading} = useAppContext();
    const [userProfile,setProfile] = useState({})
    const id = location.pathname.split('/')[2]
    const [deleteAcc,setDeleteAcc] = useState(false)
    
    useEffect(()=>{
       const theUser = users.find((item)=>item.id == id);
      
       
       setProfile(theUser) ;
    },[location,handleUpdate])

  return (
    <div className=' p-3 text-slate-700'>
      <div className='flex items-start'>
        <button className='p-3 text-white bg-blue-600 rounded shadow-slate-500 shadow-lg' onClick={()=>navigate(-1)}>Back</button>
      </div>
      <div className='flex flex-col items-center gap-3 p-4'>
        <div className='sm:w-fit rounded-full bg-slate-300  outline outline-blue-600 outline-offset-4 p-4  shadow-slate-700 shadow-md flex items-center justify-center flex-col'>
        <img className='rounded-md h-16 w-16' src={userProfile?.gender =="male"?"/male.png":"/female.png"}  alt="" />
        <span className='font-extrabold text-2xl'>{userProfile?.name}</span>
        <span className='text-sm font-light'>{userProfile?.address}</span>
        <span className='font-semibold'>{userProfile?.role}</span>
        </div>
        <div className=' p-3 sm:w-3/5 w-5/6 bg-slate-300 rounded shadow-slate-700 shadow-lg'>
            
            <div className='flex w-full justify-between p-3'>
                <span className='font-bold mr-2'>Gender:</span>
            <span>{userProfile?.gender}</span>
            </div>
            <div className='flex w-full justify-between p-3'>
                <span className='font-bold  mr-2'>Email:</span>
            <span className='text-sm'>{userProfile?.email}</span>
            </div>
           
            <div className='flex w-full justify-between p-3'>
                <span className='font-bold mr-2'>Phone Number:</span>
            <span>{userProfile?.phoneNumber}</span>
            </div>
            
            <div className='flex w-full justify-between p-3'>
                <span className='font-bold mr-2'>Short Bio:</span>
            <span>{userProfile?.bio}</span>
            </div>
           <div className='flex items-center justify-center'>
           <button className='bg-blue-900 p-3 text-slate-200 rounded ' onClick={()=>{setEditOpen(true);setEditedUser(userProfile)}}>
                {isLoading?<CircularProgress/>:'Update Account'}
            </button>
           </div>
        </div>
      </div>
      <Modal
        className="w-full h-full flex items-center justify-center"
        open={editOpen}
        onClose={() => setEditOpen(false)}
      >
        <form className="bg-slate-400 sm:w-1/3 w-4/5 rounded p-4 flex flex-col gap-3">
          <div className="flex flex-col gap-3">
            <label className="font-bold" htmlFor="name">
              Name
            </label>
            <input
              type="text"
              id="name"
              value={editedUser.name}
              
              onChange={(e) =>  setEditedUser(prev=>({...prev,name:e.target.value}))}
              className="p-1"
            />
          </div>
          <div className="flex flex-col gap-3">
            <label className="font-bold" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={editedUser.email}
              
              onChange={(e) =>  setEditedUser(prev=>({...prev,email:e.target.value}))}
              className="p-1"
            />
          </div>
          <div className="flex flex-col gap-3">
            <label className="font-bold" htmlFor="address">
              Address
            </label>
            <input
              type="text"
              id="address"
              value={editedUser.address}
              
              onChange={(e) =>  setEditedUser(prev=>({...prev,address:e.target.value}))}
              className="p-1"
            />
          </div>
          <div className="flex flex-col gap-3">
            <label className="font-bold" htmlFor="phoneNumber">
              Phone Number
            </label>
            <input
              type="number"
              id="phoneNumber"
            
              value={editedUser.phoneNumber}
              onChange={(e) =>  setEditedUser(prev=>({...prev,phoneNumber:e.target.value}))}
              className="p-1"
            />
          </div>
          <div className="flex flex-col gap-3">
            <label className="font-bold" htmlFor="role">
              Role
            </label>
            <select
              id="role"
             
              onChange={(e) =>  setEditedUser(prev=>({...prev,role:e.target.value}))}
              className="p-1"
            >
              <option selected={editedUser.role == "manager"} value="manager">Manager</option>
              <option selected={editedUser.role == "digital marketing director"} value="digital marketing director">Digital Marketing</option>
              <option selected={editedUser.role == "developer"} value="developers">Developers</option>
            </select>
          </div>
          <div>
            <span className="font-bold">Gender</span>
            <div className="flex gap-10">
              <div>
                <label htmlFor="male">Male</label>
                <input
                  type="radio"
                  id="male"
                  name="gender"
                  checked={editedUser.gender == "male"}
                  onChange={() =>  setEditedUser(prev=>({...prev,gender:"male"}))}
                  value="male"
                />
              </div>
              <div>
                <label htmlFor="female">Female</label>
                <input
                  type="radio"
                  id="fename"
                  name="gender"
                  checked={editedUser.gender == "female"}
                  onChange={() => setEditedUser(prev=>({...prev,gender:"female"}))}
                  value="female"
                />
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <label className="font-bold" htmlFor="bio">
              Bio
            </label>
            <textarea
              
              id="bio"
              value={editedUser.bio}
              
              onChange={(e) =>  setEditedUser(prev=>({...prev,bio:e.target.value}))}
              className="p-1"
            />
          </div>
          <Button
            onClick={() => {
           
              handleUpdate(editedUser);
              setEditOpen(false);
            }}
            sx={{backgroundColor:'green',color:'white'}}
          >
            Edit user
          </Button>
        </form>
      </Modal>
    </div>
   
  )
}

export default Profile