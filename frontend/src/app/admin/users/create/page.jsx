"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { MdSave, MdArrowBack } from "react-icons/md";
import Link from "next/link";
import axios from "axios";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

const CreateUserPage = () => {
  const route = useRouter();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      username: "",
      phone: "",
      address: "",
      password: "",
      role: "user",
    },
  });

  const onSubmit = async (data) => {
    console.log(data)
    const formattedData = {
      ...data,
    }
    try {
      await axios.post(
        `http://localhost:5000/api/users/create`,
        formattedData,
      );
      toast.success("Nhân viên mới đã được tạo thành công!", {
        position: "top-right",
        autoClose: 800,
        hideProgressBar: false,
      });
      reset();
      route.push("/admin/users");
    } catch (error) {
      console.error("Lỗi khi tạo sản phẩm:", error);
      toast.error("Có lỗi xảy ra, vui lòng kiểm tra console.", {
        position: "top-right",
        autoClose: 800,
        hideProgressBar: false,
      });
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800">
          Thêm Người dùng
        </h1>

        <Link href="/admin/users" className="cst_btn-secondary-icon">
          <MdArrowBack size={20} />
          Quay lại danh sách
        </Link>
      </div>

      <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* LEFT */}
            <div className="space-y-6">
              <h2 className="text-lg font-semibold text-gray-800 border-b pb-2">
                Thông tin cơ bản
              </h2>

              {/* USERNAME */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tên đăng nhập *
                </label>

                <input
                  type="text"
                  {...register("username", {
                    required: "Tên đăng nhập là bắt buộc",
                    minLength: {
                      value: 3,
                      message: "Tên đăng nhập tối thiểu 3 ký tự",
                    },
                  })}
                  className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent ${
                    errors.username
                      ? "border-red-500"
                      : "border-gray-300"
                  }`}
                />

                {errors.username && (
                  <span className="text-red-500 text-xs mt-1 block">
                    {errors.username.message}
                  </span>
                )}
              </div>

              {/* ADDRESS */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Địa chỉ *
                </label>

                <input
                  type="text"
                  {...register("address", {
                    required: "Địa chỉ là bắt buộc",
                  })}
                  className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent ${
                    errors.address
                      ? "border-red-500"
                      : "border-gray-300"
                  }`}
                />

                {errors.address && (
                  <span className="text-red-500 text-xs mt-1 block">
                    {errors.address.message}
                  </span>
                )}
              </div>

              {/* ROLE */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phân quyền
                </label>

                <select
                  {...register("role")}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-white"
                >
                  <option value="user">User</option>
                  <option value="admin">Admin</option>
                </select>
              </div>
            </div>

            {/* RIGHT */}
            <div className="space-y-6">
              <h2 className="text-lg font-semibold text-gray-800 border-b pb-2">
                Thông tin bảo mật
              </h2>

              {/* PHONE */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Số điện thoại *
                </label>

                <input
                  type="text"
                  {...register("phone", {
                    required: "Số điện thoại là bắt buộc",
                    pattern: {
                      value: /^(\+84|0)[3-9]\d{8}$/,
                      message: "Số điện thoại không hợp lệ",
                    },
                  })}
                  className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent ${
                    errors.phone ? "border-red-500" : "border-gray-300"
                  }`}
                />

                {errors.phone && (
                  <span className="text-red-500 text-xs mt-1 block">
                    {errors.phone.message}
                  </span>
                )}
              </div>

              {/* PASSWORD */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Mật khẩu *
                </label>

                <input
                  type="password"
                  {...register("password", {
                    required: "Mật khẩu là bắt buộc",
                    minLength: {
                      value: 6,
                      message: "Mật khẩu tối thiểu 6 ký tự",
                    },
                  })}
                  className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent ${
                    errors.password
                      ? "border-red-500"
                      : "border-gray-300"
                  }`}
                />

                {errors.password && (
                  <span className="text-red-500 text-xs mt-1 block">
                    {errors.password.message}
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* ACTIONS */}
          <div className="flex justify-end gap-4 pt-6 border-t border-gray-100">
            <Link href="/admin/users" className="cst_btn-icon">
              Hủy bỏ
            </Link>

            <button type="submit" className="cst_btn-primary-icon">
              <MdSave size={20} />
              Lưu người dùng
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateUserPage;