import { User } from "../../interfaces/user-interface";
import mongoose from "mongoose";
const { Schema, model, Types } = mongoose;

const userSchema = new Schema<User>(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: false,
    },
    roles: {
      type: [Number],
      required: true,
      ref: "Roles",
    },
    isActive: {
      type: Boolean,
      required: true,
      default: true,
    },
    lastLogin: {
      type: Date,
      required: false,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    phone: {
      type: String,
      required: false,
    },
    password: {
      type: String,
      required: true,
    },
    refreshTokens: {
      type: [String],
    },
    createdBy: {
      type: Types.ObjectId,
      ref: "Users",
    },
    updatedBy: {
      type: Types.ObjectId,
      ref: "Users",
    },
  },
  {
    timestamps: true,
  }
);

export default model("Users", userSchema, "users");
