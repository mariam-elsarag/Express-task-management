import React from "react";
import { Outlet } from "react-router-dom";
import Page_Header from "../../components/ui/header/Page_Header";

const Index = () => {
  return (
    <section className="main_gap">
      <Page_Header page="project" />
      <div className="main_page flex flex-col gap-10 ">
        <Outlet />
      </div>
    </section>
  );
};

export default Index;
