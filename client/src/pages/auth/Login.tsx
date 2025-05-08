import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useForm } from "react-hook-form";
import Form from "../../components/ui/form/Form";
import { EmailIcon, KeyIcon } from "../../assets/icons/Icon";
import Button from "../../components/ui/button/Button";
import axiosInstance from "../../servicses/axiosInstance";
import Cookies from "js-cookie";
import { emailPattern } from "../../utils/validation";
import { handleError } from "../../utils/handleErrors";
import { toast } from "react-toastify";

const Login = () => {
  const navigate = useNavigate();
  const { setToken, setUser } = useAuth();
  const [loading, setLoading] = useState(false);
  // ___________________ use form ____________________
  const {
    control,
    setError,
    reset,
    formState: { errors, dirtyFields, isDirty },
    handleSubmit,
  } = useForm({
    defaultValues: { email: "", password: "" },
    mode: "onChange",
  });
  // ___________________ list ____________________
  const formList = [
    {
      id: 0,
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
      id: 1,
      formType: "password",
      fieldName: "password",
      validator: {
        required: "Password is required",
      },
      placeholder: "********",
      label: "password",
      icon: <KeyIcon />,
      hasForgetPassword: true,
    },
  ];

  // ___________________ login ____________________

  const onsubmit = async (data) => {
    try {
      setLoading(true);
      const response = await axiosInstance.post("/api/auth/login", data);
      if (response?.status === 200) {
        setToken(response.data.token);
        Cookies.set("token", response.data.token);
        Cookies.set("avatar", response.data.avatar);
        Cookies.set("full_name", response.data.full_name);
        Cookies.set("role", response.data.role);
        setUser({
          full_name: response.data.full_name,
          avatar: response.data.avatar,
          role: response.data.role,
        });
        navigate("/");
        toast.success("Successfully loged in");
      }
    } catch (err) {
      if (
        err.response.data.errors.includes(
          "Your account is not activated yet. Please check your email to verify your account before proceeding."
        )
      ) {
        navigate(`/${data?.email}/active/otp`);
      }
      // console.log(err);
      const formFields = ["email", "password"];
      handleError(err, setError, formFields);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="flex flex-col gap-16">
      <form onSubmit={handleSubmit(onsubmit)} className="flex flex-col gap-6">
        <header className="flex flex-col gap-1">
          <h1 className="text-grey-300 font-bold text-lg lg:text-xl xl:text-2xl">
            Hello Again!
          </h1>
          <p className="text-grey-300 text-sm">Welcome Back</p>
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
          <Button buttonType="submit">Login</Button>
        </footer>
      </form>
      <p className="text-grey-300 text-xs text-center flex items-center  gap-1">
        Don’t have an account ?<Link to="/register">Sign Up</Link>
      </p>
    </div>
  );
};

export default Login;
