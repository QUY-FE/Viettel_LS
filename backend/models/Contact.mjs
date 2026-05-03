import mongoose from "mongoose";

const contactSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true },
  address: { type: String },
  problem: { type: String, required: true },
  another: { type: String },
}, { timestamps: true });

const Contact = mongoose.model("Contact", contactSchema);

export default Contact;
