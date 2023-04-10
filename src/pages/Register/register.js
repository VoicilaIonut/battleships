import { useNavigate } from "react-router-dom";
import React, { useState } from 'react';
import { Routes } from "../../utils/routes-definition";
import "./register.css";
import register from "../../services/registerApiCall"

//componenta trebuie sa fie definita exportata in acest fell pentru lazy loading
//https://reactrouter.com/en/main/route/lazy

export const Component = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    e.preventDefault();
    const {id , value} = e.target;
    if(id === "email"){
        setEmail(value);
    }
    if(id === "password"){
        setPassword(value);
    }
  }

  const handleSubmit = (e) =>{
    e.preventDefault();

    let obj = {
            email:email,
            password:password,
        }  
    console.log(obj);
    register(obj);
  }

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
      }}
    >
      <h1 className="title">Register</h1>
      <div className="register">
      <label for="email"><b>Email</b></label>
        <input type="text" placeholder="Enter Email" name="email" id="email" value={email} onChange = {(e) => handleInputChange(e)} required></input>

        <label for="psw"><b>Password</b></label>
        <input type="password" placeholder="Enter Password" name="password" id="password" value={password} onChange = {(e) => handleInputChange(e)} required></input>
        <button type="submit" class="registerbtn" onClick={handleSubmit}>Register</button>
        
      </div>
      <button
        onClick={() => {
          // localStorage.setItem("authToken", "eyJraWQiOiJDOExGUUlJM0FFQ3N29pg");
          navigate(Routes.DashboardRoute);
        }}
      >
        Go to Login
      </button>
    </div>
  );
};

// export default Register;
