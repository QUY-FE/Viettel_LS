"use client";

import React, { useMemo, useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import ReactPaginate from "react-paginate";
import axios from "axios";

import Link from "next/link";

import {
  MdAdd,
  MdEdit,
  MdDelete,
  MdVisibility,
  MdClose,
  MdSearch,
} from "react-icons/md";
import useDebounce from "#/hooks/useDebounce";

const fetchProducts = async () => {
  const res = await axios.get("http://localhost:5000/api/products");
  return res.data.data;
};

const deleteProduct = async (id) => {
  await axios.delete(`http://localhost:5000/api/products/delete/${id}`);
};

const ProductsPage = () => {
  const queryClient = useQueryClient();
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, 800);
  const [itemOffset, setItemOffset] = useState(0);
  const itemsPerPage = 8;

  const {
    data: products = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });

  const deleteMutation = useMutation({
    mutationFn: deleteProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["products"],
      });
    },
  });

  const filteredProducts = useMemo(() => {
    const searchTerm = (debouncedSearchTerm ?? "").toLowerCase();

    return products.filter((product) => {
      const nameMatch = (product?.name ?? "")
        .toLowerCase()
        .includes(searchTerm);
      const idMatch = (product?.id ?? "")
        .toString()
        .toLowerCase()
        .includes(searchTerm);

      return nameMatch || idMatch;
    });
  }, [products, debouncedSearchTerm]);

  /**
   * Pagination
   */
  const endOffset = itemOffset + itemsPerPage;

  const currentItems = filteredProducts.slice(itemOffset, endOffset);

  const pageCount = Math.ceil(filteredProducts.length / itemsPerPage);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % filteredProducts.length;

    setItemOffset(newOffset);
  };

  /**
   * Events
   */
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setItemOffset(0);
  };

  const handleDeleteProduct = async (id) => {
    const confirmed = confirm("Bạn có chắc chắn muốn xóa sản phẩm này?");

    if (!confirmed) return;

    deleteMutation.mutate(id);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-40">
        <p className="text-gray-600">Đang tải dữ liệu...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-center text-primary py-8">
        <p>Ops, Có lỗi xảy ra khi tải dữ liệu.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6 relative">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800">Quản lý Sản phẩm</h1>
        <Link href="/admin/products/create" className="cst_btn-secondary-icon">
          <MdAdd size={20} />
          Thêm sản phẩm
        </Link>
      </div>

      {/* Search */}
      <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-4 flex items-center gap-2">
        <MdSearch size={24} className="text-gray-400" />
        <input
          type="text"
          className="w-full focus:outline-none text-gray-700"
          placeholder="Tìm kiếm theo mã hoặc tên sản phẩm..."
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </div>

      {/* Table */}
      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200 text-sm text-gray-600">
                <th className="p-4 font-semibold">Mã SP</th>
                <th className="p-4 font-semibold">Tên sản phẩm</th>
                <th className="p-4 font-semibold">Danh mục</th>
                <th className="p-4 font-semibold">Giá (VNĐ)</th>
                <th className="p-4 font-semibold">Trạng thái</th>
                <th className="p-4 font-semibold text-right">Thao tác</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100 text-sm text-gray-700">
              {currentItems.length > 0 ? (
                currentItems.map((product) => (
                  <tr
                    key={product._id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="p-4 font-medium text-gray-900">
                      {product._id}
                    </td>

                    <td className="p-4">{product.nameProduct}</td>

                    <td className="p-4">{product.category}</td>

                    <td className="p-4">
                      {product.price.toLocaleString("vi-VN")}.000đ
                    </td>

                    <td className="p-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          product.status === "Hoạt động"
                            ? "bg-green-100 text-green-700"
                            : product.status === "Tạm ngưng"
                              ? "bg-yellow-100 text-yellow-700"
                              : "bg-red-100 text-red-700"
                        }`}
                      >
                        {product.status}
                      </span>
                    </td>

                    <td className="p-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => setSelectedProduct(product)}
                          className="p-2 text-gray-600 hover:bg-gray-100 rounded-md transition-colors"
                        >
                          <MdVisibility size={18} />
                        </button>

                        <Link
                          href={`/admin/products/edit/${product.slug}`}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
                        >
                          <MdEdit size={18} />
                        </Link>

                        <button
                          onClick={() => handleDeleteProduct(product.slug)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-md transition-colors"
                        >
                          <MdDelete size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-gray-500">
                    Không tìm thấy sản phẩm nào.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      {pageCount > 1 && (
        <ReactPaginate
          breakLabel="..."
          nextLabel=">"
          previousLabel="<"
          onPageChange={handlePageClick}
          pageRangeDisplayed={3}
          pageCount={pageCount}
          renderOnZeroPageCount={null}
          containerClassName="flex items-center justify-end gap-2 mt-2"
          pageLinkClassName="px-3 py-1 border border-gray-300 rounded-md hover:bg-gray-50 text-gray-700 transition-colors"
          previousLinkClassName="px-3 py-1 border border-gray-300 rounded-md hover:bg-gray-50 text-gray-700 font-medium transition-colors"
          nextLinkClassName="px-3 py-1 border border-gray-300 rounded-md hover:bg-gray-50 text-gray-700 font-medium transition-colors"
          activeLinkClassName="bg-primary text-white border-primary hover:bg-opacity-90"
          disabledLinkClassName="opacity-50 cursor-not-allowed"
        />
      )}

      {/* Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white rounded-xl shadow-lg w-full max-w-lg p-6 relative">
            <div className="flex items-center justify-between mb-6 border-b pb-3">
              <h2 className="text-xl font-bold text-gray-800">
                Chi tiết sản phẩm
              </h2>

              <button
                onClick={() => setSelectedProduct(null)}
                className="text-gray-500 hover:text-primary transition-colors"
              >
                <MdClose size={24} />
              </button>
            </div>

            <div className="space-y-4 text-sm text-gray-700">
              <div className="flex justify-between border-b border-gray-100 pb-2">
                <span className="font-semibold">Mã sản phẩm:</span>

                <span className="font-medium text-gray-900">
                  {selectedProduct._id}
                </span>
              </div>

              <div className="flex justify-between border-b border-gray-100 pb-2">
                <span className="font-semibold">Tên sản phẩm:</span>

                <span className="font-medium text-gray-900">
                  {selectedProduct.nameProduct}
                </span>
              </div>

              <div className="flex justify-between border-b border-gray-100 pb-2">
                <span className="font-semibold">Danh mục:</span>

                <span>{selectedProduct.category}</span>
              </div>

              <div className="flex justify-between border-b border-gray-100 pb-2">
                <span className="font-semibold">Trạng thái:</span>

                <span
                  className={`font-medium ${
                    selectedProduct.status === "Hoạt Động"
                      ? "text-green-600"
                      : "text-yellow-600"
                  }`}
                >
                  {selectedProduct.status}
                </span>
              </div>

              <div className="flex justify-between border-b border-gray-100 pb-2">
                <span className="font-semibold">Giá niêm yết:</span>

                <span className="font-bold text-primary">
                  {selectedProduct.price.toLocaleString("vi-VN")}đ
                </span>
              </div>

              <div className="pt-2">
                <h3 className="font-semibold text-gray-800 mb-2">Mô tả</h3>

                <p className="text-gray-600 bg-gray-50 p-3 rounded-md">
                  {selectedProduct.description}
                </p>
              </div>

              <div className="pt-2">
                <h3 className="font-semibold text-gray-800 mb-2">Slug</h3>

                <p className="text-gray-600 bg-gray-50 p-3 rounded-md">
                  {selectedProduct.slug}
                </p>
              </div>

              <div className="pt-2">
                <h3 className="font-semibold text-gray-800 mb-2">
                  Tính năng nổi bật
                </h3>

                <ul className="list-disc list-inside bg-gray-50 p-3 rounded-md text-gray-600 space-y-1">
                  {selectedProduct.features.map((feature, index) => (
                    <li key={index}>{feature}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setSelectedProduct(null)}
                className="bg-primary text-white px-6 py-2 rounded-md hover:opacity-90 transition-opacity font-medium"
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductsPage;
