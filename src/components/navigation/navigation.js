import React from 'react';
import { NavLink, useNavigate } from "react-router-dom";
import { Routes } from "../../utils/routes-definition";
import "./navigation.styles.css";


export const Navigation = () => {
  const navigate = useNavigate();

  const handleSignOut =() => {
    localStorage.setItem("accessToken","");
    localStorage.setItem("refreshToken","")
    navigate(Routes.LoginRoute, { replace: true });
  }

  return (
    <nav>
      <h1 onClick={() => navigate(Routes.DashboardRoute)}>LOGO</h1>
      <div className="actions-wrapper">
        <NavLink
          className={({ isActive }) => `link ${isActive ? "active" : ""}`}
          to={Routes.DashboardRoute}
        >
          Home
        </NavLink>
        <NavLink className="link" to={Routes.ProductsRoute}>
          Products
        </NavLink>
        <NavLink className="link" to={Routes.SettingsRoute}>
          Settings
        </NavLink>
        <button
          onClick={handleSignOut}
        >
          Sign out
        </button>
      </div>
    </nav>
  );
};
