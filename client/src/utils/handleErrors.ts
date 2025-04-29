import { toast } from "react-toastify";

export const handleError = (err, setError, formFields) => {
  if (!err || !err.response || !err.response.data) {
    return [
      {
        message: "An unexpected error occurred. Please try again later.",
      },
    ];
  }

  const data = err.response.data;

  if (typeof data === "string" && data.includes("<!DOCTYPE html>")) {
    return [
      {
        message: "An unexpected error occurred. Please try again later.",
      },
    ];
  }

  const errors = data.errors;

  if (Array.isArray(errors)) {
    return errors.map((item) => {
      const field = Object.keys(item)[0];
      const message = item[field];
      toast.error(message);
      if (formFields.includes(field)) {
        setError(field, {
          type: "manual",
          message,
        });
      }
    });
  } else if (typeof errors === "object" && !Array.isArray(errors)) {
    console.log(errors, "k");
    for (const [field, message] of Object.entries(errors)) {
      if (formFields.includes(field)) {
        setError(field, {
          type: "manual",
          message,
        });
      }
      toast.error(message);
    }
    return;
  } else {
    toast.error(errors);
  }
};
