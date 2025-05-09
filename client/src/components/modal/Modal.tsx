import { Dialog } from "primereact/dialog";
import React, { ReactNode } from "react";

interface ModalType {
  open: boolean;
  onClose: () => void;
  children?: ReactNode;
  className?: string;
  title?: string;
  hide_close?: boolean;
}

const Modal: React.FC<ModalType> = ({
  open,
  onClose,
  children,
  className = "",
  hide_close = false,
  title = "",
}) => {
  return (
    <Dialog
      visible={open}
      onHide={onClose}
      draggable={false}
      className={`${className} bg-white ${
        hide_close ? "modal_hide_header" : ""
      }  max-w-[95%] w-[642px] modal rounded-lg `}
      header={<h3 className="text-grey-300 capitalize">{title}</h3>}
    >
      <div className={`flex flex-col justify-center items-center`}>
        {children}
      </div>
    </Dialog>
  );
};

export default Modal;
