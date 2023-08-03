import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { useAppContext } from "../UserContext";
import { Add, Search } from "@mui/icons-material";
import { Modal } from "@mui/material";
import { useForm } from "react-hook-form";
import {
  CircularProgress,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  TextareaAutosize,
  FormHelperText,
  RadioGroup,
  Radio,
  FormControlLabel,
  FormLabel,
} from "@mui/material";
import AddUser from "./AddUser";
import Swal from "sweetalert2";
function TheDataTable() {
  const { users } = useAppContext();
  const [amount, setAmount] = useState(2);
  const [search,setSearch]= useState('');
  const [editedUser, setEditedUser] = useState({});
  const [selectedUser,setSelectedUser] = useState(null);
  const [addUser,setAddUser] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
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
  const {handleUpdate,isLoading,handleDelete} = useAppContext()
  const {  handleSubmit } = useForm({
    shouldUseNativeValidation: true,
   
  });
  function FormatedDate({ timeGiven }) {
    if (timeGiven == null) {
      return <span>null</span>;
    }
    const dateObject = new Date(timeGiven?.seconds * 1000);

    const year = dateObject.getFullYear().toString();
    const month = (dateObject.getMonth() + 1).toString();
    const day = dateObject.getDate().toString();
    const hours = dateObject.getHours().toString();
    const minutes = dateObject.getMinutes().toString();
    const seconds = dateObject.getSeconds().toString();

    return (
      <span>
        {year +
          "-" +
          month +
          "-" +
          day +
          "\t" +
          "\t" +
          hours +
          "-" +
          minutes +
          "-" +
          seconds}
      </span>
    );
  }

  const collumns = [
    {
      name: "Name",
      selector: (row) => row.name,
      sortable: true,
      wrap: true,
    },
    {
      name: "Email",
      selector: (row) => row.email,
      sortable: true,
      wrap: true,
    },
    {
      name: "Address",
      selector: (row) => row.address,
      sortable: true,
      wrap: true,
    },
    {
      name: "Phone Number",
      selector: (row) => row.phoneNumber,
      sortable: true,
      
      wrap: true,
    },
    {
      name: "Created At",
      selector: (row) => <FormatedDate timeGiven={row.createdAt} />,
      sortable: true,
      wrap: true,
    },
    {
      name:"Actions",
      button:true,
      grow:2,
      selector:(row)=> <div className="flex p-4 overflow-scroll">
      <button
        className="bg-blue-500  rounded text-slate-200 p-1"
        onClick={() => {
          console.log(row)
          setEditOpen(true);
          setEditedUser(row);
        }}
      >
        Update
      </button>
      <button
        className="bg-red-500  rounded text-slate-200 p-1"
        onClick={() => Swal.fire({
          title:'Are you sure you want to delete '+row.name,
          text:'User will be permanently deleted',
          icon:'warning',
          showConfirmButton:true,
          showDenyButton:true,
          confirmButtonText:'Yes',
          confirmButtonColor:'green',
          denyButtonText:'No'
        }).then((objValue)=>{
          console.log(objValue)
        if(objValue.isConfirmed){
        handleDelete(row.id)
        }}
        )}
      >
        Delete
      </button>
    </div>
    }
  ];
  const dataFilter =  (rows, term) => {
    return rows.filter(row => {
      const values = Object.values(row);
      for (const value of values) {
        if (String(value).toLowerCase().includes(term.toLowerCase())) {
          return true;
        }
      }
      return false;
    });
  };
  const handleSubmitData = async () => {
    console.log(editedUser)
    const data = {
      name: editedUser.name,
      email: editedUser.email,
     
      address: editedUser.address,
      phoneNumber: editedUser.phoneNumber,
      bio: editedUser.bio,
      gender: editedUser.gender,
      role: editedUser.role,
    };
   
    await handleUpdate(editedUser);
    setEditOpen(false);
  };

 
 
  return (
    <div className="p-5 overflow-scroll md:w-full w-screen">
      
      <div className="w-full flex justify-between bg-slate-300 p-3 rounded">
        <span>Manage Users</span>
        <button onClick={()=>setAddUser(true)} className="p-2 bg-blue-500 rounded text-white"><Add/> Add User</button>
      </div>
      <div className="p-3 flex justify-between items-center ">
        <span className="font-bold">Kalen Technology Solutions</span>
        <span className="bg-white rounded ">
          <input type="search" className="p-2 outline-none" placeholder="search users here" onChange={(e)=>setSearch(e.target.value)} />
          <Search/>
        </span>
      </div>
      <DataTable
        columns={collumns}
        title="Kalen Staff 2023"
        data={dataFilter(users,search)}
        selectableRows
        pagination
        highlightOnHover
        pointerOnHover
        paginationRowsPerPageOptions={[amount, 3, 5, 10, 15, 20]}
        paginationPerPage={3}
      />
      <Modal open={editOpen} className="flex justify-center items-center py-5 md:h-screen  overflow-y-scroll w-screen " onClose={()=>setEditOpen(false)}>
      
      <form
        onSubmit={handleSubmit(handleSubmitData)}
        className=" bg-slate-200 p-3  rounded shadow-xl lg:w-2/3 xl:w-1/2 lg:mt-20 w-fit md:h-fit h-3/4 overflow-y-scroll  flex items-center flex-col"
      >
        <p>
          <strong className="text-sm md:text-lg">
            <i>Edit User</i>
          </strong>
        </p>
        <div className="flex flex-col lg:flex-row p-2 w-full justify-between gap-2">
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
            // {...register("name")}
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
            // {...register("email")}
          />
        </div>
        <div className="flex p-2 gap-2 flex-col md:flex-row   w-full justify-between ">
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
            // {...register("phoneNumber")}
          />
        </div>
       
        <div className="p-2 w-full">
          <TextField
            multiline
            error={err.status && err.bio !== false}
            helperText={err.bio}
            required
            onInvalid={(e) => {
              e.preventDefault();
              setErr({ ...err, bio: e.target.validationMessage, status: true });
            }}
            onFocus={() => {
              setErr({ ...err, bio: false });
            }}
            rows={4}
            label="Bio"
            className="w-full"
            value={editedUser.bio}
            onChange={(e)=>setEditedUser({...editedUser,bio:e.target.value})}
            // {...register("bio")}
          />
        </div>

       

      <div className="md:flex-row w-full gap-3 flex-col flex">
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
      <AddUser addUser={addUser} setAddUser={setAddUser}/>
    </div>
  );
}

export default TheDataTable;
