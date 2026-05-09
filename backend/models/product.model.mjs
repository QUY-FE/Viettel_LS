import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
  {
    category: {
      type: String,
      required: true,
      trim: true,
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
    image: {
      type: String,
      default: "",
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
      enum: ["Hoạt Động", "Tạm Ngưng", "Ngừng Kinh Doanh"],
      default: "Hoạt Động",
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default mongoose.model('Product', productSchema);