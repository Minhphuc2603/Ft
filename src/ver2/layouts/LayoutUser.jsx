import React from "react";
import { Outlet } from "react-router";
import Header from "../components/Header";

const LayoutUser = () => {
  return (
    <>
      <Outlet />
    </>
  );
};

export default LayoutUser;
