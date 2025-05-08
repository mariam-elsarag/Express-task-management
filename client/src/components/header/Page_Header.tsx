import React from "react";
import {
  BurgerIcon,
  DashboardIcon,
  FolderIcon,
  GearIcon,
  NotFoundIcon,
  NotificationIcon,
  TaskIcon,
  UserIcon,
  UsersIcon,
} from "../../assets/icons/Icon";
import { Link, useOutletContext } from "react-router-dom";

const Page_Header = ({ page }) => {
  const { setOpenSidebar, hasNotification } = useOutletContext();

  const headerTitle = () => {
    switch (page) {
      case "overview":
        return {
          title: "Overview",
          icon: <DashboardIcon />,
        };
      case "task":
        return { title: "Task", icon: <TaskIcon /> };
      case "project":
        return { title: "Project", icon: <FolderIcon /> };
      case "teams":
        return { title: "Teams", icon: <UsersIcon /> };
      case "profile":
        return { title: "huts", icon: <UserIcon /> };

      case "settings":
        return {
          title: "settings",
          icon: <GearIcon />,
        };
      case "404":
        return { title: "Not found", icon: <NotFoundIcon /> };
      default:
        return { title: "Overview", icon: <DashboardIcon /> };
    }
  };
  const { title, icon } = headerTitle();
  return (
    <header className="bg-white rounded-xl px-4 py-5 main_shadow flex_center_y gap-4 justify-between">
      {/* right (icon and page title) */}
      <div className="flex_center_y gap-3">
        {icon}
        <h1 className="font-semibold text-grey-300 capitalize">{title}</h1>
      </div>
      {/* left (notification, toggle) */}
      <div className="flex_center_y gap-3">
        <span
          onClick={() => {
            setOpenSidebar(true);
          }}
          className="flex md:hidden cursor-pointer "
        >
          <BurgerIcon />
        </span>
        <Link
          to="/notification"
          className="relative rounded-full w-10 h-10 border border-grey-100 flex_center "
        >
          {hasNotification && (
            <span className="flex_center w-2 h-2 bg-error-600 rounded-full absolute top-[8px] right-[8px] z-10 border border-white" />
          )}
          <NotificationIcon fill="var(--color-grey-200)" />
        </Link>
      </div>
    </header>
  );
};

export default Page_Header;
