import React, { useEffect, useState,useCallback,useMemo } from "react";
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
import { useNavigate } from "react-router-dom";
function TheDataTable() {
  const { users,handleMultipleDelete } = useAppContext();
  const [amount, setAmount] = useState(2);
  const [search,setSearch]= useState('');
  const [editedUser, setEditedUser] = useState({});
  const [selectedUser,setSelectedUser] = useState(null);
  const [toggleClear,setToggleClear] = useState(false);
  const [addUser,setAddUser] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [selectedRows,setSelectedRows] = useState([]);
  const navigate = useNavigate()
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
      selector:(row)=> <div className="flex gap-3 p-4 overflow-scroll">
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
  }

  const handleRowSelected = useCallback(state => {
		setSelectedRows(state.selectedRows);
	}, []);


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
  const contextActions = useMemo(() => {
		const handleDelete = () => {
			
		Swal.fire({

      title:`Are sure you want to delete these items`,
      text:` ${selectedRows.length} items will be deleted`,
      icon:'warning',
      showConfirmButton:true,
      showDenyButton:true,
      confirmButtonText:'Yes',
      confirmButtonColor:'green',
      denyButtonText:'No'
    }).then((objValue)=>{
     
    if(objValue.isConfirmed){
    handleMultipleDelete(selectedRows)
    setToggleClear(!toggleClear)
    setSelectedRows([]);
    }}
    )
		};

		return (
			<button key="delete" className="text-white p-2 rounded bg-red-800" onClick={handleDelete}  >
				Delete
			</button>
		);
	}, [users, selectedRows,toggleClear]);

 
 console.log(selectedRows)
  return (
    <div className="p-5 overflow-scroll md:w-full w-screen">
      
      <div className="w-full flex justify-start bg-white border-b-2 ">
        <span className="text-2xl">Manage Users</span>
        
      </div>
   <div className="p-4 bg-white shadow-md shadow-slate-700 mt-5">
   <div className="p-3 flex justify-between items-center ">
        <span className="font-bold md:block hidden">Kalen Technology Solutions Staff Management</span>
        <span className="bg-white rounded ">
          <input type="search" className="p-2 border outline-none" placeholder="search users here" onChange={(e)=>setSearch(e.target.value)} />
         <Search/>
        </span>
      </div>
      <DataTable
        columns={collumns}
        title={<button onClick={()=>setAddUser(true)} className="p-2 text-xs bg-blue-500 rounded text-white"><Add/> Add User</button>}
        data={dataFilter(users,search)}
        selectableRows
        pagination
        highlightOnHover
        contextActions={contextActions}
        clearSelectedRows={toggleClear}
        onSelectedRowsChange={handleRowSelected}
        pointerOnHover
        paginationRowsPerPageOptions={[amount, 3, 5, 10, 15, 20]}
        paginationPerPage={3}
        onRowClicked={(row)=>navigate('/profile/'+row.id)}
      />
   </div>
      <Modal open={editOpen} className="flex justify-center items-center py-5 md:h-screen  overflow-y-scroll w-screen " onClose={()=>setEditOpen(false)}>
      
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
