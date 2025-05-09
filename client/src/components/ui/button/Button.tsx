import React from "react";
import { Link } from "react-router-dom";
import Spinner from "../Spinner";

interface buttonPropsType {
  children: React.ReactNode;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  to?: string;
  type?: "primary" | "error" | "outline";
  buttonType?: "button" | "submit" | "reset";
  disabled?: boolean;
  loading?: boolean;
  className?: string;
  target?: "_blank" | "_self" | "_parent" | "_top";
  round?: "lg" | "full";
  size?: "lg" | "md" | "sm";
}

const Button: React.FC<buttonPropsType> = ({
  children,
  onClick,
  to,
  type = "primary",
  buttonType = "submit",
  disabled,
  loading,
  className,
  target,
  round = "lg",
  size = "lg",
}) => {
  const radious = {
    lg: "rounded-lg",
    full: "rounded-full",
  };
  const sizes = {
    lg: "h-[48px] text-base ",
    sm: "h-[38px] text-sm ",
    md: "h-[40px] text-sm ",
  };
  const base = ` ${radious[round]} ${
    sizes[size]
  } outline-none  w-full  font-normal  flex items-center justify-center gap-2  px-4  transation-all ease-in-out duration-300 ${
    disabled || loading ? "cursor-not-allowed" : "cursor-pointer"
  }`;
  const styles = {
    primary: `${base} border-primary-500 bg-primary-500 text-white hover:bg-primary-700 `,
    outline: `${base} border border-grey-200 text-grey-300 hover:bg-grey-50 `,
    error: `${base} bg-error-700 hover:bg-error-600 text-white`,
  };
  if (to)
    return (
      <Link to={to} target={target} className={`${styles[type]} ${className}`}>
        {children}
      </Link>
    );
  return (
    <button
      disabled={disabled || loading}
      onClick={onClick}
      type={buttonType}
      className={`${styles[type]} ${className}`}
    >
      {children}
      {loading && (
        <Spinner
          className={`${type === "error" ? "!fill-error-800 !w-4 !h-4" : ""}`}
        />
      )}
    </button>
  );
};

export default Button;
