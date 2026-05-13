"use client";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { MdSave, MdArrowBack } from "react-icons/md";
import { useParams, useRouter } from "next/navigation";
import { toast } from "react-toastify";
const EditProductPage = () => {
  const route = useRouter();
  const params = useParams();

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
      status: "",
      features: "",
      description: "",
    },
  });
  // Lấy chi tiết sản phẩm theo id
  const fetchProductById = async (id) => {
    const res = await axios.get(`http://localhost:5000/api/products/${id}`);
    return res.data.data;
  };
  useEffect(() => {
    const fetchProductData = async () => {
      if (!params?.id) return;
      try {
        const product = await fetchProductById(params.id);
        reset({
          ...product,
          features: Array.isArray(product.features)
            ? product.features.join("\n")
            : "",
        });
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error("Lỗi khi lấy dữ liệu sản phẩm:", error);
      }
    };
    fetchProductData();
  }, [reset, params?.id]);

  const onSubmit = async (data) => {
    const formattedData = {
      ...data,
      slug: `goi-internet-${data.nameProduct.toLowerCase().replace(/\s+/g, "-")}`,
      features: data.features.split("\n").filter((item) => item.trim() !== ""),
    };
    try {
      await axios.put(
        `http://localhost:5000/api/products/edit/${params.id}`,
        formattedData,
      );
      toast.success("Cập nhật sản phẩm thành công!")
      route.push("/admin/products");
    } catch (error) {
      toast.error("Có lỗi xảy ra khi cập nhật sản phẩm.");
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
        <h1 className="text-2xl font-bold text-gray-800">Cập nhật Sản phẩm</h1>
        <button onClick={handleLeave} className="cst_btn-secondary-icon">
          <MdArrowBack size={20} />
          Quay lại danh sách
        </button>
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
                    required: "Tên sản phẩm là bắt buộc",
                  })}
                  className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent ${
                    errors.nameProduct ? "border-red-500" : "border-gray-300"
                  }`}
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
                    Trạng thái
                  </label>
                  <select
                    {...register("status")}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-white"
                  >
                    <option value="Hoạt động">Hoạt động</option>
                    <option value="Tạm ngưng">Tạm ngưng</option>
                    <option value="Ngừng kinh doanh">Ngừng kinh doanh</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Danh mục
                  </label>
                  <select
                    {...register("category")}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-white"
                  >
                    <option value="internet">Internet</option>
                    <option value="mobile">Di động</option>
                    <option value="television">Truyền hình</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Giá (VNĐ)
                </label>
                <input
                  type="text"
                  {...register("price", {
                    required: "Giá là bắt buộc",
                    min: { value: 0, message: "Giá không được âm" },
                  })}
                  className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent ${
                    errors.price ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors.price && (
                  <span className="text-red-500 text-xs mt-1 block">
                    {errors.price.message}
                  </span>
                )}
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
                ></textarea>
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-4 pt-4 border-t border-gray-100">
            {/* <button
              onClick={handleLeave}
              className="cst_btn"
            >
              Hủy bỏ
            </button> */}
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

export default EditProductPage;
