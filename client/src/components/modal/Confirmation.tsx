import React from "react";
import Modal from "./Modal";
import { TrashIcon, WarningIcon } from "../../assets/icons/Icon";
import Button from "../ui/button/Button";

interface ConfirmationInterface {
  open: boolean;
  onClose: () => void;
  title?: string;
  type?: "delete" | "confirm";
  message?: string;
  className?: string;
  handleClick?: () => void;
  loading?: boolean;
}
const Confirmation: React.FC<ConfirmationInterface> = ({
  open,
  onClose,
  title,
  type = "delete",
  message = "",
  className = "",
  handleClick,
  loading = false,
}) => {
  return (
    <Modal open={open} onClose={onClose} title={title} className={className}>
      <div className="flex flex-col gap-4 items-center text-center w-full">
        <header className="flex flex-col gap-4 items-center text-center">
          <span className="flex_center w-14 h-14 bg-error-600/10 rounded-full ">
            {type === "delete" ? (
              <TrashIcon fill="var(--color-error-600)" width="22" height="22" />
            ) : (
              <WarningIcon />
            )}
          </span>
        </header>
        <p className="text-grey-300">{message}</p>
        <footer className="w-full flex flex-row-reverse items-center gap-4 ">
          <Button
            loading={loading}
            onClick={handleClick}
            size="md"
            type={type === "delete" ? "error" : "primary"}
          >
            {type === "confirm" ? "Continue" : "Delete"}
          </Button>
          <Button onClick={onClose} disabled={loading} size="md" type="outline">
            Cancel
          </Button>
        </footer>
      </div>
    </Modal>
  );
};

export default Confirmation;
