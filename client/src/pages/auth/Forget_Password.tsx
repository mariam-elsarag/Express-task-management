import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { emailPattern } from "../../utils/validation";
import { EmailIcon } from "../../assets/icons/Icon";
import { useForm } from "react-hook-form";
import { handleError } from "../../utils/handleErrors";
import axiosInstance from "../../servicses/axiosInstance";
import Form from "../../components/ui/form/Form";
import Button from "../../components/ui/button/Button";

const Forget_Password = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const title = location.pathname.includes("forget-password")
    ? "Forget Password"
    : "Activate account";
  // ___________________ use form ____________________
  const {
    control,
    setError,
    reset,
    formState: { errors, dirtyFields, isDirty },
    handleSubmit,
  } = useForm({
    defaultValues: { email: "" },
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
  ];

  const onsubmit = async (data) => {
    try {
      setLoading(true);
      const response = await axiosInstance.post(
        "/api/auth/otp?is_forget=true",
        data
      );
      if (response?.status === 200) {
        navigate(`/${data?.email}/forget/otp`);
      }
    } catch (err) {
      handleError(err, setError, ["email"]);

      // console.log("error", err);
    } finally {
      setLoading(false);
    }
  };
  return (
    <form onSubmit={handleSubmit(onsubmit)} className=" flex flex-col gap-6">
      <header className="flex flex-col gap-1">
        <h1 className="text-grey-300 font-bold text-lg lg:text-xl xl:text-2xl">
          {title}
        </h1>
        <p className="text-grey-300 text-sm">
          Enter your email, and we'll send you a code.
        </p>
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
        <Button loading={loading} buttonType="submit">
          Send OTP
        </Button>
      </footer>
    </form>
  );
};

export default Forget_Password;
