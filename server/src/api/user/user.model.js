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
    avatar: String,
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      match: [passwordPattern, errorMessages.week_password],
    },
    password_change_at: Date,
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
  return this.password_change_at.getTime() > jwtTimestamp;
};

const User = mongoose.model("User", userSchema);
export default User;
