import React, { useEffect, useState } from "react";
import Page_Header from "../../components/ui/header/Page_Header";
import Empty from "../../components/ui/empty/Empty";
import usePaginatedData from "../../hooks/usePaginatedData";
import Button from "../../components/ui/button/Button";
import { useAuth } from "../../context/AuthContext";
import { useOutletContext } from "react-router-dom";
import { handleError } from "../../utils/handleErrors";
import { toast } from "react-toastify";
import axiosInstance from "../../servicses/axiosInstance";

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
  console.log(data, "data");
  return (
    <section className="main_gap">
      <Page_Header page="notification" />
      <div className="main_page min-h-[80dvh]">
        {data?.length === 0 ? (
          <Empty page="notification" />
        ) : (
          data?.map((item) => (
            <Notificatin_Item
              setData={setData}
              item={item}
              key={item?.notification_id}
            />
          ))
        )}
      </div>
    </section>
  );
};
const Notificatin_Item = ({ setData, item }) => {
  const [loader, setLoader] = useState(false);
  const [status, setStatus] = useState<boolean>(false);
  const updateInvitation = async (data) => {
    try {
      setLoader(true);
      const response = await axiosInstance.patch(
        `/api/team/${item?.type_id}/invite`,
        data
      );
      if (response.status === 200) {
        toast.success(response.data.message);
        setData((pre) =>
          pre.map((notification) =>
            notification.id === item.id
              ? { ...notification, is_invited: false }
              : notification
          )
        );
      }
    } catch (err) {
      toast.error(err.response.data);
    } finally {
      setLoader(false);
    }
  };
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
          <Button
            onClick={() => {
              setStatus(true);
              updateInvitation({ status: true });
            }}
            loading={loader && status === true}
            disabled={loader && status === false}
            className="max-w-[100px]"
            size="sm"
          >
            Accept{" "}
          </Button>
          <Button
            onClick={() => {
              setStatus(false);
              updateInvitation({ status: "false" });
            }}
            loading={loader && status === false}
            disabled={loader && status === true}
            className="max-w-[100px]"
            size="sm"
            type="outline"
          >
            cancel
          </Button>
        </div>
      )}
    </div>
  );
};
export default Notification;
