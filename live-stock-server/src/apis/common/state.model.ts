import mongoose from "mongoose";
import commonModelFields from "./common.model.fields";
const { Schema, model, Types } = mongoose;

const citySchema = new Schema(
  {
    label: {
      type: String,
      required: true,
    },
    value: {
      type: Number,
      required: true,
    },
    ...commonModelFields,
  },
  {
    timestamps: true,
  }
);

const stateSchema = new Schema(
  {
    label: {
      type: String,
      required: true,
    },
    value: {
      type: Number,
      required: true,
    },
    cities: {
      type: [citySchema],
      required: true,
    },
    ...commonModelFields,
  },
  {
    timestamps: true,
  }
);

export default model("State", stateSchema, "states");
