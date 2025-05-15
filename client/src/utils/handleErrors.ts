import { toast } from "react-toastify";

/**
 * Handles API errors and sets form errors if handlers are provided.
 *
 * @param {any} err - Axios error object or similar.
 * @param {(field: string, error: { type: string; message: string }) => void} [setError] - Optional react-hook-form setError function.
 * @param {string[]} [formFields] - Optional list of fields that are allowed to be set with setError.
 * @returns {Array<{ field?: string, message: string }>}
 */
export const handleError = (err, setError, formFields = []) => {
  const fallbackMessage =
    "An unexpected error occurred. Please try again later.";

  if (!err || !err.response || !err.response.data) {
    toast.error(fallbackMessage);
    return [{ message: fallbackMessage }];
  }

  const data = err.response.data;

  if (typeof data === "string" && data.includes("<!DOCTYPE html>")) {
    toast.error(fallbackMessage);
    return [{ message: fallbackMessage }];
  }

  const errors = data.errors;

  const isSetErrorValid =
    typeof setError === "function" && Array.isArray(formFields);

  if (Array.isArray(errors)) {
    return errors.map((item) => {
      const field = Object.keys(item)[0];
      const message = item[field];

      toast.error(message);

      if (isSetErrorValid && formFields.includes(field)) {
        setError(field, {
          type: "manual",
          message,
        });
      }

      return { field, message };
    });
  }

  if (typeof errors === "object" && errors !== null) {
    return Object.entries(errors).map(([field, message]) => {
      toast.error(message);

      if (isSetErrorValid && formFields.includes(field)) {
        setError(field, {
          type: "manual",
          message,
        });
      }

      return { field, message };
    });
  }

  const message = typeof errors === "string" ? errors : fallbackMessage;
  toast.error(message);
  return [{ message }];
};
