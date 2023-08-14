import { createContext, useContext, useEffect, useState } from "react";
import { auth, db } from "./firebase";
import {
  EmailAuthCredential,
  EmailAuthProvider,
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  reauthenticateWithCredential,
  signInWithEmailAndPassword,
  signOut,
  updatePassword,
} from "firebase/auth";
import Cookies from "js-cookie";
import emailjs from '@emailjs/browser';
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
import generator  from "generate-password-browser";
// const batchDb = firebase.firestore();

const appContext = createContext();

function UserContext({ children }) {
  const [users, setUsers] = useState([]);
  const [loggedUser, setLoggedUser] = useState({ active: false });
  const [errors, setErrors] = useState({ status: false, payload: "" });
  const [sidebar, setSidebar] = useState(false);
  const [usersBillings, setUsersBillings] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const auth = getAuth();

  const navigate = useNavigate();

  const handleCreate = async (staff) => {
    setIsLoading(true);
    const passwordGen = generator.generate({
      length:6,
      numbers:true,
    })
    try {
      await createUserWithEmailAndPassword(auth, staff.email, passwordGen)
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

          emailjs.send('service_s0v7nhi','template_b1vsl3s',{
            name:staff.name,
            email:staff.email,
            password:passwordGen
          },'Xd-7yaYYB3NRIYQAE').then(function(response) {
            console.log('SUCCESS!', response.status, response.text);
         }, function(error) {
            console.log('FAILED...', error);
         });
          Swal.fire({
            title: "Staff created succesfully",
            text: "A new staff has been added",
            icon: "success",
            timer: 4000,
            showConfirmButton: false,
          });
          return { status: 200 };
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
    // navigate("/login");
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

      Swal.fire({
        title: "Staff updated succesfully",
        text: " staff information has been updated",
        icon: "success",
        timer: 4000,
        showConfirmButton: false,
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

  const updatePasswordMethod = async(inputData)=>{
    setIsLoading(true)
    try{
      const user = auth.currentUser;
    
      const credential =  EmailAuthProvider.credential(user?.email,inputData.oldPassword)
     const res = await reauthenticateWithCredential(user,credential);
      console.log(res)
      updatePassword(user,inputData.newPassword).then(()=>{
        
        setErrors({status:false,payload:null})
        setIsLoading(false)
        Swal.fire({
          title:'Action successfully',
          text:'password changed successfully'
        })
      }
      ).catch((err)=>{setErrors({status:true,payload:"input new password failed"});setIsLoading(false)})

    }catch(err){
      setErrors({status:true,payload:"Old password did not match"})
      setIsLoading(false)
    }
    

  }
  
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


  const handleMultipleDelete = async (staffIds) => {
    const batch = writeBatch(db);
    try {

      staffIds.forEach((staff) => {
        batch.delete(doc(db,"staff",staff.id));
       
        let userBills = usersBillings.filter((item) => item.name == staff.name);
        userBills.forEach((bill) => {
          batch.delete(doc(db, "billing", bill?.id));
          
        });
      });

      await batch.commit();

      handleRead();
      handleGetBills();
      Swal.fire({
        title: "Users deleted successfully",
        text: "All the selected users have been removed",
        timer: 4000,
        showConfirmButton: false,
        icon: "success",
      });
    } catch (err) {
      console.log(err);
    }
  };


  const handleDelete = async (row) => {
    try {
      await deleteDoc(doc(db, "staff", row.id));
      const batch = writeBatch(db);
      
      let userBills = usersBillings.filter((item) => item.name == row.name);
      userBills.forEach((bill) => {
        batch.delete(doc(db, "billing", bill?.id));
      });

      const res = await batch.commit();

      handleRead();
      handleGetBills();
      Swal.fire({
        title: "User deleted successfully",
        text: "All the user's bills have been removed",
        timer: 4000,
        showConfirmButton: false,
        icon: "success",
      });
    } catch (err) {
      setErrors({ status: true, payload: err });
    }
  };
  useEffect(() => {
    handleRead();
    setErrors({status:false,payload:""});
    
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
        data.push({ id: item.id, ...item.data() });
      });

      setUsersBillings(data);
    } catch (err) {
      console.log(err);
    }
  };
  const handleDeleteBill = async (id) => {
    try {
      await deleteDoc(doc(db, "billing", id));

      handleGetBills();
      Swal.fire({
        title: "Bill deleted successfully",
        text: `the bill was permanently removed from records`,
        icon: "success",
        showConfirmButton: false,
        timer: 3000,
      });
    } catch (err) {
      setErrors({ status: true, payload: err });
    }
  };

  const handleMultipleDeleteBills = async (bills) => {
    const batch = writeBatch(db);
    try {
      bills.forEach((bill) => {
        batch.delete(doc(db, "billing", bill?.id));
      });

      const res = await batch.commit();
      handleGetBills()
      Swal.fire({
        title: "Bills deleted successfully",
        text: `selected bills were permanently deleted from records`,
        icon: "success",
        showConfirmButton: false,
        timer: 3000,
      });
    } catch (err) {
      console.log("firebase error");
      console.log(err);
    }
  };

  const handleAddBill = async (items) => {
    setIsLoading(true);
    var isPresent = false;
    console.log(typeof items.selectedDate);
    usersBillings.forEach((userBilling) => {
      if (userBilling.name == items.name) {
        let existingDate = new Date(userBilling.billCreatedAt);
        let chosenDate = new Date(items.selectedDate);
        console.log(typeof chosenDate);
        if (existingDate.getMonth() == chosenDate.getMonth()) {
          isPresent = true;
        }
      }
    });
    if (isPresent) {
      setIsLoading(false);
      Swal.fire({
        title: "Action Denied",
        text: "You can add only one bill per month",
        icon: "error",
        timer: 5000,
      });
    } else {
      try {
        await addDoc(collection(db, "billing"), {
          name: items.name,
          item: items.item,
          price: items.price,
          billCreatedAt: items.selectedDate,
          createdAt: serverTimestamp(),
        });
        handleGetBills();
        setIsLoading(false);
        Swal.fire({
          title: "Bill created successfully",
          text: `bill for ${items.name} successfully created`,
          icon: "success",
          showConfirmButton: false,
          timer: 3000,
        });
      } catch (err) {
        console.log(err);
        setIsLoading(false);
      }
    }
  };

  const handleUpdateBill = async (billData) => {
    setIsLoading(true);
    try {
      const docRef = doc(db, "billing", billData.id);

      await updateDoc(docRef, {
        name: billData.name,
        item: billData.item,
        price: billData.price,
        billCreatedAt: billData.billCreatedAt,
        updatedAt: serverTimestamp(),
      });
    } catch (e) {
      setErrors({ status: true, payload: e });
      console.error("Error adding document: ", e);
    }
    setIsLoading(false);

    handleGetBills();
  };

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
        handleUpdateBill,
        handleDeleteAccount,
        handleDeleteBill,
        handleMultipleDelete,
        handleMultipleDeleteBills,
        updatePasswordMethod,
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
