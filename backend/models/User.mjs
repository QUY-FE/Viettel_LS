import mongoose from "mongoose";

const contactsSchema = new mongoose.Schema(
  {
    phone: {
      type: String,
      required: true,
      trim: true,
      match: [/^(\+84|0)[3-9]\d{8}$/, "Số điện thoại không hợp lệ"],
    },
    // email: {
    //   type: String,
    //   trim: true,
    //   lowercase: true,
    //   match: [/^\S+@\S+\.\S+$/, "Email không hợp lệ"],
    // },
    // facebook: {
    //   type: String,
    //   trim: true,
    //   match: [/^(https?:\/\/)?(www\.)?facebook\.com\/.+$/, "Facebook URL không hợp lệ"],
    // },
    zalo: {
      type: String,
      required: true,
      trim: true,
      match: [/^(\+84|0)[3-9]\d{8}$/, "Số Zalo không hợp lệ"],
    },
  },
  { _id: false } // ← Không tạo _id thừa cho subdocument
);

const userSchema = new mongoose.Schema(
  {
    name:     { type: String, required: true, trim: true },
    address:  { type: String, required: true, trim: true },
    contacts: { type: contactsSchema, required: true },
    role:     { type: String, enum: ["admin", "user"], default: "user" },
    password: { type: String, required: true },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;