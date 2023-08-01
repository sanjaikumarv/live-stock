import mongoose, { ObjectId } from "mongoose";
const { Types } = mongoose;

const commonModelFields = {
  deleted: {
    type: Boolean,
    required: true,
    default: false,
  },
  createdBy: {
    type: Types.ObjectId,
    ref: "Users",
  },
  updatedBy: {
    type: Types.ObjectId,
    ref: "Users",
  },
};

export default commonModelFields;
