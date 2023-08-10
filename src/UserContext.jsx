import { createContext, useContext, useEffect, useState } from "react";
import { auth, db } from "./firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import Cookies from "js-cookie";

import {
  addDoc,
  collection,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
  serverTimestamp,
  query,
  orderBy,
  writeBatch,
} from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
// const batchDb = firebase.firestore();

const appContext = createContext();

function UserContext({ children }) {
  const [users, setUsers] = useState([]);
  const [loggedUser, setLoggedUser] = useState({ active: false });
  const [errors, setErrors] = useState({ status: false, payload: null });
  const [sidebar, setSidebar] = useState(false);
  const [usersBillings, setUsersBillings] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleCreate = async (staff) => {
    setIsLoading(true);
    try {
      await createUserWithEmailAndPassword(auth, staff.email, staff.password)
        .then(async (response) => {
          const docRef = await addDoc(collection(db, "staff"), {
            name: staff.name,
            userId: response.user.uid,
            email: staff.email,
            gender: staff.gender,
            role: staff.role,
          
            phoneNumber: staff.phoneNumber,
            address: staff.address,
            createdAt: serverTimestamp(),
            updatedAt: null,
          });
        })
        .catch((error) => {
          setErrors({ status: true, payload: error });
        });
    } catch (e) {
      setErrors({ status: true, payload: e });
      console.error("Error adding document: ", e);
    }
    setIsLoading(false);
    handleRead();
    navigate("/login");
  };

  const handleUpdate = async (staffs) => {
    setIsLoading(true);
    try {
      const docRef = doc(db, "staff", staffs.id);

      const data = {
        staff: {
          name: staffs.name,
          staff_id: staffs.staff_id,
          gender: staffs.gender,
          role: staffs.role,
          updatedAt: serverTimestamp(),
        },
      };

      await updateDoc(docRef, {
        name: staffs.name,
        address: staffs.address,
        email: staffs.email,
        phoneNumber: staffs.phoneNumber,
        gender: staffs.gender,
        role: staffs.role,
      
        

        updatedAt: serverTimestamp(),
      });
    } catch (e) {
      setErrors({ status: true, payload: e });
      console.error("Error adding document: ", e);
    }
    setIsLoading(false);

    handleRead();
  };

  const handleLogin = async (email, password) => {
    setIsLoading(true);
    await signInWithEmailAndPassword(auth, email, password)
      .then((item) => {
        const validUser = users.find((val) => val.userId == item.user.uid);
        const theData = JSON.stringify(validUser);

        Cookies.set("user", theData);
        setLoggedUser({ active: true, ...validUser });
        setIsLoading(false);
        navigate("/");
      })
      .catch((err) => {
        setIsLoading(false);
        setErrors({ status: true, payload: err });
      });
  };

  const handleLogout = async () => {
    await signOut(auth).then(() => {
      Cookies.remove("user");
      setLoggedUser({ active: false });
      setErrors(false);
      navigate("/");
    });
  };

  const handleRead = async () => {
    try {
      const docRef = await getDocs(
        query(collection(db, "staff"), orderBy("createdAt", "desc"))
      );

      const data = [];
      docRef.forEach((item) =>
        setUsers(data.push({ id: item.id, ...item.data() }))
      );

      setUsers(data);
    } catch (err) {
      setErrors({ status: true, payload: err });
    }
  };

  const handleDeleteAccount = async () => {
    const user = auth.currentUser;
    await user.delete();
    Swal.fire({
      title: "Success",
      text: "Account deleted successfully",
      timer: 3000,
      icon: "success",
    });
    setLoggedUser({ active: false });
    navigate("/");
  };
  const handleMultipleDelete = async(staffIds)=>{
    for(let i=0;i<staffIds.length;i++){
      console.log(staffIds.id)
      try{await handleDelete(staffIds[i]?.id)}catch(err){
        console.log(err)
      }
    }
  }
  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, "staff", id));

      handleRead();
    } catch (err) {
      setErrors({ status: true, payload: err });
    }
  };
  useEffect(() => {
    handleRead();
  }, []);

  useEffect(() => {
    const user = Cookies.get("user");
    if (user) {
      
      const userData = JSON.parse(user);

      setLoggedUser({ active: true, ...userData });
    }
  }, []);

  const handleGetBills = async () => {

    try {
      const res = await getDocs(
        query(collection(db, "billing"), orderBy("createdAt", "desc"))
      );
      
      const data = [];

      res.forEach((item) => {
        data.push({id:item.id,...item.data()});
      });
      
      
        setUsersBillings(data);
    
    } catch (err) {
      console.log(err);
    }
  };
  const handleDeleteBill = async(id)=>{
    try {
      await deleteDoc(doc(db, "billing", id));

      handleGetBills();
      Swal.fire({
        title:'Bill deleted successfully',
        text:`the bill was permanently removed from records`,
        icon:'success',
        showConfirmButton:false,
        timer:3000
      });
    } catch (err) {
      setErrors({ status: true, payload: err });
    }
  }

  const handleMultipleDeleteBills = async(bills)=>{
  
    const batch = writeBatch(db)
    try{
      console.log(bills)
      bills.forEach((bill)=>{
       

        batch.delete(doc(db,'billing',bill?.id));
      })
     
     

    const res =   await batch.commit()
    Swal.fire({
      title:'Bills deleted successfully',
      text:`selected bills were permanently deleted from records`,
      icon:'success',
      showConfirmButton:false,
      timer:3000
    });
    }catch(err){
      console.log("firebase error")
      console.log(err);
    }
  }

  const handleAddBill = async (items) => {
    setIsLoading(true);
    var isPresent = false;
    console.log(typeof(items.selectedDate))
    usersBillings.forEach((userBilling) => {
      
      if (userBilling.name == items.name) {
       
        let existingDate = new Date(userBilling.billCreatedAt);
        let chosenDate = new Date(items.selectedDate)
        console.log(typeof(chosenDate))
        if (existingDate.getMonth() ==  chosenDate.getMonth()) {
          isPresent = true;
        }
      }
    });
    if(isPresent)
    {
      setIsLoading(false);
       Swal.fire({
        title:'Action Denied',
        text:'You can add only one bill per month',
        icon:'error',
        timer:5000,
      });
  }
    else{
    try {
      await addDoc(collection(db, "billing"), {
        name: items.name,
        item: items.item,
        price: items.price,
        billCreatedAt: items.selectedDate,
        createdAt:serverTimestamp()
      });
      handleGetBills();
      setIsLoading(false);
     Swal.fire({
        title:'Bill created successfully',
        text:`bill for ${items.name} successfully created`,
        icon:'success',
        showConfirmButton:false,
        timer:3000
      });
    } catch (err) {
      console.log(err);
      setIsLoading(false);
    }
  };}

  const logout = () => {
    Swal.fire({
      title: "Are you sure you want to log out",
      text: "You will be logged out of the system",
      icon: "warning",
      showDenyButton: true,
      confirmButtonText: "Yes",
      confirmButtonColor: "green",
      showConfirmButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        handleLogout();
      }
    });
  };

  
  useEffect(() => {
    
    handleGetBills();
  }, []);

  return (
    <appContext.Provider
      value={{
        users,
        loggedUser,
        handleCreate,
        handleRead,
        handleDelete,
        handleUpdate,
        handleLogin,
        handleLogout,
        handleAddBill,
        handleDeleteAccount,
        handleDeleteBill,
        handleMultipleDelete,
        handleMultipleDeleteBills,
        errors,
        sidebar,
        logout,
        setSidebar,
        usersBillings,
        setUsersBillings,
        isLoading,
      }}
    >
      {children}
    </appContext.Provider>
  );
}

export default UserContext;

export const useAppContext = () => {
  return useContext(appContext);
};
