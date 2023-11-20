import mongoose from "mongoose";

const Schema = mongoose.Schema;

const RoleSchema = new Schema({
name: {
  type: String,
  enum: ["USER", "ADMIN"],
  default: 'USER',
  required: true
}});

export default mongoose.model("Role", RoleSchema);