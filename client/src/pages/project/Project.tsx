import React from "react";
import Page_Header from "../../components/ui/header/Page_Header";
import Button from "../../components/ui/button/Button";

const Project = () => {
  return (
    <section className="main_gap">
      <Page_Header page="project" />
      <div className="main_page flex flex-col gap-10 ">
        <header className="flex_center_y justify-end">
          <Button
            // onClick={() => setVisible(true)}
            hasFullWidth={false}
            className="md:min-w-[200px]"
          >
            Add Project
          </Button>
        </header>
      </div>
    </section>
  );
};

export default Project;
