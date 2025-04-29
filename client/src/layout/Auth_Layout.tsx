import React from "react";
import { Outlet } from "react-router-dom";
import { UnauthLayoutImg } from "../assets/images/Image";

const Auth_Layout = () => {
  return (
    <div className="h-screen flex ">
      <div className="w-full md:w-2/3 lg:w-1/2 flex flex-col px-10 py-5 justify-center">
        <div className="w-[95%] ">
          <Outlet />
        </div>
      </div>
      <figure className="hidden md:flex w-1/3 lg:w-1/2 auth_gradient relative ">
        <img
          src={UnauthLayoutImg}
          className="w-[500px] absolute bottom-0 end-0 "
        />
      </figure>
    </div>
  );
};

export default Auth_Layout;
