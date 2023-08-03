import React, { useEffect } from "react";
import { useAppContext } from "../UserContext";

function About() {
    const {username,users,handleRead} = useAppContext();
    useEffect(()=>{
        handleRead()
    },[])
    
  return (
    <div className="w-full flex flex-col  h-full ">
     <p className="p-5">
     The Kalen Staff Management Application offers real-time insights, enabling
      managers to make data-driven decisions to enhance productivity and
      employee satisfaction. Our comprehensive reporting tools provide valuable
      analytics, fostering a deeper understanding of workforce dynamics and
      performance trends.
     </p>
     
    
    </div>
  );
}

export default About;
