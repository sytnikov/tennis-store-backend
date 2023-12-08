import mongoose from "mongoose";

const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
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
      default: "656f2ef56b3ed7947e2f0a11",
      ref: "Role",
    },
    avatar: {
      type: String,
      default: "https://t4.ftcdn.net/jpg/05/49/98/39/360_F_549983970_bRCkYfk0P6PP5fKbMhZMIb07mCJ6esXL.jpg"
    }
  },
  {
    versionKey: false,
  }
);

export default mongoose.model("User", UserSchema);
