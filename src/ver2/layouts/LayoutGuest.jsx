import React from "react";
import Header from "../components/Header";
import { Outlet } from "react-router";

const LayoutGuest = () => {
  return (
    <>
      <Outlet />
    </>
  );
};

export default LayoutGuest;
