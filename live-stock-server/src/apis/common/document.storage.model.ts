import mongoose from "mongoose";
const { Schema, model, Types } = mongoose;

const DocumentStorageSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  size: {
    type: Number,
  },
  originalFileName: {
    type: String,
  },
  encoding: {
    type: String,
  },
  mimeType: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    required: true,
  },
  createdBy: {
    type: Types.ObjectId,
    ref: "User",
  },
  updatedBy: {
    type: Types.ObjectId,
    ref: "User",
  },
});

export default model(
  "DocumentStorage",
  DocumentStorageSchema,
  "documentStorage"
);
