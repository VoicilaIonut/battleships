import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { Routes } from "../../utils/routes-definition";
import "./login.css";
import loginApiCall from "../../services/loginApiCall"


const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const {id , value} = e.target;
    if(id === "email"){
        setEmail(value);
    }
    if(id === "password"){
        setPassword(value);
    }
  }

  const handleSubmit = async (e) =>{
    e.preventDefault();
    let obj = {
            email:email,
            password:password,
        }  
    const response = await loginApiCall(obj);
    if(response.status === 200) {
      navigate(Routes.DashboardRoute);
    }
  }

  return (
    <div
    style={{
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flexDirection: "column",
    }}>
      <h1 className="title">Login page</h1>
      <div className="login">
        <label for="email"><b>Email</b></label>
          <input type="text" placeholder="Enter Email" name="email" id="email" value={email} onChange = {(e) => handleInputChange(e)} required></input>

          <label for="psw"><b>Password</b></label>
          <input type="password" placeholder="Enter Password" name="password" id="password" value={password} onChange = {(e) => handleInputChange(e)} required></input>
          <button type="submit" class="loginbtn" onClick={handleSubmit}>Login</button>
        
      </div>

        {/* <button
          onClick={() => {
            localStorage.setItem(
              "authToken",
              "eyJraWQiOiJDOExGUUlJM0FFQ3N29pg"
            );
            navigate(Routes.DashboardRoute);
          }}
        >
          Login
        </button> */}
        <button
          onClick={() => {
            navigate(Routes.RegisterRoute);
          }}
        >
          Go to Register
        </button>
    </div>
  );
};
export default Login;
