import React from "react";
import { Outlet } from "react-router-dom";
import Page_Header from "../../components/ui/header/Page_Header";

const Index = () => {
  return (
    <section className="main_gap">
      <Page_Header page="invitation" />
      <Outlet />
    </section>
  );
};

export default Index;
