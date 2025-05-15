import React, { ReactNode, useState } from "react";
import axiosInstance from "../../servicses/axiosInstance";
import { toast } from "react-toastify";
import { handleError } from "../../utils/handleErrors";

import { Link } from "react-router-dom";
import { EyeOn, TrashIcon } from "../../assets/icons/Icon";
import Confirmation from "../modal/Confirmation";

interface actionInterface {
  hasView?: boolean;
  hasDelete?: boolean;
  disabled?: boolean;
  viewPath?: string;
  children?: ReactNode;
  deleteLink: string;
  confirmPopupMessage: string;
  refetchFn?: () => void;
}

const Action: React.FC<actionInterface> = ({
  hasView = true,
  hasDelete = true,
  disabled = false,
  viewPath,
  confirmPopupMessage = "",
  children,
  deleteLink,
  refetchFn,
}) => {
  const [visibility, setVisibility] = useState(false);
  const [loading, setLoading] = useState(false);
  const handleDelete = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.delete(deleteLink);
      if (response.status === 204) {
        toast.success("Successfully deleted");
        setVisibility(false);
        if (refetchFn) {
          refetchFn();
        }
      }
    } catch (err) {
      handleError(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className={`flex_center gap-2 flex-row-reverse`}>
        {hasView && (
          <Link
            to={viewPath}
            className="flex_center w-6 h-6 rounded-sm border  border-grey-100 cursor-pointer "
          >
            <EyeOn width="18" height="18" />
          </Link>
        )}
        {hasDelete && (
          <span
            onClick={() => {
              if (!disabled) {
                setVisibility(true);
              }
            }}
            className={`flex_center w-6 h-6 rounded-sm border border-grey-100 ${
              disabled ? "cursor-not-allowed" : "cursor-pointer"
            }`}
          >
            <TrashIcon fill="var(--color-error-800)" width="18" height="18" />
          </span>
        )}
        {children}
      </div>
      <Confirmation
        open={visibility}
        onClose={() => {
          setVisibility(false);
        }}
        className="!w-[450px]"
        loading={loading}
        message={confirmPopupMessage}
        handleClick={handleDelete}
      />
    </>
  );
};

export default Action;
