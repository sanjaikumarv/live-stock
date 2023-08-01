import mongoose from "../../config/database";
const { Schema, model } = mongoose;

// const actionSchema = new Schema({
//   type: {
//     type: String,
//     conditions: [Schema.Types.Mixed],
//   },
// });

const permsSchema = new Schema({
  subject: { type: String, required: true },
  actions: [Schema.Types.Mixed],
});

const permissionSchema = new Schema(
  {
    roleId: {
      type: Number,
      enum: [1, 2, 3, 4],
      required: true,
    },
    perms: [permsSchema],
  },
  {
    timestamps: true,
  }
);

export default model("Permissions", permissionSchema, "permissions");
