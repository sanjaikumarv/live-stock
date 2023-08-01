import mongoose from "mongoose";
import commonModelFields from "../common/common.model.fields";
import { AnimalTest } from "../../interfaces/animal-test-interface";
const { Schema, model, Types } = mongoose;

const animalTestSchema = new Schema<AnimalTest>(
  {
    animalId: {
      type: String,
      required: true,
    },
    testDateTime: {
      type: Date,
      required: true,
    },
    testName: {
      type: String,
      required: true,
    },
    result: {
      type: String,
      required: true,
      enum: ["POSITIVE", "NEGATIVE", "INVALID"],
    },
    ...commonModelFields,
  },
  {
    timestamps: true,
  }
);
export default model("AnimalTest", animalTestSchema, "animalTests");
