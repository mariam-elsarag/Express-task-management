import React from "react";
import { Outlet } from "react-router-dom";
import { UnauthLayoutImg } from "../assets/images/Image";

const Auth_Layout = () => {
  return (
    <div className="h-screen flex ">
      <div className="w-1/2">
        <Outlet />
      </div>
      <figure className="w-1/2 auth_gradient relative ">
        <img
          src={UnauthLayoutImg}
          className="w-[500px] absolute bottom-0 end-0 "
        />
      </figure>
    </div>
  );
};

export default Auth_Layout;
