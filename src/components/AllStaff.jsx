import React, { useEffect } from "react";
import { useAppContext } from "../UserContext";
import { useNavigate } from "react-router-dom";
import CountUp from "react-countup";
import { Area, AreaChart, Bar, BarChart, CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import Chart from "./Chart";

function AllStaff() {
  const { users, loggedUser } = useAppContext();
  const graphData = [
    {
      name:"Managers",
      value:users?.filter((item)=>item.role == "manager").length
    },
    {
      name:"Digital Marketing Director",
      value:users?.filter((item)=>item.role == "digital marketing director").length
    },
    {
      name:"Developers",
      value:users?.filter((item)=>item.role == "developer").length
    }
  ]
  const monthlyVisitors = [
    {month:"Jan",visitors:12,projects:3},
    {month:"Feb",visitors:7,projects:3},
    {month:"Mar",visitors:8,projects:5},
    {month:"Apr",visitors:4,projects:7},
    {month:"May",visitors:2,projects:4},
    {month:"Jun",visitors:10,projects:2},   
    {month:"Jul",visitors:7,projects:8},
    {month:"Aug",visitors:10,projects:7},
    {month:"Sept",visitors:10,projects:2},
    {month:"Oct",visitors:10,projects:6},
    {month:"Nov",visitors:6,projects:5},
    {month:"Dec",visitors:3,projects:10},

  ];
  
  
  return (
    <div className="flex   items-center flex-col ">
      <h1 className="font-semibold text-5xl flex justify-start w-full p-2 border-b-2 ">
        Welcome,{loggedUser.name}{" "}
      </h1>
      <div className="flex justify-around w-full  bg-slate-100 py-3">
        <div className="flex flex-col items-center bg-slate-100 rounded shadow-lg w-[12rem] shadow-slate-600 p-4">
          <span> Total Projects</span>
          <span className="text-3xl font-bold">
            {" "}
            <CountUp duration={5} end={100} />
          </span>
        </div>
        <div className="flex flex-col items-center bg-slate-100 rounded shadow-lg w-[12rem] shadow-slate-600 p-4">
          <span> Monthly Visitors</span>
          <span className="text-3xl font-bold">
            {" "}
            <CountUp duration={5} end={42} />
          </span>
        </div>
        <div className="flex flex-col items-center bg-slate-100 rounded shadow-lg w-[12rem] shadow-slate-600 p-4">
          <span> Total Staff</span>
          <span className="text-3xl font-bold">
            {" "}
            <CountUp duration={5} end={8} />
          </span>
        </div>
        <div className="flex flex-col items-center bg-slate-100 rounded shadow-lg w-[12rem] shadow-slate-600 p-4">
          <span> Non-Staff Members</span>
          <span className="text-3xl font-bold">
            {" "}
            <CountUp duration={5} end={3} />
          </span>
        </div>
      </div>
      <div className="h-[30rem] flex gap-2 mt-10 w-full ">
    <div className="w-full basis-1/2 flex-col  h-full flex ">
    <p className="text-center font-light">Kalen Staff</p>
        <ResponsiveContainer width={"100%"} height={"100%"}>

        <BarChart data={graphData} width={400} height={300}>
       
        
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="value" fill="#8884d8" />
         
        </BarChart>
        </ResponsiveContainer>
    </div>
      <div className="basis-1/2">
        <p className="text-center font-light">Monthly Projects done</p>
        <ResponsiveContainer width="100%" height={"100%"}>
          <AreaChart
            width={500}
            height={400}
            data={monthlyVisitors}
            syncId="anyId"
            margin={{
              top: 10,
              right: 30,
              left: 0,
              bottom: 0,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Area type="monotone" dataKey="projects" stroke="#82ca9d" fill="#82ca9d" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
      </div>
    </div>
  );
}

export default AllStaff;
