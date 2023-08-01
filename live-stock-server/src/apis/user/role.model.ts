import mongoose from "mongoose";
const { Schema, model, Types } = mongoose;

export const roleSchema = new Schema(
  {
    roleId: {
      type: Number,
      required: true,
    },
    roleName: {
      type: String,
      required: true,
    },
    roleLabel: {
      type: String,
      required: true,
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

export default model("Roles", roleSchema, "roles");
