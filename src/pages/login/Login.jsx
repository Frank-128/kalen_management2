import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAppContext } from "../../UserContext";
import { CircularProgress, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import styles from './login.module.scss';

function Login() {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState({
    status: false,
    email: false,
    password: false,
  });
  const { handleLogin, loggedUser, errors, isLoading } = useAppContext();
  const { register, handleSubmit,getValues } = useForm({
    shouldUseNativeValidation: true,
  });

  const submittedForm = (data) => {
    
    handleLogin(data.email, data.password);
    setErrorMessage({
      status: false,
      email: false,
      password: false,
    });
  };

  return (
    <div className={styles.login}>
      <form
        onSubmit={handleSubmit(submittedForm)}
        className=" bg-slate-50 lg:p-3 p-10 rounded shadow-xl md:w-2/4 xl:w-1/4 h-3/4 xl:h-2/3 flex items-center justify-around flex-col"
      >
        <img src="/kalen.png" className="w-1/2  h-1/6 object-contain" alt="" />
        <span>
          Login to Kalen Technologies Company
        </span>
        <i>
          {errors.status && (
            <span className="text-red-600">Incorrect credentials</span>
          )}
        </i>
        <TextField
          error={errorMessage.status && errorMessage.email !== false}
          label="Email"
          sx={{
            color: "brown",
          }}
          onFocus={()=>{setErrorMessage({...errorMessage,email:false})}}
          type="email"
          required
          className="w-4/5"
          onInvalid={(er) => {
            er.preventDefault();
            setErrorMessage({
              ...errorMessage,
              status: true,
              email: er.target.validationMessage,
            });
          }}
          helperText={errorMessage.email}
          {...register("email")}
        />
        <TextField
          error={errorMessage.status && errorMessage.password !== false}
          label="Password"
          className="w-4/5"
          type="password"
          required
          onFocus={()=>{setErrorMessage({...errorMessage,password:false})}}
          onInvalid={(er) => {
            er.preventDefault();
            setErrorMessage({
              ...errorMessage,
              status: true,
              password: er.target.validationMessage,
            });
          }}
          helperText={errorMessage.password}
          {...register("password", (event) => {
            
          })}
        />

        <button
          className="p-3 bg-blue-950 rounded text-slate-300 w-4/5"
          type="submit"
        >
          {isLoading ? <CircularProgress /> : "Login"}{" "}
        </button>
        <span>
          <i>
            Don't have an account?{" "}
            <Link to="/register" className="text-blue-950">
              register
            </Link>
          </i>
        </span>
      </form>
    </div>
  );
}

export default Login;
