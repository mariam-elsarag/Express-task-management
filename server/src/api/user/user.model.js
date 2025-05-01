import mongoose from "mongoose";
import bcrypt from "bcrypt";
// validation
import {
  emailPattern,
  namePattern,
  passwordPattern,
} from "../../validation/pattern.js";
import errorMessages from "../../constants/errorMessages.js";

const userSchema = new mongoose.Schema(
  {
    full_name: {
      type: String,
      required: [true, "Full name is required"],
      match: [namePattern, errorMessages.invalid_full_name],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      match: [emailPattern, errorMessages.invalid_email],
    },
    job_title: {
      type: String,
      default: "",
    },
    avatar: String,
    role: {
      type: String,
      enum: ["admin", "manager", "user"],
      default: "user",
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      match: [passwordPattern, errorMessages.week_password],
    },
    is_active: {
      type: Boolean,
      default: false,
    },
    password_change_at: Date,

    is_forget_password: Boolean,
    otp_code: String,
    otp_expire: Date,
  },
  {
    toJSON: {
      transform: (doc, ret) => {
        ret.user_id = ret._id;
        delete ret._id;
        delete ret.id;
      },
    },
  }
);

userSchema.pre("save", function (next) {
  if (this.email) {
    this.email = this.email.toLowerCase();
  }
  next();
});
// hash password
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

// compare password
userSchema.methods.comparePassword = async function (
  candidatePassword,
  password
) {
  return await bcrypt.compare(candidatePassword, password);
};

// check password change after Iat of jwt
userSchema.methods.isPasswordChangedAfterJwt = function (jwtTimestamp) {
  if (!this.password_change_at) {
    return false;
  }

  return (
    Math.floor(new Date(this.password_change_at).getTime() / 1000) >
    jwtTimestamp
  );
};

// generate otp
userSchema.methods.generateOtp = async function (user, expire = 10) {
  const otpcode = Math.floor(100000 + Math.random() * 900000).toString();
  const hashOtp = await bcrypt.hash(otpcode, 12);
  user.otp_expire = Date.now() + expire * 60 * 1000;
  user.otp_code = hashOtp;
  return otpcode;
};

// check if this otp is right
userSchema.methods.compareOtp = async function (candidateOtp, otp) {
  return await bcrypt.compare(candidateOtp, otp);
};

const User = mongoose.model("User", userSchema);
export default User;
