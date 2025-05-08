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
import { EyeOn, NotificationWithDot, TrashIcon } from "../../assets/icons/Icon";
import { Tooltip } from "react-tooltip";

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
  const handleMarkAllAsRead = async () => {
    try {
      const response = await axiosInstance.delete("/api/notification/");
      if (response.status === 204) {
        setData((pre) => pre.map((item) => ({ ...item, read: true })));
      }
    } catch (err) {
      toast.error(err.response.data.errors);
    }
  };
  return (
    <section className="main_gap">
      <Page_Header page="notification" />
      <div className="main_page min-h-[80dvh]">
        {data?.length === 0 ? (
          <Empty page="notification" />
        ) : (
          <section className="flex flex-col gap-3">
            <header className="flex_center_y justify-end gap-4 py-2">
              <span
                className="flex_center  cursor-pointer w-8 h-8 border border-grey-100 rounded-lg "
                data-tooltip-id={`unreadNotification`}
                data-tooltip-content="Read all"
                onClick={handleMarkAllAsRead}
              >
                <NotificationWithDot
                  fill="var(--color-grey-200)"
                  width="18"
                  height="18"
                />
                <Tooltip id={`unreadNotification`} place="bottom" />
              </span>
              <span
                className="flex_center  cursor-pointer w-8 h-8 border border-grey-100 rounded-lg "
                data-tooltip-id={`deleteAllNotification`}
                data-tooltip-content="Delete all"
              >
                <TrashIcon
                  fill="var(--color-error-600)"
                  width="18"
                  height="18"
                />
                <Tooltip id={`deleteAllNotification`} place="bottom" />
              </span>
            </header>
            {data?.map((item) => (
              <Notificatin_Item
                setData={setData}
                item={item}
                key={item?.notification_id}
              />
            ))}
          </section>
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
  const handleReadNotifcation = async () => {
    try {
      const response = await axiosInstance.patch(
        `/api/notification/${item?.notification_id}`
      );
      if (response.status === 200) {
        toast.success(response.data.message);
        setData((pre) =>
          pre.map((notification) =>
            notification.notification_id === item.notification_id
              ? { ...notification, read: true }
              : notification
          )
        );
      }
    } catch (err) {
      toast.error(err.response.data.errors);
    }
  };
  return (
    <div
      className={`${
        item?.read ? "" : "bg-gray-50 rounded-lg"
      } p-4  flex items-start justify-between gap-2 border-b border-grey-100 `}
    >
      <div className="flex flex-col gap-2">
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
      <div className="flex_center_y gap-2">
        <span
          onClick={() => {
            if (!item.read) {
              handleReadNotifcation();
            }
          }}
          className={`${
            item.read ? "hidden" : "flex_center"
          } w-6 h-6 border border-grey-200 rounded-lg`}
        >
          <EyeOn width="15" height="15" fill="var(--color-grey-300)" />
        </span>
        <span className="flex_center cursor-pointer w-6 h-6 border border-error-600 rounded-lg">
          <TrashIcon width="15" height="15" fill="var(--color-error-600)" />
        </span>
      </div>
    </div>
  );
};
export default Notification;
