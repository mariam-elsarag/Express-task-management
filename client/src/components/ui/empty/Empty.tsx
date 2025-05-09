import React, { ReactNode } from "react";
import {
  InvitationIcon,
  NotificationWithLine,
} from "../../../assets/icons/Icon";

interface EmptyType {
  page: string;
}

const Empty: React.FC<EmptyType> = ({ page = "" }) => {
  const handleMessage = () => {
    switch (page) {
      case "notification":
        return {
          message: "No notification yet",
          icon: (
            <NotificationWithLine
              fill="var(--color-grey-200)"
              width="60"
              height="60"
            />
          ),
        };
      case "invitation":
        return {
          message: "No Invitation yet",
          icon: (
            <InvitationIcon
              fill="var(--color-grey-200)"
              width="60"
              height="60"
            />
          ),
        };

      default:
        return "Empty page";
    }
  };
  const { message, icon } = handleMessage();
  return (
    <div className="flex_center min-h-[70vh] flex-col gap-3">
      {icon}
      <p className="text-grey-200 capitalize font-semibold text-lg">
        {message}
      </p>
    </div>
  );
};

export default Empty;
