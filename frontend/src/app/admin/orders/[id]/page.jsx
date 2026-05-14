"use client";

import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";

import { MdSave, MdArrowBack } from "react-icons/md";

import { useParams, useRouter } from "next/navigation";
import { toast } from "react-toastify";

const EditOrderPage = () => {
  const route = useRouter();
  const params = useParams();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      phone: "",
      address: "",
      problem: "",
      another: "",
      status: "Đang chờ xử lý",
    },
  });

  // Lấy chi tiết đơn hàng
  const fetchOrderById = async (id) => {
    const res = await axios.get(
      `http://localhost:5000/api/contacts/view/${id}`,
    );

    return res.data.data;
  };

  // Load dữ liệu
  useEffect(() => {
    const fetchOrderData = async () => {
      if (!params?.id) return;

      try {
        const order = await fetchOrderById(params.id);

        reset({
          name: order.name || "",
          phone: order.phone || "",
          address: order.address || "",
          problem: order.problem || "",
          another: order.another || "",
          status: order.status || "Đang chờ xử lý",
        });
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu đơn hàng:", error);
      }
    };

    fetchOrderData();
  }, [reset, params?.id]);

  // Submit
  const onSubmit = async (data) => {
    try {
      await axios.put(
        `http://localhost:5000/api/contacts/edit/${params.id}`,
        data,
      );

      toast.success("Cập nhật đơn hàng thành công!");

      route.push("/admin/orders");
    } catch (error) {
        console.error(error)
      toast.error("Có lỗi xảy ra khi cập nhật đơn hàng.");
    }
  };

  // Quay lại
  const handleLeave = () => {
    const confirmLeave = confirm(
      "Bạn có chắc muốn rời khỏi trang này? Mọi thay đổi chưa lưu sẽ bị mất.",
    );

    if (confirmLeave) {
      route.push("/admin/orders");
    }
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800">
          Cập nhật Đơn hàng
        </h1>

        <button
          onClick={handleLeave}
          className="cst_btn-secondary-icon"
        >
          <MdArrowBack size={20} />
          Quay lại danh sách
        </button>
      </div>

      {/* Form */}
      <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-6"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Left */}
            <div className="space-y-6">
              {/* Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Họ và tên
                </label>

                <input
                  type="text"
                  {...register("name", {
                    required: "Họ tên là bắt buộc",
                  })}
                  className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent ${
                    errors.name
                      ? "border-red-500"
                      : "border-gray-300"
                  }`}
                />

                {errors.name && (
                  <span className="text-red-500 text-xs mt-1 block">
                    {errors.name.message}
                  </span>
                )}
              </div>

              {/* Phone */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Số điện thoại
                </label>

                <input
                  type="text"
                  {...register("phone", {
                    required: "Số điện thoại là bắt buộc",
                    pattern: {
                      value: /^(0|\+84)[0-9]{9}$/,
                      message: "Số điện thoại không hợp lệ",
                    },
                  })}
                  className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent ${
                    errors.phone
                      ? "border-red-500"
                      : "border-gray-300"
                  }`}
                />

                {errors.phone && (
                  <span className="text-red-500 text-xs mt-1 block">
                    {errors.phone.message}
                  </span>
                )}
              </div>

              {/* Address */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Địa chỉ
                </label>

                <textarea
                  rows="4"
                  {...register("address", {
                    required: "Địa chỉ là bắt buộc",
                  })}
                  className={`w-full px-4 py-2 border rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent ${
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
            </div>

            {/* Right */}
            <div className="space-y-6">
              {/* Problem */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Vấn đề khách hàng
                </label>

                <input
                  type="text"
                  {...register("problem", {
                    required: "Vấn đề là bắt buộc",
                  })}
                  className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent ${
                    errors.problem
                      ? "border-red-500"
                      : "border-gray-300"
                  }`}
                />

                {errors.problem && (
                  <span className="text-red-500 text-xs mt-1 block">
                    {errors.problem.message}
                  </span>
                )}
              </div>

              {/* Status */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Trạng thái
                </label>

                <select
                  {...register("status")}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-white"
                >
                  <option value="Đang xử lý">
                    Đang xử lý
                  </option>

                  <option value="Hoàn thành">
                    Hoàn thành
                  </option>

                  <option value="Đã hủy">
                    Đã hủy
                  </option>
                </select>
              </div>

              {/* Another */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Ghi chú thêm
                </label>

                <textarea
                  rows="5"
                  {...register("another")}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>
            </div>
          </div>

          {/* Action */}
          <div className="flex justify-end gap-4 pt-4 border-t border-gray-100">
            <button
              type="submit"
              className="cst_btn-primary-icon"
            >
              <MdSave size={20} />
              Cập nhật
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditOrderPage;