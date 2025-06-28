import mongoose from "mongoose";
import { UserRoles } from "../constants/role";
import { SALT_ROUND } from "../constants/env";
import { compareValue, hashValue } from "../utils/bcrypt";

interface Avatar {
  url: string;
  localPath: string;
}
export interface UserDocument extends mongoose.Document {
  username: string;
  email: string;
  role: UserRoles;
  Avatar: Avatar;
  password: string;
  isEmailVerified: boolean;
  forgotPasswordToken: string;
  forgotPasswordExpiry: Date;
  emailVerificationToken: string;
  emailVerificationExpiry: Date;
  createdAt: Date;
  updatedAt: Date;
  comparePassword(val: string): Promise<boolean>;
  omitPassword(): Pick<
    UserDocument,
    "_id" | "username" | "email" | "role" | "Avatar" | "createdAt"
  >;
}

const userSchema = new mongoose.Schema<UserDocument>(
  {
    username: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      index: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
    },
    Avatar: {
      type: {
        url: String,
        localPath: String,
      },
      default: {
        url: "https://placehold.co/600x400",
        localPath: "",
      },
    },
    isEmailVerified: {
      type: Boolean,
      default: false,
    },
    forgotPasswordToken: {
      type: String,
    },
    forgotPasswordExpiry: {
      type: Date,
    },
    emailVerificationToken: {
      type: String,
    },
    emailVerificationExpiry: {
      type: Date,
    },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await hashValue(this.password, parseInt(SALT_ROUND, 10));
  next();
});

userSchema.methods.comparePassword = async function (val: string) {
  return await compareValue(val, this.password);
};

userSchema.methods.omitPassword = function () {
  const data = this.toObject();
  delete data.password;
  return data;
};

export const UserModel = mongoose.model<UserDocument>("User", userSchema);
