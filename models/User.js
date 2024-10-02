import { Schema, model, models } from "mongoose";

const UserSchema = new Schema(
  {
    email: {
      type: String,
      unique: [true, "Email already exists"],
      required: [true, "Email is required"],
    },
    username: {
      type: String,
      required: [true, "Username is required"],
    },
    image: {
      type: String,
    },
    role: {
      type: String,
    },
    password: {
      type: String,
      required: [true, "Pwd is required"],
    },
    displayName: {
      type: String,
      required: [true, "Username is required"],
    },
    verifyToken: {
      type: String,
      required: false,
    }
  },
  {
    timestamps: true,
  },
);

const User = models.User || model("User", UserSchema);

export default User;
