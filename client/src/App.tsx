import React, { lazy, Suspense, useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import { useAuth } from "./context/AuthContext";

const Auth_Layout = lazy(() => import("./layout/Auth_Layout"));
const App_Layout = lazy(() => import("./layout/App_Layout"));

// 404
const Not_Found_Page = lazy(() => import("./pages/404/Page_Not_Found"));

// auth
const Login = lazy(() => import("./pages/auth/Login"));
const Register = lazy(() => import("./pages/auth/Register"));
const Otp = lazy(() => import("./pages/auth/Otp"));
const Forget_Password = lazy(() => import("./pages/auth/Forget_Password"));
const Reset_Password = lazy(() => import("./pages/auth/Reset_Password"));

// auth
const Home = lazy(() => import("./pages/home/Home"));
const Project = lazy(() => import("./pages/project/Project"));
const Notification_Page = lazy(
  () => import("./pages/notification/Notification")
);

// invitation
const Invitation = lazy(() => import("./pages/invitation/Invitation"));

const App = () => {
  const { token, user } = useAuth();

  return (
    <Suspense>
      <Routes location={location} key={location.pathname}>
        {token ? (
          <Route path="/" element={<App_Layout />}>
            <Route index element={<Home />} />
            <Route path="project" element={<Project />} />
            <Route path="notification" element={<Notification_Page />} />
            <Route path="invitation" element={<Invitation />} />

            <Route path="*" element={<Not_Found_Page />} />
          </Route>
        ) : (
          <Route path="/" element={<Auth_Layout />}>
            <Route index element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="forget-password" element={<Forget_Password />} />
            <Route path="activate-account" element={<Forget_Password />} />
            <Route path=":email/:type/otp" element={<Otp />} />
            <Route path=":email/reset-password" element={<Reset_Password />} />
            <Route path="*" element={<Login />} />
          </Route>
        )}
      </Routes>
    </Suspense>
  );
};

export default App;
