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
// Team
const Teams_Container = lazy(() => import("./pages/team/Index"));
const Teams_Details = lazy(() => import("./pages/team/Team_Details"));
const Team = lazy(() => import("./pages/team/Team"));

const Project_Container = lazy(() => import("./pages/project/Index"));
const Project = lazy(() => import("./pages/project/Project"));

const Project_Crud = lazy(() => import("./pages/project/Crud_Project"));
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
            <Route path="project" element={<Project_Container />}>
              <Route index element={<Project />} />

              <Route path="create" element={<Project_Crud />} />
              <Route path=":id/edit" element={<Project_Crud />} />
            </Route>
            <Route path="notification" element={<Notification_Page />} />
            <Route path="invitation" element={<Invitation />} />
            <Route path="teams" element={<Teams_Container />}>
              <Route index element={<Team />} />
              <Route path="details" element={<Teams_Details />} />
            </Route>

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
