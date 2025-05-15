import errorMessages from "../constants/errorMessages.js";
import AppErrors from "../utils/appErrors.js";
import { isValidDate } from "./isValidDate.validate.js";

export const projectValidation = (data, next, isOptional = false) => {
  let validationError = [];
  if (isOptional) {
    if (data.end_date <= data.start_date) {
      validationError.push({
        end_date: errorMessages.project.invalidDateRange,
      });
    }
    if (data.start_date) {
      if (!isValidDate(data.start_date)) {
        validationError.push({
          start_date: errorMessages.project.date,
        });
      }
    }
    if (data.end_date) {
      if (!isValidDate(data.end_date)) {
        validationError.push({
          end_date: errorMessages.project.date,
        });
      }
    }
  } else {
    if (data.end_date <= data.start_date) {
      validationError.push({
        end_date: errorMessages.project.invalidDateRange,
      });
    }
    if (!isValidDate(data.start_date)) {
      validationError.push({
        start_date: errorMessages.project.date,
      });
    }
    if (!isValidDate(data.end_date)) {
      validationError.push({
        end_date: errorMessages.project.date,
      });
    }
  }
  if (validationError?.length > 0) {
    next(new AppErrors(validationError, 400));
    return null;
  }
  return "success";
};
