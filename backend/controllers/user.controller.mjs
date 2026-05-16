import User from "../models/user.model.mjs";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const adminLogin = async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Tài khoản không tồn tại",
      });
    }

    // check role admin
    if (user.role !== "admin") {
      return res.status(401).json({
        success: false,
        message: "Không có quyền admin",
      });
    }

    const token = jwt.sign(
      {
        id: user._id,
        username: user.username,
        role: user.role,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1h" },
    );

    // compare password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Sai mật khẩu",
      });
    }

    return res.status(200).json({
      message: "Đăng nhập thành công",
      token,
      username: user.username,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Lỗi server",
    });
  }
};

export const createUser = async (req, res) => {
  try {
    const { username, address, phone, role, password } = req.body;

    const existingUser = await User.findOne({
      $or: [{ username: username }, { phone: phone }],
    });

    if (existingUser) {
      return res
        .status(400)
        .json({ message: "Username hoặc số điện thoại đã được sử dụng." });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      username,
      address,
      phone,
      role,
      password: hashedPassword,
    });

    const savedUser = await newUser.save();

    const { password: pass, ...userInfo } = savedUser._doc;
    res
      .status(201)
      .json({ message: "Tạo tài khoản thành công", user: userInfo });
  } catch (error) {
    res.status(500).json({ message: "Lỗi server", error: error.message });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Lỗi server", error: error.message });
  }
};

export const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");
    if (!user) {
      return res.status(404).json({ message: "Không tìm thấy người dùng." });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Lỗi server", error: error.message });
  }
};

export const updateUser = async (req, res) => {
  try {
    const updateData = req.body;

    if (updateData.password) {
      const salt = await bcrypt.genSalt(10);
      updateData.password = await bcrypt.hash(updateData.password, salt);
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { $set: updateData },
      { new: true },
    ).select("-password");

    if (!updatedUser) {
      return res
        .status(404)
        .json({ message: "Không tìm thấy người dùng để cập nhật." });
    }

    res.status(200).json({ message: "Cập nhật thành công", user: updatedUser });
  } catch (error) {
    res.status(500).json({ message: "Lỗi server", error: error.message });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (!deletedUser) {
      return res
        .status(404)
        .json({ message: "Không tìm thấy người dùng để xóa." });
    }
    res.status(200).json({ message: "Xóa người dùng thành công" });
  } catch (error) {
    res.status(500).json({ message: "Lỗi server", error: error.message });
  }
};
