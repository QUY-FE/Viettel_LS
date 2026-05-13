"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { MdSave, MdArrowBack } from "react-icons/md";
import Link from "next/link";
import axios from "axios";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

const CreateProductPage = () => {
  const route = useRouter();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      nameProduct: "",
      category: "",
      price: "",
      features: "",
      description: "",
      status: "",
    },
  });

  const onSubmit = async (data) => {
    const formattedData = {
      ...data,
      slug: `goi-internet-${data.nameProduct.toLowerCase().replace(/\s+/g, "-")}`,
      features: data.features.split("\n").filter((item) => item.trim() !== ""),
      price: Number(data.price),
      totalBuy: 0,
      totalLike: 0,
    };
    try {
      await axios.post(
        `http://localhost:5000/api/products/create-product`,
        formattedData,
      );
      toast.success("Sản phẩm mới đã được tạo thành công!", {
        position: "top-right",
        autoClose: 800,
        hideProgressBar: false,
      });
      reset();
      route.push("/admin/products");
    } catch (error) {
      console.error("Lỗi khi tạo sản phẩm:", error);
      toast.error("Có lỗi xảy ra, vui lòng kiểm tra console.", {
        position: "top-right",
        autoClose: 800,
        hideProgressBar: false,
      });
    }
  };

  const handleLeave = () => {
    const confirmLeave = confirm(
      "Bạn có chắc muốn rời khỏi trang này? Mọi thay đổi chưa lưu sẽ bị mất.",
    );

    if (confirmLeave) {
      route.push("/admin/products");
    }
    return;
  };
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800">Thêm mới Sản phẩm</h1>
        <Link
          href="/admin/products"
          onClick={handleLeave}
          className="cst_btn-secondary-icon"
        >
          <MdArrowBack size={20} />
          Quay lại danh sách
        </Link>
      </div>

      <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tên sản phẩm
                </label>
                <input
                  type="text"
                  {...register("nameProduct", {
                    required: "Bạn chưa nhập tên sản phẩm !",
                  })}
                  className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent ${
                    errors.nameProduct ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="VD: METNN_V1"
                />
                {errors.nameProduct && (
                  <span className="text-red-500 text-xs mt-1 block">
                    {errors.nameProduct.message}
                  </span>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Danh mục
                  </label>
                  <select
                    {...register("category", {
                      required: "Chọn phân loại cho sản phẩm !",
                    })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-white"
                  >
                    <option value="">-- Chọn Danh Mục --</option>
                    <option value="internet">Internet</option>
                    <option value="mobile">Di động</option>
                    <option value="television">Truyền hình</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Trạng thái
                  </label>
                  <select
                    {...register("status", {
                      required: "Chọn trạng thái cho sản phẩm !",
                    })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-white"
                  >
                    <option value="">-- Chọn Trạng Thái --</option>
                    <option value="Hoạt động">Hoạt động</option>
                    <option value="Tạm ngưng">Tạm ngưng</option>
                    <option value="Ngừng kinh doanh">Ngừng kinh doanh</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Giá (VNĐ)
                  </label>
                  <input
                    type="text"
                    {...register("price", {
                      required: "Bạn chưa nhập giá sản phẩm !",
                      min: { value: 0, message: "Giá không được âm" },
                    })}
                    className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent ${
                      errors.price ? "border-red-500" : "border-gray-300"
                    }`}
                    placeholder="VD: 165000"
                  />
                  {errors.price && (
                    <span className="text-red-500 text-xs mt-1 block">
                      {errors.price.message}
                    </span>
                  )}
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tính năng nổi bật{" "}
                  <span className="text-gray-400 font-normal">
                    (Mỗi dòng 1 tính năng)
                  </span>
                </label>
                <textarea
                  {...register("features")}
                  rows="4"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
                  placeholder="Băng thông tối thiểu: 150Mbps&#10;Miễn phí modem Wifi 6"
                ></textarea>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Mô tả chi tiết
                </label>
                <textarea
                  {...register("description")}
                  rows="4"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
                  placeholder="Nhập mô tả sản phẩm..."
                ></textarea>
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-4 pt-4 border-t border-gray-100">
            <button  onClick={handleLeave} className="cst_btn">
              Hủy bỏ
            </button>
            <button type="submit" className="cst_btn-primary-icon">
              <MdSave size={20} />
              Lưu sản phẩm
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateProductPage;
