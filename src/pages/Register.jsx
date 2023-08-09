import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAppContext } from "../UserContext";
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
import { useForm } from "react-hook-form";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [address, setAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [bio, setBio] = useState("");
  const [gender, setGender] = useState("");
  const [role, setRole] = useState("manager");
  const { register, handleSubmit } = useForm({
    shouldUseNativeValidation: true,
  });
  const { handleCreate, isLoading } = useAppContext();
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
  const handleSubmitData = async (inputData) => {
    if (inputData.password !== inputData.confirm_password)
      return setErr({
        ...err,
        confirm_password: "Password and confirm password does not match",
      });
    const data = {
      name: inputData.name,
      email: inputData.email,
      password: inputData.password,
      address: inputData.address,
      phoneNumber: inputData.phoneNumber,
     
      gender: inputData.gender,
      role: inputData.role,
    };
    console.log(data)
    await handleCreate(data);
  };
  return (
    <div className="flex justify-center items-center py-5 md:h-screen overflow-y-scroll w-screen bg-backG">
      <form
        onSubmit={handleSubmit(handleSubmitData)}
        className=" bg-slate-50 p-3 rounded shadow-xl lg:w-2/3 xl:w-1/3 lg:mt-20 w-fit h-fit  flex items-center flex-col"
      >
        <p>
          <strong className="text-sm md:text-lg">
            <i>Register to Kalen Technologies Company</i>
          </strong>
        </p>
        <div className="flex flex-col lg:flex-ruow p-2 w-full justify-between gap-2">
          <TextField
            error={err.status && err.name !== false}
            helperText={err.name}
            onInvalid={(e) => {
              e.preventDefault();
              setErr({
                ...err,
                name: e.target.validationMessage,
                status: true,
              });
            }}
            onFocus={() => {
              setErr({ ...err, name: false });
            }}
            label="Name"
            required
            className="w-full "
            {...register("name")}
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
            onFocus={() => {
              setErr({ ...err, email: false });
            }}
            label="Email"
            required
            className="w-full"
            {...register("email")}
          />
        </div>
        <div className="flex p-2 gap-2 flex-col md:flex-ruow  w-full justify-between ">
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
            onFocus={() => {
              setErr({ ...err, address: false });
            }}
            onChange={() => {
                setErr({ ...err, address: false });
              }}
            label="Address"
            required
            className="w-full"
            {...register("address")}
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
            label="Phone Number"
            type="number"
            required
            className="w-full"
            {...register("phoneNumber")}
          />
        </div>
        <div className="flex gap-2 p-2 flex-col md:flex-ruow w-full items-center justify-between ">
          <FormControl
            className=" w-full"
            error={err.status && err.role !== false}
          >
            <InputLabel id="role">Role</InputLabel>
            <Select
              label="Role"
              id="role"
              required
             {...register('role')}
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
              <MenuItem value="digital marketing director">
                Digital Marketing Director
              </MenuItem>
              <MenuItem value="developer">Developer</MenuItem>
            </Select>
            <FormHelperText>{err.role}</FormHelperText>
          </FormControl>

          <div className="flex items-start justify-start  w-full">
            <FormControl>
              <FormLabel>Gender</FormLabel>
              <RadioGroup row defaultValue="male">
                <FormControlLabel
                  control={<Radio />}
                  value="male"
                  label="Male"
                  {...register('gender')}
                />
                <FormControlLabel
                  control={<Radio />}
                  value="female"
                  label="Female"
                  {...register('gender')}
                />
              </RadioGroup>
            </FormControl>
          </div>
        </div>
        <div className="p-2 w-full">
         
        </div>

        <div className="flex  w-full gap-3 p-2 flex-col md:flex-ruow justify-between ">
          <TextField
            error={err.status && err.password !== false}
            helperText={err.password}
            onInvalid={(e) => {
              e.preventDefault();
              setErr({
                ...err,
                password: e.target.validationMessage,
                status: true,
              });
            }}
            onFocus={() => {
              setErr({ ...err, password: false });
            }}
            required
            label="Password"
            type="password"
            {...register("password")}
            className='w-full'
          />
          <TextField
            error={err.status && err.confirm_password !== false}
            onInvalid={(e) => {
              e.preventDefault();
              setErr({
                ...err,
                confirm_password: e.target.validationMessage,
                status: true,
              });
            }}
            onFocus={() => {
              setErr({ ...err, confirm_password: false });
            }}
            label="Confirm Password"
            required
            type="password"
            {...register("confirm_password")}
            helperText={err.confirm_password}
            className='w-full'
          />
        </div>

        <button
          className="p-3 m-5 bg-blue-950 rounded text-slate-300 w-full"
          type="submit"
        >
          {isLoading ? <CircularProgress /> : "Register"}
        </button>
        <span>
          <i>
            Already have an account?{" "}
            <Link to="/login" className="text-blue-950">
              login
            </Link>
          </i>
        </span>
      </form>
    </div>
  );
}

export default Register;
