import { useEffect, useState } from "react";
import Button from "../../components/ui/button/Button";
import Page_Header from "../../components/ui/header/Page_Header";
import axiosInstance from "../../servicses/axiosInstance";
import { toast } from "react-toastify";
import useGetData from "../../hooks/useGetData";
import Spinner from "../../components/ui/Spinner";
import Empty from "../../components/ui/empty/Empty";
import { useAuth } from "../../context/AuthContext";

const Invitation = () => {
  const { data, setData, loading } = useGetData("/api/team/invite");

  const { socket } = useAuth();

  useEffect(() => {
    if (!socket) return;

    const handleInvitation = (invitation: any) => {
      setData((prev) => [...prev, invitation]);
    };
    const handleDeleteInvitation = (invitation: any) => {
      setData((prev) =>
        prev.filter((item) => item.invitation_id !== invitation.invitation_id)
      );
    };
    socket.on("invitation:new", handleInvitation);
    socket.on("invitation:delete", handleDeleteInvitation);

    return () => {
      socket.off("invitation:new", handleInvitation);
    };
  }, [socket]);
  return (
    <section className="main_gap min-h-dvh">
      <Page_Header page="invitation" />
      <div className="main_page">
        {loading ? (
          <div className="flex_center">
            <Spinner />
          </div>
        ) : data?.length > 0 ? (
          <div className="flex flex-col gap-3">
            {data?.map((item) => (
              <Invitation_Item
                key={item?.invitation_id}
                invite={item}
                setData={setData}
              />
            ))}
          </div>
        ) : (
          <Empty page="invitation" />
        )}
      </div>
    </section>
  );
};
const Invitation_Item = ({ invite, setData }) => {
  const [loader, setLoader] = useState(false);
  const [status, setStatus] = useState<boolean>(false);
  const updateInvitation = async (data) => {
    try {
      setLoader(true);
      const response = await axiosInstance.patch(
        `/api/team/${invite?.invitation_id}/invite`,
        data
      );
      if (response.status === 200) {
        toast.success(response.data.message);
        setData((pre) =>
          pre.filter(
            (invitation) => invitation.invitation_id !== invite.invitation_id
          )
        );
      }
    } catch (err) {
      toast.error(err.response.data.errors);
    } finally {
      setLoader(false);
    }
  };
  return (
    <div className="bg-white py-6 px-4 sm:p-6 rounded-xl main_shadow flex flex-col sm:flex-row items-start justify-between sm:items-center gap-3">
      <div>
        <h2 className="text-lg font-semibold">{invite.team}</h2>
        <p className="text-sm text-gray-500">
          Invited by {invite.invited_by.full_name} • {invite.date}
        </p>
      </div>
      <div className="flex gap-2">
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
    </div>
  );
};
export default Invitation;
