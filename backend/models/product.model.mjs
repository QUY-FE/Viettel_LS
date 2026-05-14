import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
  {
    category: {
      type: String,
      required: true,
      enum: ["internet&television", "internet", "television", "mobile"],
      default: "internet",
    },
    nameProduct: {
      type: String,
      required: true,
      trim: true,
    },
    features: [
      {
        type: String,
        trim: true,
      },
    ],
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    description: {
      type: String,
      default: "",
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    totalBuy: {
      type: Number,
      default: 0,
      min: 0,
    },
    totalLike: {
      type: Number,
      default: 0,
      min: 0,
    },
    status: {
      type: String,
      required: true,
      enum: ["Hoạt động", "Tạm ngưng", "Ngừng kinh doanh"],
      default: "Hoạt động",
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default mongoose.model('Product', productSchema);