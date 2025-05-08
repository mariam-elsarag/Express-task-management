import React, { useEffect, useState } from "react";

import { Outlet } from "react-router-dom";
import Sidebar from "../components/ui/sidebar/Sidebar";

const App_Layout = () => {
  const [openSidebar, setOpenSidebar] = useState(false);

  return (
    <main className="bg-body p-8 min-h-[100dvh] flex items-start">
      <Sidebar openSidebar={openSidebar} setOpenSidebar={setOpenSidebar} />
      <div
        className={` w-full  md:w-[calc(100%_-_215px)] lg:w-[calc(100%_-_271px)] ms-auto flex flex-col gap-6 `}
      >
        <Outlet />
      </div>
    </main>
  );
};

export default App_Layout;
