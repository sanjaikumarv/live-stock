import mongoose from "mongoose";
const { Schema, model } = mongoose;

const otpSchema = new Schema(
  {
    number: {
      type: String,
      required: true,
    },
    otp: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      index: { expires: 300 },
    },
  },
  {
    timestamps: true,
  }
);

export default model("Otp", otpSchema, "otp");
