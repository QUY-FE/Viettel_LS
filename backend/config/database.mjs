import mongoose from "mongoose";

const connectDatabase = async () => {
  try {
    await mongoose.connect(`${process.env.MONGODB_URI}`);
    console.log("Kết nối cơ sở dữ liệu thành công");
  } catch (error) {
    console.error("Kết nối cơ sở dữ liệu thất bại", error.message);
    process.exit(1);
  }
};

export default connectDatabase;
