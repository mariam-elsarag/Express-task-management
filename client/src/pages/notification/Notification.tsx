import React, { useEffect } from "react";
import Page_Header from "../../components/ui/header/Page_Header";
import Empty from "../../components/ui/empty/Empty";
import usePaginatedData from "../../hooks/usePaginatedData";
import Button from "../../components/ui/button/Button";
import { useAuth } from "../../context/AuthContext";
import { useOutletContext } from "react-router-dom";

const Notification = () => {
  const { setHasNotification, hasNotification } = useOutletContext();
  const { data, handleScroll, setData } =
    usePaginatedData("/api/notification/");
  const { socket } = useAuth();
  useEffect(() => {
    if (!socket) return;
    const handleNotification = (notification: any) => {
      setData((prev) => [notification, ...prev]);
      setHasNotification(true);
    };
    socket.on("notification", handleNotification);

    return () => {
      socket.off("notification", handleNotification);
    };
  }, [socket]);
  return (
    <section className="main_gap">
      <Page_Header page="notification" />
      <div className="main_page min-h-[80dvh]">
        {data?.length === 0 ? (
          <Empty page="notification" />
        ) : (
          data?.map((item) => (
            <Notificatin_Item item={item} key={item?.notification_id} />
          ))
        )}
      </div>
    </section>
  );
};
const Notificatin_Item = ({ item }) => {
  return (
    <div
      className={`${
        item?.read ? "" : "bg-gray-50"
      } p-4 rounded-lg flex flex-col gap-2`}
    >
      <p className={`${item?.read ? "text-grey-200" : "text-grey-300"}`}>
        {item?.message}
      </p>
      {item?.is_invited && (
        <div className="flex_center_y gap-2">
          <Button className="max-w-[100px]" size="sm">
            Accept{" "}
          </Button>
          <Button className="max-w-[100px]" size="sm" type="outline">
            cancel
          </Button>
        </div>
      )}
    </div>
  );
};
export default Notification;
