"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { MdSave, MdArrowBack } from "react-icons/md";
import Link from "next/link";

const CreateProductPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      nameProduct: "",
      slug: "",
      category: "",
      price: "",
      imageUrl: "",
      features: "",
      description: "",
    },
  });

  const onSubmit = (data) => {
    const formattedData = {
      ...data,
      price: Number(data.price),
      features: data.features.split('\n').filter(item => item.trim() !== ''),
      totalBuy: 0,
      totalLike: 0,
    };
    
    console.log("Payload:", formattedData);
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800">Thêm mới Sản phẩm</h1>
        <Link
          href="/admin/products"
          className="flex items-center gap-2 text-gray-600 hover:text-primary transition-colors font-medium"
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
                <label className="block text-sm font-medium text-gray-700 mb-2">Tên sản phẩm</label>
                <input
                  type="text"
                  {...register("nameProduct", { required: "Tên sản phẩm là bắt buộc" })}
                  className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent ${
                    errors.nameProduct ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="VD: METNN_V1"
                />
                {errors.nameProduct && <span className="text-red-500 text-xs mt-1 block">{errors.nameProduct.message}</span>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Hình ảnh (URL)</label>
                <input
                  type="file"
                  {...register("imageUrl")}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md "
                  
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Danh mục</label>
                  <select
                    {...register("category")}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-white"
                  >

                    <option value="">-- Chọn Danh Mục --</option>
                    <option value="internet">Internet</option>
                    <option value="mobile">Di động</option>
                    <option value="tv">Truyền hình</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Giá (VNĐ)</label>
                  <input
                    type="number"
                    {...register("price", { 
                      required: "Giá là bắt buộc",
                      min: { value: 0, message: "Giá không được âm" }
                    })}
                    className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent ${
                      errors.price ? "border-red-500" : "border-gray-300"
                    }`}
                    placeholder="VD: 165000"
                  />
                  {errors.price && <span className="text-red-500 text-xs mt-1 block">{errors.price.message}</span>}
                </div>
              </div>
            </div>

            <div className="space-y-6">
             

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tính năng nổi bật <span className="text-gray-400 font-normal">(Mỗi dòng 1 tính năng)</span>
                </label>
                <textarea
                  {...register("features")}
                  rows="4"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
                  placeholder="Băng thông tối thiểu: 150Mbps&#10;Miễn phí modem Wifi 6"
                ></textarea>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Mô tả chi tiết</label>
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
            <Link
              href="/admin/products"
              className="px-6 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors font-medium"
            >
              Hủy bỏ
            </Link>
            <button
              type="submit"
              className="flex items-center gap-2 bg-primary text-white px-6 py-2 rounded-md hover:opacity-90 transition-opacity font-medium focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
            >
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