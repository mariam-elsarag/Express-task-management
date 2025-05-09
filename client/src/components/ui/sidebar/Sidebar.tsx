import React from "react";
import { useAuth } from "../../../context/AuthContext";
import {
  DashboardIcon,
  FolderIcon,
  GearIcon,
  InvitationIcon,
  LogoutIcon,
  TaskIcon,
  UsersIcon,
} from "../../../assets/icons/Icon";
import { useOutsideClick } from "../../../hooks/useOutsideClick";
import { Link, NavLink } from "react-router-dom";
import { Logo } from "../../../assets/images/Image";
interface sidebarType {
  openSidebar: boolean;
  setOpenSidebar: React.Dispatch<React.SetStateAction<boolean>>;
}
const Sidebar: React.FC<sidebarType> = ({ openSidebar, setOpenSidebar }) => {
  const { user, logout } = useAuth();
  const close = () => {
    setOpenSidebar(false);
  };
  const sidebarRef = useOutsideClick(close);

  const sidebarList = [
    {
      id: 0,
      title: "Overview",
      path: "/",
      icon: <DashboardIcon fill="var(--color-grey-200)" />,
    },
    user.role !== "user" && {
      id: 1,
      title: "Project",
      path: "project",
      icon: <FolderIcon fill="var(--color-grey-200)" />,
    },
    {
      id: 2,
      title: "Task",
      path: "task",
      icon: <TaskIcon fill="var(--color-grey-200)" />,
    },
    user.role !== "user" && {
      id: 3,
      title: "Teams",
      path: "team",
      icon: <UsersIcon fill="var(--color-grey-200)" />,
    },
    user.role === "user" && {
      id: 4,
      title: "Invitations",
      path: "invitation",
      icon: <InvitationIcon fill="var(--color-grey-200)" />,
    },
    {
      id: 5,
      title: "Settings",
      path: "setting",
      icon: <GearIcon fill="var(--color-grey-200)" />,
    },
  ];
  return (
    <div
      className={`mobile_sidebar relative overflow-y-auto ${
        openSidebar ? "open" : ""
      }`}
    >
      <aside
        ref={sidebarRef}
        className={`sidebar fixed  inset-0 py-8 lg:py-6 px-5 lg:px-5 flex flex-col  gap-6   bg-white h-dvh  w-[245px]  md:w-[220px] lg:w-[252px]`}
      >
        <Link
          to={"/"}
          onClick={() => {
            close();
          }}
          className="flex items-center justify-center outline-none shadow-none"
        >
          <img src={Logo} alt="logo" className="w-[60px] object-contain " />
        </Link>
        <div className="flex flex-col justify-between gap-0 sm:gap-3 lg:gap-5 flex-1">
          <ul className="flex flex-col gap-3 nav ">
            {sidebarList.map(
              (item) =>
                item && (
                  <li key={item.id} className="flex_center_y w-full  ">
                    <NavLink
                      className={`flex_center_y w-full gap-3 text-grey-200 rounded-lg px-3 py-2 h-[40px] text-sm`}
                      to={item.path}
                      onClick={() => {
                        close();
                      }}
                    >
                      <span className="flex_center w-4 h-4 icon ">
                        {item?.icon}
                      </span>
                      <span>{item?.title}</span>
                    </NavLink>
                  </li>
                )
            )}
          </ul>
          <footer className=" nav_footer flex flex-col gap-3">
            <Link
              to="/profile"
              className="flex_center_y gap-2 py-2 text-grey-300 px-3 rounded-lg cursor-pointer"
              role="button"
            >
              <img
                src={user.avatar}
                className="w-6 h-6 rounded-full object-cover border border-grey-200"
              />
              <span className=" truncate ">{user.full_name}</span>
            </Link>
            <div
              onClick={logout}
              className="flex_center_y gap-3  px-3 rounded-lg cursor-pointer"
              role="button"
            >
              <span>
                <LogoutIcon />
              </span>
              <span className="text-grey-300">Log out</span>
            </div>
          </footer>
        </div>
      </aside>
    </div>
  );
};

export default Sidebar;
