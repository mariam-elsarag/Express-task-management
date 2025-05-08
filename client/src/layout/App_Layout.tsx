import React, { useEffect, useState } from "react";

import { Outlet } from "react-router-dom";
import Sidebar from "../components/ui/sidebar/Sidebar";

const App_Layout = () => {
  const [openSidebar, setOpenSidebar] = useState(false);
  const [hasNotification, setHasNotification] = useState(false);
  return (
    <main className="bg-body p-4 min-h-[100dvh] flex items-start">
      <Sidebar openSidebar={openSidebar} setOpenSidebar={setOpenSidebar} />
      <div
        className={` w-full  md:w-[calc(100%_-_225px)] lg:w-[calc(100%_-_251px)] ms-auto flex flex-col gap-6 `}
      >
        <Outlet
          context={{ setOpenSidebar, hasNotification, setHasNotification }}
        />
      </div>
    </main>
  );
};

export default App_Layout;
