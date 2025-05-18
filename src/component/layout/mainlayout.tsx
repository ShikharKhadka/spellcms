import React from "react";
import { Outlet } from "react-router";

export const Mainlayout = () => {
  return (
    <div>
      <div>This is header</div>
      <Outlet />
      <div>This is footer</div>
    </div>
  );
};
