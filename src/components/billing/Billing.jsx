import React, { useEffect, useState } from "react";
import { useAppContext } from "../../UserContext";
import DataTable from "react-data-table-component";
import styles from './Billing.module.scss';
import { CircularProgress, FormControl, InputLabel, MenuItem, Modal, Select, TextField } from "@mui/material";
import { useForm } from "react-hook-form";

function Billing() {
    const {handleAddBill,loggedUser,isLoading,users,usersBillings,setUsersBillings} = useAppContext();
    const [billing,setBilling] = useState(false);
    const {register,handleSubmit,reset} = useForm();
   
    const handleBill = async(inputData)=>{
    
     const res = await handleAddBill( {name:inputData.name,
      item:inputData.item,price:inputData.price});

      console.log(res)
        reset();
        setBilling(false);

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
      selector: (row) => row.price,
      sortable: true,
      wrap: true,
    },
    {
      name: "CreatedAt",
      selector: (row) =><FormatedDate timeGiven={row.createdAt} />,
      sortable: true,
      wrap: true,
    },
  ]
  
  const newBills = loggedUser.role == "manager"?usersBillings:usersBillings.filter((item)=>item.name == loggedUser.name)
 
 const handleClose = ()=>{
  setBilling(false)
  reset();
 }

  return (
    <div className={styles.billing}>
   <div className={styles.billing_button_container}>
  
   </div>
    <div className="p-3 shadow-md shadow-slate-700">
    <DataTable data={newBills} columns={columns} 
    title={<div className="flex justify-between border-b-2 items-center py-2 px-5"><span>Kalen Technologies Billing System</span> <button onClick={()=>setBilling(true)} className={styles.billing_button}>Create Bill</button></div>}
    selectableRows
    pagination
    highlightOnHover
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
      <TextField required label="Price" {...register('price')} />
      <button type="submit" className={styles.submit_button}>{isLoading?<CircularProgress/>:"Add New Billing"}</button>
      <button className="bg-red-800 p-2 rounded text-white" onClick={handleClose}>Cancel</button>
    </form>

    </Modal>
    </div>
  );
}

export default Billing;
