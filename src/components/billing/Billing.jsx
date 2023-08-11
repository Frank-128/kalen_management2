import React, { useEffect, useState,useMemo,useCallback } from "react";
import { useAppContext } from "../../UserContext";
import DataTable from "react-data-table-component";
import styles from './Billing.module.scss';
import { CircularProgress, FormControl, InputLabel, MenuItem, Modal, Select, TextField } from "@mui/material";
import { useForm,Controller } from "react-hook-form";
import { Delete, Edit, Search, Visibility } from "@mui/icons-material";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { NumericFormat } from "react-number-format";

function Billing() {
    const {handleAddBill,loggedUser,isLoading,users,usersBillings,handleMultipleDeleteBills,handleDeleteBill,handleUpdateBill} = useAppContext();
    const [billing,setBilling] = useState(false);
    const [search,setSearch] = useState("");
    const [toggleClear,setToggleClear] = useState(false);
    const [selectedRows,setSelectedRows] = useState([]);
    const {register,handleSubmit,reset,control} = useForm();
    const [editedBill,setEditedBill] = useState({status:false});
    const navigate = useNavigate()


    const handleBill = async(inputData)=>{
    
     const res = await handleAddBill( {name:inputData.name,
      item:inputData.item,price:inputData.price,selectedDate:inputData.selectedDate});

      console.log(res)
        reset();
        setBilling(false);

    }
    const handleBillUpdateFunc=async(inputData)=>{
      console.log(editedBill)
      const res = await handleUpdateBill({
        id:editedBill.id,
        name:editedBill.name,
        item:editedBill.item,
        price:editedBill.price,
        billCreatedAt:editedBill.billCreatedAt
      })

      setEditedBill({status:false})
    }

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
  
   


    const returnTime =(sample)=>{
      const month = (new Date(sample).getMonth())
      const year =  (new Date(sample).getFullYear()).toString()
      
      const months = ["January","February","March","April","May","June","July","August","September","October","November","December"]
      return months[month]+" "+year
    
    }
  const columns = [
    {
      name: "Name",
      selector: (row) => row.name,
      sortable: true,
      wrap: true,
    },
    {
      name: "Item",
      selector: (row) => row.item,
      sortable: true,
      wrap: true,
    },
    {
      name: "Price",
      selector: (row) => <NumericFormat displayType="text" value={row.price} thousandSeparator=',' />,
      sortable: true,
      wrap: true,
    },
    {
      name:"Billed month",
      selector:(row)=>returnTime(row.billCreatedAt),
      sortable:true,
      wrap:true
    },
    {
      name: "CreatedAt",
      selector: (row) =><FormatedDate timeGiven={row.createdAt} />,
      sortable: true,
      wrap: true,
    },
  (loggedUser.role=="manager")&& {
      name:"Actions",
      cell:(row)=> <div className={`flex justify-around w-full xl:gap-2 gap-1 p-2  md:p-1 ${loggedUser.role !== "manager"?'hidden':''}`}>
      
       <button
         className="rounded text-slate-200 p-1"
         onClick={() => {
           
          
           setEditedBill({status:true,...row});
         }}
       >
       <Edit color='info'/>
       </button>
       <button
         className=" rounded text-slate-200 p-1"
         onClick={() => Swal.fire({
           title:'Are you sure you want to delete this bill ?',
           text:row.name+'\'s bill for '+returnTime(row.billCreatedAt)+' will be permanently deleted',
           icon:'warning',
           showConfirmButton:true,
           showDenyButton:true,
           confirmButtonText:'Yes',
           confirmButtonColor:'green',
           denyButtonText:'No'
         }).then((objValue)=>{
           console.log(objValue)
         if(objValue.isConfirmed){
          console.log(row)
         handleDeleteBill(row.id)
         }}
         )}
       >
         <Delete color='error'/>
       </button>
      
     </div>
    }
  
  ]
  
  const newBills = loggedUser.role == "manager"?usersBillings:usersBillings.filter((item)=>item.name == loggedUser.name)
 
 const handleClose = ()=>{
  setBilling(false)
  reset();
 }

 const headRowStyle = {  headRow: {
  style: {
    backgroundColor: 'lightgrey',
    fontWeight:'bold'
  }
},
cells:{style:{paddingLeft:'1px'}}

}

const handleRowSelected = useCallback(state => {
  setSelectedRows(state.selectedRows);
}, []);


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



const contextActions = useMemo(() => {
  const handleDelete = () => {
    
  Swal.fire({

    title:`Are sure you want to delete these bills`,
    text:` ${selectedRows.length} items will be deleted`,
    icon:'warning',
    showConfirmButton:true,
    showDenyButton:true,
    confirmButtonText:'Yes',
    confirmButtonColor:'green',
    denyButtonText:'No'
  }).then((objValue)=>{
   console.log(objValue)
  if(objValue.isConfirmed){
    console.log(selectedRows)
  handleMultipleDeleteBills(selectedRows)
   

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
}, [newBills, selectedRows,toggleClear]);

  return (
    <div className='flex w-screen md:w-full p-3 text-lg flex-col'>
   <div className={styles.billing_button_container}>
  
   </div>
    <div className="p-3 border-slate-300 border">
    <DataTable 
    title={<div className="sm:flex-row mb-2  flex-col gap-2 flex justify-between items-center  "> <button onClick={()=>setBilling(true)} className={"bg-blue-900 rounded text-sm md:text-lg text-white p-2"}>Create Bill</button>
     <span className="bg-white rounded flex ">
          <input type="text" className="p-2 md:w-full w-3/4  text-sm h-1/2 border outline-none" placeholder="search users here" onChange={(e)=>setSearch(e.target.value)} />
        <span className="border"> <Search sx={{border:'1px solid lightgray',height:'100%',}}  /></span>
        </span>
    </div>}
    data={dataFilter(newBills,search)} 
    columns={columns} 
    selectableRows
    pagination
    highlightOnHover
    progressPending={newBills.length==0}
    progressComponent={<div>...Loading <CircularProgress/></div>}
    customStyles={headRowStyle}
    contextActions={contextActions}
    clearSelectedRows={toggleClear}
    onSelectedRowsChange={handleRowSelected}
    pointerOnHover
    paginationRowsPerPageOptions={[3, 5, 10, 15, 20]}
    paginationPerPage={3}
    
    />
    </div>
    <Modal open={billing} onClose={handleClose} className={styles.modal}>
    <form className={styles.billing_form} onSubmit={handleSubmit(handleBill)}>
      <span className={styles.title}>Add new billing</span>
     {loggedUser.role=="manager"?
     <FormControl>
      <InputLabel id='name'>Name</InputLabel>
      <Select label='Name' id='name' required {...register('name')}>
      {users?.map((item,k)=><MenuItem key={k} value={item.name}>{item.name}</MenuItem>)}
     </Select> 
     </FormControl>
     :<TextField label="Name" value={loggedUser?.name} {...register('name')} />}
      <TextField required label="Item" {...register('item')} />
      
      <Controller name="price" label="Price" control={control} defaultValue={0} render={({field})=><NumericFormat required label="Price" thousandSeparator  {...field} allowNegative={false} customInput={TextField} />} />
      <Controller name="selectedDate" control={control} defaultValue={new Date()} 
      render={({field})=>
      <TextField type="date"  label="Select Date" InputLabelProps={{shrink:true}} {...field} />} />
      <div className="md:flex-row flex flex-col gap-2">
      <button type="submit" className={"bg-green-800 p-2 text-white rounded basis-1/2"}>{isLoading?<CircularProgress/>:"Add New Billing"}</button>
      <button className="bg-red-800 p-2 basis-1/2 rounded text-white" onClick={handleClose}>Cancel</button>
      </div>
    </form>

    </Modal>

    {/* edit the bill */}
    <Modal open={editedBill.status} onClose={()=>setEditedBill({status:false})} className={styles.modal}>
    <form className={styles.billing_form} onSubmit={handleSubmit(handleBillUpdateFunc)}>
      <span className={styles.title}>Edit {editedBill?.name}'s billing</span>
     {loggedUser.role=="manager"?
     <FormControl>
      <InputLabel id='name'>Name</InputLabel>
      <Select label='Name' id='name' required value={editedBill?.name} onChange={(e)=>setEditedBill({...editedBill,name:e.target.value})}>
      {users?.map((item,k)=><MenuItem key={k} value={item.name}>{item.name}</MenuItem>)}
     </Select> 
     </FormControl>
     :<TextField label="Name" value={editedBill?.name} onChange={(e)=>setEditedBill({...editedBill,name:e.target.value})} />}
      <TextField required label="Item" value={editedBill?.item} onChange={(e)=>setEditedBill({...editedBill,item:e.target.value})} />
      <NumericFormat required label="Price" thousandSeparator onChange={(e)=>setEditedBill({...editedBill,price:e.target.value})}  value={editedBill?.price} allowNegative={false} customInput={TextField} />
      
      
      <TextField type="date"  label="Select Date" onChange={(e)=>setEditedBill({...editedBill,billCreatedAt:e.target.value})} InputLabelProps={{shrink:true}} value={editedBill?.billCreatedAt} />
      <div className="md:flex-row flex flex-col gap-2">
      <button type="submit" className={"bg-green-800 p-2 text-white rounded basis-1/2"}>{isLoading?<CircularProgress/>:"Add New Billing"}</button>
      <button className="bg-red-800 p-2 basis-1/2 rounded text-white" onClick={(e)=>setEditedBill({status:false})}>Cancel</button>
      </div>
    </form>

    </Modal>
    </div>
  );
}

export default Billing;
