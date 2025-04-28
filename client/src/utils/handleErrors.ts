export const handleError = (err) => {
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
      return {
        message,
        field,
      };
    });
  } else {
    return [{ message: "An unexpected error occurred." }];
  }
};
