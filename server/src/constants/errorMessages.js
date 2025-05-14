const errorMessages = {
  jwt: {
    invalid_token: "Invalid token",
    expired_token: "Your token has expired!",
    unautorized_access: "Unauthorized: Access is denied",
    access_denied:
      "Access denied: You do not have permission to perform this action",
  },
  otp: {
    validation_error: "Invalid OTP: must be 6 digits.",
    expired: "OTP is expired",
    invalid: "Invalid OTP",

    otp_required_message: "Please request a verification code to continue.",
    activate_message: "Successfully activated account",
    reset_message: "OTP verified successfully",
  },
  activate_account:
    "Your account is not activated yet. Please check your email to verify your account before proceeding.",
  email_required: "Email is required",
  email_not_found: "User with",
  forget_password_message:
    "Instructions to reset your password have been sent successfully.",
  activate_account_message:
    "Instructions to activate your account have been sent successfully.",
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
  project: {
    name: "Project name is required",
    team: "Team is required",
    start_date: "Start date is required",
    end_date: "End date is required",
    createdBy: "Created by is required",
    invalidDateRange: "End date must be later than start date.",
  },
  task: {
    priority: "Select priority of task (high, medium, low)",
    name: "Task name is required",
    dueDate: "Due date is required",
  },
  invite_team_member: {
    invitedUsers: "Invited users is required",
  },
};

export default errorMessages;
