import mongoose from "mongoose";

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
  },
  roleId: {
    type: Schema.Types.ObjectId,
    default: "USER",
    ref: "Role",
  },
});

export default mongoose.model("User", UserSchema);
