import React, { useEffect, useState } from 'react'
import { TextField, CircularProgress, Modal,FormControl,FormLabel,RadioGroup,FormControlLabel,Radio,InputLabel,Select,MenuItem,FormHelperText, Accordion, AccordionSummary, AccordionDetails } from '@mui/material'
import { useLocation, useNavigate } from 'react-router-dom'
import { useAppContext } from '../UserContext';
import TheDataTable from './TheDataTable'
import { useForm } from 'react-hook-form';
import { Expand, ExpandMore } from '@mui/icons-material';

function Profile() {
    const navigate = useNavigate();
    const location = useLocation();
    const [editOpen,setEditOpen] =useState(false);
    const [editedUser,setEditedUser]=useState({});
    const {users,handleUpdate,isLoading,updatePasswordMethod,errors} = useAppContext();
    
    const [userProfile,setProfile] = useState({})
    const [passwords,setPasswords]=useState({
      err:false,
      oldPassword:"",
      newPassword:"",
      confirmPassword:""
    });
    const id = location.pathname.split('/')[2]
    const [deleteAcc,setDeleteAcc] = useState(false)
    const [err, setErr] = useState({
      status: false,
      name: false,
      email: false,
      password: false,
      address: false,
      phoneNumber: false,
      bio: false,
      gender: false,
      role: false,
      confirm_password: false,
    });
    const {handleSubmit} = useForm()



    useEffect(()=>{
       const theUser = users.find((item)=>item.id == id);
      
       
       setProfile(theUser) ;
    },[location,handleUpdate])


const handleSubmitData = async () => {
    
    const data = {
      name: editedUser.name,
      email: editedUser.email,
     
      address: editedUser.address,
      phoneNumber: editedUser.phoneNumber,
      bio: editedUser.bio,
      gender: editedUser.gender,
      role: editedUser.role,
    }
    await handleUpdate(editedUser);
    setEditOpen(false);
  }

  
  return (
    <div className=' p-3 text-slate-700'>
      <div className='flex items-start'>
        <button className='p-3 text-white bg-blue-600 rounded shadow-slate-500 shadow-lg' onClick={()=>navigate(-1)}>Back</button>
      </div>
      <div className='flex justify-center w-full'>
        <span className='text-3xl'>My Profile</span>
      </div>
      <div className='flex flex-col items-center gap-3 p-4'>
       <div className='sm:w-3/5  rounded-sm bg-white justify-between p-4   shadow-slate-700 shadow-md flex md:flex-row flex-col items-center '>
       <div className='flex '>
        <img className='rounded-md sm:h-16 h-10 w-10 sm:w-16' src={userProfile?.gender =="male"?"/male.png":"/female.png"}  alt="" />
       <div className='flex flex-col '>
       <span className='font-extrabold text-lg sm:text-2xl'>{userProfile?.name}</span>
        <span className='font-semibold'>{userProfile?.role}</span>
        <span className='text-sm font-light'>{userProfile?.address}</span>
       </div>
       </div>
       <button className='bg-blue-900 p-3 w-full md:w-fit text-slate-200 rounded ' onClick={()=>{setEditOpen(true);setEditedUser(userProfile)}}>
                {isLoading?<CircularProgress/>:'Update Profile'}
            </button>
        </div>
        <div className=' p-3 sm:w-3/5 w-5/6 bg-white rounded-sm  shadow-slate-700 shadow-lg'>
           <span className='font-bold border-b-2 flex w-full'>Personal Information</span> 
           <div className='flex'>
           <div className='flex w-full flex-col justify-start p-3'>
                <span className='font-light'>Name</span>
               <span className='font-semibold mr-2'>{userProfile?.name}</span>
            </div>
            <div className='flex w-full justify-start flex-col p-3'>
                <span className='font-light  mr-2'>Gender</span>
            <span className='text-sm font-semibold'>{userProfile?.gender}</span>
            </div>
           </div>
           
            
            
           
           
        </div>
        <div className=' p-3 sm:w-3/5 w-5/6 bg-white rounded-sm  shadow-slate-700 shadow-lg'>
           <span className='font-bold border-b-2 flex w-full'>Contants</span> 
           <div className='flex md:flex-row flex-col'>
           <div className='flex w-full flex-col justify-start p-3'>
                <span className='font-light'>Phone Number</span>
               <span className='font-semibold mr-2'>{userProfile?.phoneNumber}</span>
            </div>
            <div className='flex w-full justify-start flex-col p-3'>
                <span className='font-light  mr-2'>Email</span>
            <span className='text-sm font-semibold'>{userProfile?.email}</span>
            </div>
           </div>

           </div>
           <div className=' p-3 sm:w-3/5 w-5/6 bg-white rounded-sm  shadow-slate-700 shadow-lg'>
           <span className='font-bold border-b-2 flex w-full'>Address</span> 
           <div className='flex'>
           <div className='flex w-full flex-col justify-start p-3'>
                <span className='font-light'>Physical Address</span>
               <span className='font-semibold mr-2'>{userProfile?.address}</span>
            </div>
           
           </div>

           </div>
           <div className='flex justify-end w-3/5'>
            <Accordion 
            
            >
              <AccordionSummary 
              expandIcon={<ExpandMore/>}
              >
                Change Password
              </AccordionSummary>
              <AccordionDetails className='flex flex-col gap-2'>
                <TextField error={errors.status} helperText={errors.payload} label="old password" value={passwords.oldPassword} onChange={(e)=>setPasswords({...passwords,oldPassword:e.target.value})} type='password'  />
                <TextField  label="new password" value={passwords.newPassword} onChange={(e)=>setPasswords({...passwords,newPassword:e.target.value})} type='password' />
                <TextField error={passwords.err} label="Confirm new password" value={passwords.confirmPassword} onChange={(e)=>setPasswords({...passwords,confirmPassword:e.target.value})} type='password'  />
                <button onClick={()=>{if(passwords.newPassword !== passwords.confirmPassword){return setPasswords({...passwords,err:true})} updatePasswordMethod({oldPassword:passwords.oldPassword,newPassword:passwords.newPassword});setPasswords({err:false})}} className='p-2 text-white bg-blue-950 rounded'>Change My Password</button>
              </AccordionDetails>
            </Accordion>
            </div>
      </div>
      <Modal open={editOpen} className="flex justify-center items-center h-fit py-5 md:h-screen  overflow-y-scroll w-screen " onClose={()=>setEditOpen(false)}>
      
      <form
        onSubmit={handleSubmit(handleSubmitData)}
        className=" bg-slate-200 p-3  rounded shadow-xl lg:w-2/3 xl:w-1/3 lg:mt-20 w-fit md:h-fit h-3/4   flex items-center flex-col"
      >
        <p>
          <strong className="text-sm md:text-lg">
            Edit User
          </strong>
        </p>
        <div className="flex flex-col  p-2 w-full justify-between gap-2">
          <TextField
            error={err.status && err.name !== false}
            helperText={err.name}
            name='name'
            onInvalid={(e) => {
              e.preventDefault();
              setErr({
                ...err,
                name: e.target.validationMessage,
                status: true,
              });
            }}
            value={editedUser.name}
            onChange={(e) => {
              setEditedUser({...editedUser,name:e.target.value})
              
            }}
            placeholder={editedUser.name}
            onFocus={() => {
              setErr({ ...err, name: false });
            }}
            label="Name"
            required
            className="w-full "
            
          />
          <TextField
            error={err.status && err.email !== false}
            helperText={err.email}
            onInvalid={(e) => {
              e.preventDefault();
              setErr({
                ...err,
                email: e.target.validationMessage,
                status: true,
              });
            }}
            value={editedUser.email}
            onChange={(e) => {
              setEditedUser({...editedUser,email:e.target.value})
              
            }}
            placeholder={editedUser.email}
            onFocus={() => {
              setErr({ ...err, email: false });
            }}
            name='email'
            label="Email"
            required
            className="w-full"
            
          />
        </div>
        <div className="flex p-2 gap-2 flex-col  w-full justify-between ">
          <TextField
            error={err.status && err.address !== false}
            helperText={err.address}
            onInvalid={(e) => {
              e.preventDefault();
              setErr({
                ...err,
                address: e.target.validationMessage,
                status: true,
              });
            }}
            placeholder={editedUser.address}
            onFocus={() => {
              setErr({ ...err, address: false });
            }}
            value={editedUser.address}
            onChange={(e) => {
                setEditedUser({...editedUser,address:e.target.value})
                
              }}
              label="Address"
            // {...register("address")}
            name='address'
            type='text'
            required
            className="w-full"
            
          />
          <TextField
            error={err.status && err.phoneNumber !== false}
            helperText={err.phoneNumber}
            onInvalid={(e) => {
              e.preventDefault();
              setErr({
                ...err,
                phoneNumber: e.target.validationMessage,
                status: true,
              });
            }}
            
            onFocus={() => {
              setErr({ ...err, phoneNumber: false });
            }}
            value={editedUser.phoneNumber}
            onChange={(e) => {
              setEditedUser({...editedUser,phoneNumber:e.target.value})
              
            }}
            label="Phone Number"
            type="number"
            required
            variant='filled'
            className="w-full"
           
          />
           <div className="flex items-start justify-start  w-full">
            <FormControl>
              <FormLabel>Gender</FormLabel>
              <RadioGroup row defaultValue="male">
                <FormControlLabel
                  control={<Radio />}
                  value="male"
                  label="Male"
                  checked={editedUser.gender == "male"}
                  onChange={(e)=>setEditedUser({...editedUser,gender:e.target.value})}
                />
                <FormControlLabel
                  control={<Radio />}
                  value="female"
                  label="Female"
                  checked={editedUser.gender == "female"}
                 onChange={(e)=>setEditedUser({...editedUser,gender:e.target.value})}
                />
              </RadioGroup>
            </FormControl>
          </div>
          <FormControl
            className=" w-full"
            error={err.status && err.role !== false}
          >
            <InputLabel id="role">Role</InputLabel>
            <Select
              label="Role"
              id="role"
              required
              value={editedUser.role}
              onChange={(e)=>setEditedUser({...editedUser,role:e.target.value})}
              onInvalid={(e) => {
                e.preventDefault();
                setErr({
                  ...err,
                  role: e.target.validationMessage,
                  status: true,
                });
              }}
              onFocus={() => {
                setErr({ ...err, role: false });
              }}
            >
              <MenuItem value="manager">Manager</MenuItem>
              <MenuItem  value="digital marketing director">
                Digital Marketing Director
              </MenuItem>
              <MenuItem  value="developer">Developer</MenuItem>
            </Select>
            <FormHelperText>{err.role}</FormHelperText>
          </FormControl>
        </div>
       
       

       

      <div className="md:flex-row w-full md:gap-3 flex-col flex">
        <button onClick={(e)=>{e.preventDefault();setEditOpen(false)}} className="bg-red-800  p-3 my-5 rounded text-slate-300 w-full">Cancel</button>
      <button
          className="p-3 my-5 bg-blue-950 rounded text-slate-300 w-full"
          type="submit"
        >
          {isLoading ? <CircularProgress /> : "Update User"}
        </button>
      </div>
       
      </form>
    
      </Modal>
    </div>
   
  )
}

export default Profile