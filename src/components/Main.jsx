import React, { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useAppContext } from "../UserContext";
import { Close, Logout, Menu, Person } from "@mui/icons-material";
import Popup from "reactjs-popup";

function Main() {
  const { loggedUser, logout, sidebar, setSidebar } = useAppContext();
  const [toggleContainer, setToggleContainer] = useState(false);

  const navigate = useNavigate();
  window.addEventListener("click", (e) => {
    if (!e.target.classList.contains("avatar")) {
      setToggleContainer(false);
    }
  });
  return (
    <div className="md:basis-3/4 bg-white">
      <div className=" top-0 bg-backG2 text-center w-screen sm:w-full flex  p-12 md:px-24 px-2 h-12 justify-between items-center border-slate-400 border-b-2">
        <div>
          <span className="md:hidden p-3" onClick={() => setSidebar(!sidebar)}>
            {sidebar ? <Close /> : <Menu />}
          </span>
        </div>
        <h3 className="text-slate-200 text-sm md:text-lg xl:text-2xl p-3">
          Kalen Technologies Solutions
        </h3>
        <Popup
          trigger={
           <span className=" flex  p-full items-center gap-2 p-3">
              <h1 className="font-bold text-slate-50 hidden md:block">{loggedUser.name}</h1>
              <img
                onClick={() => setToggleContainer(true)}
                src={
                  loggedUser.gender == "female" ? "/female.png" : "/male.png"
                }
                className="w-12 avatar h-12 object-cover rounded-full"
                alt=""
              />
            </span>
          }
          position="left bottom"
          open={toggleContainer}
        >
          <div
           
            className="absolute z-50  bg-slate-300 "
          >
            <ul className=" md:w-36">
              <li
                onClick={() =>{ navigate(`/profile/${loggedUser.id}`);setToggleContainer(false)}}
                className=" border-slate-500 border-b-2 p-3 cursor-pointer "
              >
                <Person /> <span>Profile</span>{" "}
              </li>
              <li
                onClick={logout}
                className=" border-slate-500 border-b-2 p-3 cursor-pointer"
              >
                <Logout /> <span>Logout</span>
              </li>
            </ul>
          </div>
        </Popup>
      </div>
      

      <Outlet />
    </div>
  );
}

export default Main;
