import React, { useEffect } from "react";
import { Outlet, redirect, useNavigate } from "react-router";
import Sider from "../sider/sider";

export const Mainlayout = () => {
  const navigate= useNavigate();

  useEffect(() => { 
   const token = localStorage.getItem("token");
    if(token == null){
      navigate("/login");
    }
  }, [])
  return (
    <div className="flex">
      <Sider />
      <Outlet />
    </div>
  );
};
