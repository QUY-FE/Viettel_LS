import mongoose from "mongoose";

const contactSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    phone: { type: String, required: true },
    address: { type: String, required: true },
    problem: { type: String, required: true },
    another: { type: String },
    status: {
      type: String,
      required: true,
      enum: ["Hoàn thành", "Đã hủy", "Đang chờ xử lý"],
      default: "Đang chờ xử lý",
    },
  },
  { timestamps: true },
);

const Contact = mongoose.model("Contact", contactSchema);

export default Contact;
