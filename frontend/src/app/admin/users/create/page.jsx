"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { MdSave, MdArrowBack } from "react-icons/md";
import Link from "next/link";

const CreateUserPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      address: "",
      password: "",
      role: "user",
      contacts: {
        phone: "",
        email: "",
        facebook: "",
        zalo: "",
      },
    },
  });

  const onSubmit = (data) => {
    const payload = {
      ...data,
      contacts: {
        ...data.contacts,
        email: data.contacts.email || undefined,
        facebook: data.contacts.facebook || undefined,
      }
    };
    console.log("Payload:", payload);
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800">Thêm Người dùng</h1>
        <Link
          href="/admin/users"
          className="flex items-center gap-2 text-gray-600 hover:text-primary transition-colors font-medium"
        >
          <MdArrowBack size={20} />
          Quay lại danh sách
        </Link>
      </div>

      <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <h2 className="text-lg font-semibold text-gray-800 border-b pb-2">Thông tin cơ bản</h2>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Họ và tên *</label>
                <input
                  type="text"
                  {...register("name", { required: "Họ tên là bắt buộc" })}
                  className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent ${
                    errors.name ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors.name && <span className="text-red-500 text-xs mt-1 block">{errors.name.message}</span>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Địa chỉ *</label>
                <input
                  type="text"
                  {...register("address", { required: "Địa chỉ là bắt buộc" })}
                  className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent ${
                    errors.address ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors.address && <span className="text-red-500 text-xs mt-1 block">{errors.address.message}</span>}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Phân quyền</label>
                  <select
                    {...register("role")}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-white"
                  >
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Mật khẩu *</label>
                  <input
                    type="password"
                    {...register("password", { 
                      required: "Mật khẩu là bắt buộc",
                      minLength: { value: 6, message: "Mật khẩu tối thiểu 6 ký tự" }
                    })}
                    className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent ${
                      errors.password ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                  {errors.password && <span className="text-red-500 text-xs mt-1 block">{errors.password.message}</span>}
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <h2 className="text-lg font-semibold text-gray-800 border-b pb-2">Thông tin liên hệ</h2>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Số điện thoại *</label>
                  <input
                    type="text"
                    {...register("contacts.phone", { 
                      required: "Số điện thoại là bắt buộc",
                      pattern: {
                        value: /^(\+84|0)[3-9]\d{8}$/,
                        message: "Số điện thoại không hợp lệ"
                      }
                    })}
                    className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent ${
                      errors.contacts?.phone ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                  {errors.contacts?.phone && <span className="text-red-500 text-xs mt-1 block">{errors.contacts.phone.message}</span>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Số Zalo *</label>
                  <input
                    type="text"
                    {...register("contacts.zalo", { 
                      required: "Số Zalo là bắt buộc",
                      pattern: {
                        value: /^(\+84|0)[3-9]\d{8}$/,
                        message: "Số Zalo không hợp lệ"
                      }
                    })}
                    className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent ${
                      errors.contacts?.zalo ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                  {errors.contacts?.zalo && <span className="text-red-500 text-xs mt-1 block">{errors.contacts.zalo.message}</span>}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                <input
                  type="email"
                  {...register("contacts.email", {
                    pattern: {
                      value: /^\S+@\S+\.\S+$/,
                      message: "Email không hợp lệ"
                    }
                  })}
                  className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent ${
                    errors.contacts?.email ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors.contacts?.email && <span className="text-red-500 text-xs mt-1 block">{errors.contacts.email.message}</span>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Facebook URL</label>
                <input
                  type="text"
                  {...register("contacts.facebook", {
                    pattern: {
                      value: /^(https?:\/\/)?(www\.)?facebook\.com\/.+$/,
                      message: "Facebook URL không hợp lệ"
                    }
                  })}
                  className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent ${
                    errors.contacts?.facebook ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="https://facebook.com/..."
                />
                {errors.contacts?.facebook && <span className="text-red-500 text-xs mt-1 block">{errors.contacts.facebook.message}</span>}
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-4 pt-6 border-t border-gray-100">
            <Link
              href="/admin/users"
              className="px-6 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors font-medium"
            >
              Hủy bỏ
            </Link>
            <button
              type="submit"
              className="flex items-center gap-2 bg-primary text-white px-6 py-2 rounded-md hover:opacity-90 transition-opacity font-medium focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
            >
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