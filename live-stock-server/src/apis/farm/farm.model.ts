import { Farm } from "../../interfaces/farm-interface";
import mongoose from "mongoose";
import commonModelFields from "../common/common.model.fields";
const { Schema, model, Types } = mongoose;

const farmSchema = new Schema<Farm>(
  {
    farmName: {
      type: String,
      required: true,
    },
    animalType: {
      type: [],
      required: true,
    },
    address1: {
      type: String,
      required: true,
    },
    address2: {
      type: String,
    },
    city: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },

    picName: {
      type: String,
      required: true,
    },
    picPhone: {
      type: String,
      required: true,
    },
    picEmail: {
      type: String,
      required: true,
    },
    ...commonModelFields,
  },
  {
    timestamps: true,
  }
);

export default model("Farms", farmSchema, " farms");
