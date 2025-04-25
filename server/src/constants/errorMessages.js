const errorMessages = {
  jwt: {
    invalid_token: "Invalid token",
    expired_token: "Your token has expired!",
    unautorized_access: "Unauthorized: Access is denied",
    access_denied:
      "Access denied: You do not have permission to perform this action",
  },
  invalid_email: "Please enter a valid email ex:example@gmail.com",
  invalid_full_name:
    "Full name must be at least 2 characters long and contain only letters.",
  week_password:
    "Weak password. Password must be at least 8 characters long and include lowercase letters, uppercase letters, and a special character.",
  user_not_found: "User not found.",
  invalid_credentials: "Invalid email or password.",
  task_not_found: "Task does not exist or has been deleted.",
  validation_failed: "Some fields are missing or invalid.",
  server_error: "Something went wrong. Please try again later.",
};

export default errorMessages;
