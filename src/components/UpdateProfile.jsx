import React,{useState} from 'react'

function UpdateProfile() {
    const [name,setName] = useState("");
    const [email,setEmail] = useState("");
    const [address,setAddress] = useState("");
    const [phoneNumber,setPhoneNumber] = useState("");
    const [bio,setBio] = useState("")
    const [gender,setGender] = useState("")
    const [role,setRole] = useState("")
    const {handleCreate} = useAppContext();
    const handleSubmit = async(e)=>{
        e.preventDefault();
        const data = {
            name,email,address,phoneNumber,bio,gender,role
        }
        await handleCreate(data);
    }
  return (
    <div className='flex justify-center items-center h-screen w-screen bg-slate-400'>
        <form onSubmit={handleSubmit} className=' bg-slate-100 p-3 rounded shadow-xl w-1/4 h-[95%] flex items-center flex-col'>
            <img src="/kalen.jpeg" className='w-4/5 h-1/6 object-contain' alt="" />
            <p>
                <i>Register to Kalen Technologies Company</i>
            </p>
            <div className='flex flex-col w-full p-3'>
                <label className='font-bold' htmlFor="name">Name</label>
                <input type="text" className='p-2' value={name} onChange={(e)=>setName(e.target.value)} />
            </div>
            <div className='flex flex-col w-full p-3'>
                <label className='font-bold' htmlFor="email">Email</label>
                <input type="text" className='p-2' value={email} onChange={(e)=>setEmail(e.target.value)} />
            </div>
            <div className='flex flex-col w-full p-3'>
                <label className='font-bold' htmlFor="address">Address</label>
                <input type="text" className='p-2' value={address} onChange={(e)=>setAddress(e.target.value)} />
            </div>
            <div className='flex flex-col w-full p-3'>
                <label className='font-bold' htmlFor="phoneNumber">Phone Number</label>
                <input type="text" className='p-2' value={phoneNumber} onChange={(e)=>setPhoneNumber(e.target.value)} />
            </div>
            <div className='flex flex-col w-full p-3'>
                <label className='font-bold' htmlFor="bio">Bio</label>
                <textarea type="text" className='p-2' value={bio} onChange={(e)=>setBio(e.target.value)} />
            </div>
            <div className='flex flex-col  w-full p-3 '>
                <span className='font-bold'>Gender</span>
            <div className='flex gap-5'>
            <div className='flex gap-2'>
                <label className='font-semibold' htmlFor="female">Female</label>
              <input type="radio" name="gender" id="female" value="female" onChange={(e)=>setGender(e.target.value)} />
              </div>
              <div className='flex gap-2'>
                <label className='font-semibold' htmlFor="male">Male</label>
              <input type="radio" name="gender" id="male" value="female" onChange={(e)=>setGender(e.target.value)} />
              </div>
            </div>
                
            </div>
            <div className='flex flex-col w-full p-3'>
                <label className='font-bold' htmlFor="bio">Role</label>
               <select onChange={(e)=>setRole(e.target.value)} className='p-2'>
                <option value="manager">Manager</option>
                <option value="digital marketing director">Digital Marketing Director</option>
                <option value="bussiness manager">Bussiness Manager</option>
                <option value="developer">Developer</option>
               </select>
            </div>
            <button className='p-3 bg-blue-950 rounded text-slate-300 w-full' type="submit">Register</button>
            <span><i>Already have an account? <Link className='text-blue-600'>login</Link></i></span>
        </form>
    </div>
  )
}

export default UpdateProfile