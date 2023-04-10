import React from 'react';
import { Outlet } from "react-router-dom";
import { Navigation, Footer } from "../../components";

const AppLayout = () => {
  return (
    <div>
      <Navigation />
      <Outlet />
      {/* <Footer /> */}
    </div>
  );
};

export default AppLayout;