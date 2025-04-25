import React, { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import { useAuth } from "./context/AuthContext";

const Auth_Layout = lazy(() => import("./layout/Auth_Layout"));
const App_Layout = lazy(() => import("./layout/App_Layout"));

// auth
const Login = lazy(() => import("./pages/auth/Login"));

const App = () => {
  const { token } = useAuth();

  return (
    <Suspense>
      <Routes location={location} key={location.pathname}>
        {token ? (
          <Route path="/" element={<App_Layout />}></Route>
        ) : (
          <Route path="/" element={<Auth_Layout />}>
            <Route index element={<Login />} />
          </Route>
        )}
      </Routes>
    </Suspense>
  );
};

export default App;
