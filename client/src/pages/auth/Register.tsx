import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useForm } from "react-hook-form";
import { emailPattern, passwordPattern } from "../../utils/validation";
import { EmailIcon, KeyIcon, UserIcon } from "../../assets/icons/Icon";
import axiosInstance from "../../servicses/axiosInstance";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import { handleError } from "../../utils/handleErrors";
import Form from "../../components/ui/form/Form";
import Button from "../../components/ui/button/Button";

const Register = () => {
  const navigate = useNavigate();
  const { setToken, setUser } = useAuth();
  const [loading, setLoading] = useState(false);
  // ___________________ use form ____________________
  const {
    control,
    setError,
    reset,
    getValues,
    formState: { errors, dirtyFields, isDirty },
    handleSubmit,
  } = useForm({
    defaultValues: {
      full_name: "",
      email: "",
      password: "",
      confirm_password: "",
    },
    mode: "onChange",
  });
  // ___________________ list ____________________
  const formList = [
    {
      id: 0,
      formType: "input",
      fieldName: "full_name",
      validator: {
        required: "Full name is required",
      },
      label: "Full name",
      placeholder: "Enter your full name",
      type: "text",
      icon: <UserIcon />,
    },
    {
      id: 1,
      formType: "input",
      fieldName: "email",
      validator: {
        required: "Email is required",
        pattern: {
          value: emailPattern,
          message: "Please enter a valid email, e.g., example@domain.com.",
        },
      },
      label: "email",
      placeholder: "email",
      type: "email",
      icon: <EmailIcon />,
    },
    {
      id: 2,
      formType: "password",
      fieldName: "password",
      validator: {
        required: "Password is required",
        pattern: {
          value: passwordPattern,
          message:
            "Password must be 8+ characters, with uppercase, lowercase, a number, and a special character.",
        },
      },
      placeholder: "********",
      label: "password",
      icon: <KeyIcon />,
    },
    {
      id: 3,
      formType: "password",
      fieldName: "confirm_password",
      validator: {
        required: "Confirm password is required",
        validate: (value) => {
          const password = getValues("password");
          return value === password || "Passwords do not match";
        },
      },
      placeholder: "********",
      label: "Confirm password",
      icon: <KeyIcon />,
    },
  ];

  // ___________________ register ____________________

  const onsubmit = async (data) => {
    try {
      setLoading(true);
      const response = await axiosInstance.post("/api/auth/register", data);
      if (response?.status === 201) {
        navigate(`/${data?.email}/active/otp`);
        toast.success("Successfully create account");
      }
    } catch (err) {
      const formFields = ["full_name", "email", "password"];
      handleError(err, setError, formFields);
      // console.log("error", err);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="flex flex-col gap-7">
      <form onSubmit={handleSubmit(onsubmit)} className="flex flex-col gap-6">
        <header className="flex flex-col gap-1">
          <h1 className="text-grey-300 font-bold text-lg lg:text-xl xl:text-2xl">
            Hello!
          </h1>
          <p className="text-grey-300 text-sm">Sign Up to Get Started</p>
        </header>
        <div className="grid gap-4">
          <Form
            formList={formList}
            control={control}
            errors={errors}
            loading={loading}
          />
        </div>
        <footer className="flex items-center flex-col gap-3">
          <Button buttonType="submit" loading={loading}>
            Sign Up{" "}
          </Button>
        </footer>
      </form>
      <p className="text-grey-300 text-xs text-center flex items-center justify-center gap-1">
        Have an account ?<Link to="/">Log in</Link>
      </p>
    </div>
  );
};

export default Register;
