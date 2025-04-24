const errorMessages = {
  jwt: {
    invalid_token: "Invalid token",
    expired_token: "Your token has expired!",
  },
  user_not_found: "User not found.",
  invalid_credentials: "Invalid email or password.",
  unautorized: "You are not authorized to access this resource.",
  task_not_found: "Task does not exist or has been deleted.",
  validation_failed: "Some fields are missing or invalid.",
  server_error: "Something went wrong. Please try again later.",
};

export default errorMessages;
