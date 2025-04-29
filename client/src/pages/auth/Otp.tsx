import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import axiosInstance from "../../servicses/axiosInstance";
import Cookies from "js-cookie";
import { handleError } from "../../utils/handleErrors";
import { toast } from "react-toastify";
import Form from "../../components/ui/form/Form";
import Button from "../../components/ui/button/Button";

const Otp = () => {
  const { email, type } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const initialTime = parseInt(Cookies.get("otp_timer") || 60, 10);
  const [remainingTime, setRemainingTime] = useState(initialTime);
  // ___________ useform _________
  const {
    control,
    setError,
    reset,
    formState: { errors, isValid },
    handleSubmit,
  } = useForm({
    defaultValues: {
      email: email,
      otp: "",
    },
    mode: "onChange",
  });
  // verify otp
  const onSubmit = async (data) => {
    try {
      setLoading(true);
      const response = await axiosInstance.post(
        `/api/auth/verify-otp?is_forget=${type == "active" ? false : true}`,
        data
      );
      if (response.status === 200) {
        Cookies.remove("otp_timer");
        toast.success(response.data.message);
        if (type === "active") {
          navigate("/");
        } else {
          navigate(`/${email}/reset-password`);
        }
      }
    } catch (err) {
      console.log(err);
      const formField = ["otp", "email"];
      handleError(err, setError, formField);
      //only if from backend
      // setRemainingTime(0);
    } finally {
      setLoading(false);
    }
  };

  //resend otp
  const reSendOTP = async () => {
    setRemainingTime(600);
    Cookies.set("otp_timer", 600, { expires: 1 / 1440 });
    try {
      const response = await axiosInstance.post("/api/auth/otp", {
        email: email,
      });
    } catch (err) {
      handleError(err, setError, []);
    }
  };

  useEffect(() => {
    if (remainingTime > 0) {
      const timer = setTimeout(() => {
        setRemainingTime((prevTime) => {
          const newTime = prevTime - 1;
          Cookies.set("otp_timer", newTime, { expires: 1 / 1440 });
          return newTime;
        });
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [remainingTime]);
  const renderTime = () => {
    const minutes = Math.floor(remainingTime / 60);
    const seconds = remainingTime % 60;
    return (
      <p role="button" className="flex items-center gap-1">
        <span className="text-primary-950">resend in</span>

        <span className="text-primary-950">
          {`${minutes.toString().padStart(2, "0")}:${seconds
            .toString()
            .padStart(2, "0")}`}
        </span>
      </p>
    );
  };
  // list
  const formList = [
    {
      id: 0,
      formType: "otp",
      fieldName: "otp",
      validator: {
        required: "required_field",
        pattern: {
          value: /^[0-9]+$/,
          message: "must_be_number",
        },
      },
    },
  ];
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-[400px] mx-auto flex flex-col gap-6"
    >
      <header className="flex flex-col gap-3 items-center">
        <h1 className="text-grey-300 font-bold text-lg lg:text-xl xl:text-2xl">
          Verification
        </h1>
        <p className="text-grey-300 text-sm">
          {type === "active"
            ? "Verify account to confirm your email"
            : "Reset password via email"}
        </p>
      </header>
      <p className="text-grey-300 text-sm">
        We will sent a Code to <span className="font-bold">{email}</span> check
        it!
      </p>
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
        <p className="text-sm flex items-center gap-1 text-neutral-400 ">
          <span>didn't recive a code</span>
          {remainingTime === 0 ? (
            <span
              onClick={reSendOTP}
              className="text-primary-950 cursor-pointer "
            >
              resend
            </span>
          ) : (
            renderTime()
          )}
        </p>
      </footer>
    </form>
  );
};

export default Otp;
