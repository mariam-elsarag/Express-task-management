import React from "react";

interface badgeInterface {
  text: string;
  type?: "primary" | "done" | "error" | "pending" | "hold" | "purple";
}
const Badge: React.FC<badgeInterface> = ({ text, type = "primary" }) => {
  const base = `flex items-center justify-center w-fit text-sm px-2 py-1.5  min-w-[100px] rounded-full`;
  const types = {
    primary: `bg-primary-100 text-primary-500`,
    done: `bg-emerald-100 text-emerald-800`,
    error: `bg-red-100 text-error-800`,
    pending: `bg-[#fff5d1]  text-amber-800 `,
    hold: `bg-grey-100 text-grey-500`,
    purple: `bg-purple-100 text-purple-800`,
  };
  return <span className={`${base} ${types[type]} `}>{text}</span>;
};

export default Badge;
