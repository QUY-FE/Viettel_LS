import mongoose from "mongoose";


const userSchema = new mongoose.Schema(
  {
    username:     { type: String, required: true, trim: true },
    password: { type: String, required: true },
    address:  { type: String, required: true, trim: true },
    phone: {type: String , required: true},
    role:     { type: String, enum: ["admin", "user"], default: "user" },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;