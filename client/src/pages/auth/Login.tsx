import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useForm } from "react-hook-form";
import Form from "../../components/ui/form/Form";
import { EmailIcon, KeyIcon } from "../../assets/icons/Icon";
import Button from "../../components/ui/button/Button";

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
          value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
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
    },
  ];

  // ___________________ login ____________________

  const onsubmit = async (data) => {
    try {
      setLoading(true);
      const response = await axiosInstance.post("/api/auth/login", data);
      if (response?.status === 200) {
        console.log(response.data);
        setToken(response.data.token);
        Cookies.set("token", response.data.token);
        Cookies.set("avatar", response.data.avatar);
        Cookies.set("full_name", response.data.full_name);
        setUser({
          full_name: response.data.full_name,
          avatar: response.data.avatar,
        });
        navigate("/home");
        toast.success("Successfully loged in");
      }
    } catch (err) {
      if (err?.response?.data?.errors?.length > 1) {
        setError("email", {
          type: "manual",
          message: "Wrong credentials",
        });
        setError("password", {
          type: "manual",
          message: "Wrong credentials",
        });
        // toast.error("Wrong credentials");
      } else if (err?.response?.data?.errors?.includes("Invalid email")) {
        setError("email", {
          type: "manual",
          message: "Email is not valid",
        });
      } else {
        setError("email", {
          type: "manual",
          message: "Wrong credentials",
        });
        setError("password", {
          type: "manual",
          message: "Wrong credentials",
        });
        // toast.error("Wrong credentials");
      }

      // console.log("error", err);
    } finally {
      setLoading(false);
    }
  };
  return (
    <form>
      <div className="grid gap-4">
        <Form
          formList={formList}
          control={control}
          errors={errors}
          loading={loading}
        />
      </div>
      <Button>kk</Button>
    </form>
  );
};

export default Login;
