import User from "../models/User.mjs";
import bcrypt from "bcrypt";

export const createUser = async (req, res) => {
    try {
        const { name, address, contacts, role, password } = req.body;

        const existingUser = await User.findOne({ 
            $or: [{ "contacts.phone": contacts.phone }, { "contacts.zalo": contacts.zalo }] 
        });
        
        if (existingUser) {
            return res.status(400).json({ message: "Số điện thoại hoặc Zalo đã được sử dụng." });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            name,
            address,
            contacts,
            role,
            password: hashedPassword
        });

        const savedUser = await newUser.save();
        
        const { password: pass, ...userInfo } = savedUser._doc;
        res.status(201).json({ message: "Tạo tài khoản thành công", user: userInfo });

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
            { new: true }
        ).select("-password");

        if (!updatedUser) {
            return res.status(404).json({ message: "Không tìm thấy người dùng để cập nhật." });
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
            return res.status(404).json({ message: "Không tìm thấy người dùng để xóa." });
        }
        res.status(200).json({ message: "Xóa người dùng thành công" });
    } catch (error) {
        res.status(500).json({ message: "Lỗi server", error: error.message });
    }
};