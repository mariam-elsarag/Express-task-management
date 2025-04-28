import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { KeyIcon } from "../../assets/icons/Icon";
import { passwordPattern } from "../../utils/validation";
import Form from "../../components/ui/form/Form";
import Button from "../../components/ui/button/Button";
import { toast } from "react-toastify";
import { handleError } from "../../utils/handleErrors";

const Reset_Password = () => {
  const navigate = useNavigate();
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
    defaultValues: { password: "", confirm_password: "" },
    mode: "onChange",
  });
  // ___________________ list ____________________
  const formList = [
    {
      id: 0,
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

  const onsubmit = async (data) => {
    try {
      setLoading(true);
      const response = await axiosInstance.post("/api/auth/login", data);
      if (response?.status === 200) {
        console.log(response.data);

        navigate("/home");
        toast.success("Successfully Reset password");
      }
    } catch (err) {
      const { message, field } = handleError(err);
      setError(field, {
        type: "manual",
        message,
      });
      // console.log("error", err);
    } finally {
      setLoading(false);
    }
  };
  return (
    <form onSubmit={handleSubmit(onsubmit)} className="flex flex-col gap-6">
      <header className="flex flex-col gap-1">
        <h1 className="text-grey-300 font-bold text-lg lg:text-xl xl:text-2xl">
          Reset Password
        </h1>
        <p className="text-grey-300 text-sm">
          Create a new password for your account.
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
        <Button buttonType="submit" loading={loading}>
          Reset password
        </Button>
      </footer>
    </form>
  );
};

export default Reset_Password;
