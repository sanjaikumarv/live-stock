import { Animal } from "../../interfaces/animal-interface";
import mongoose from "mongoose";
import commonModelFields from "../common/common.model.fields";
const { Schema, model, Types } = mongoose;

const animalSchema = new Schema<Animal>(
  {
    name: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    colour: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    animalId: {
      type: String,
      required: true,
    },

    ...commonModelFields,
  },
  {
    timestamps: true,
  }
);
export default model("Animal", animalSchema, "animals");
