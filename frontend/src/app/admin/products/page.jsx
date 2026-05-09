"use client";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import {
  MdAdd,
  MdEdit,
  MdDelete,
  MdVisibility,
  MdClose,
  MdSearch,
} from "react-icons/md";
import ReactPaginate from "react-paginate";

const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};

const ProductsPage = () => {
  const [products, setProducts] = useState([
    {
      id: "SP001",
      name: "Gói cước 4G V120N",
      price: 120000,
      category: "Di động",
      status: "Hoạt động",
      description:
        "Gói cước 4G siêu tốc độ dành cho thuê bao di động trả trước.",
      features: [
        "4GB Data/ngày",
        "Miễn phí gọi nội mạng < 20 phút",
        "50 phút gọi ngoại mạng",
      ],
    },
    {
      id: "SP002",
      name: "Internet Cáp quang FAST2",
      price: 189000,
      category: "Băng rộng",
      status: "Hoạt động",
      description: "Đường truyền Internet cáp quang tốc độ cao cho gia đình.",
      features: [
        "Băng thông 150Mbps",
        "Trang bị miễn phí Modem Wifi 6",
        "Lắp đặt trong 24h",
      ],
    },
    {
      id: "SP003",
      name: "Truyền hình TV360",
      price: 50000,
      category: "Dịch vụ GTGT",
      status: "Tạm ngưng",
      description: "Dịch vụ truyền hình thông minh đa nền tảng.",
      features: [
        "Hơn 150 kênh truyền hình",
        "Kho phim độc quyền",
        "Xem trên nhiều thiết bị",
      ],
    },
    {
      id: "SP004",
      name: "Gói 5G MAX",
      price: 200000,
      category: "Di động",
      status: "Hoạt động",
      description: "Trải nghiệm 5G không giới hạn.",
      features: ["Data không giới hạn"],
    },
    {
      id: "SP005",
      name: "Internet Doanh nghiệp",
      price: 500000,
      category: "Băng rộng",
      status: "Hoạt động",
      description: "Gói cáp quang tốc độ cam kết quốc tế.",
      features: ["IP Tĩnh"],
    },
    {
      id: "SP006",
      name: "Gói Data Roaming",
      price: 300000,
      category: "Di động",
      status: "Hoạt động",
      description: "Data sử dụng tại 50 quốc gia.",
      features: ["5GB roaming"],
    },
  ]);

  const [selectedProduct, setSelectedProduct] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  const [itemOffset, setItemOffset] = useState(0);
  const itemsPerPage = 3;

  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
      product.id.toLowerCase().includes(debouncedSearchTerm.toLowerCase()),
  );

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setItemOffset(0);
  };

  const endOffset = itemOffset + itemsPerPage;
  const currentItems = filteredProducts.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(filteredProducts.length / itemsPerPage);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % filteredProducts.length;
    setItemOffset(newOffset);
  };

  const handleAddProduct = () => {
    console.log("Mở modal thêm sản phẩm");
  };

  const handleEditProduct = (id) => {
    console.log("Sửa sản phẩm ID:", id);
  };

  const handleDeleteProduct = (id) => {
    if (confirm("Bạn có chắc chắn muốn xóa sản phẩm này?")) {
      setProducts(products.filter((product) => product.id !== id));
    }
  };

  const handleOpenModal = (product) => {
    setSelectedProduct(product);
  };

  const handleCloseModal = () => {
    setSelectedProduct(null);
  };

  return (
    <div className="flex flex-col gap-6 relative">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800">Quản lý Sản phẩm</h1>
        <Link
          href={"/admin/products/create"}
          onClick={handleAddProduct}
          className="cst_btn-secondary-icon"
        >
          <MdAdd size={20} />
          Thêm sản phẩm
        </Link>
      </div>

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
                    key={product.id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="p-4 font-medium text-gray-900">
                      {product.id}
                    </td>
                    <td className="p-4">{product.name}</td>
                    <td className="p-4">{product.category}</td>
                    <td className="p-4">
                      {product.price.toLocaleString("vi-VN")}
                    </td>
                    <td className="p-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          product.status === "Hoạt động"
                            ? "bg-green-100 text-green-700"
                            : "bg-yellow-100 text-yellow-700"
                        }`}
                      >
                        {product.status}
                      </span>
                    </td>
                    <td className="p-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => handleOpenModal(product)}
                          className="p-2 text-gray-600 hover:bg-gray-100 rounded-md transition-colors"
                        >
                          <MdVisibility size={18} />
                        </button>
                        <Link
                          href={`/admin/products/edit/${product.id}`}
                          onClick={() => handleEditProduct(product.id)}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
                        >
                          <MdEdit size={18} />
                        </Link>
                        <button
                          onClick={() => handleDeleteProduct(product.id)}
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
                  <td colSpan="6" className="p-8 text-center text-gray-500">
                    Không tìm thấy sản phẩm nào.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {pageCount > 1 && (
        <ReactPaginate
          breakLabel="..."
          nextLabel=">"
          onPageChange={handlePageClick}
          pageRangeDisplayed={3}
          pageCount={pageCount}
          previousLabel="<"
          renderOnZeroPageCount={null}
          containerClassName="flex items-center justify-end gap-2 mt-2"
          pageLinkClassName="px-3 py-1 border border-gray-300 rounded-md hover:bg-gray-50 text-gray-700 transition-colors"
          previousLinkClassName="px-3 py-1 border border-gray-300 rounded-md hover:bg-gray-50 text-gray-700 font-medium transition-colors"
          nextLinkClassName="px-3 py-1 border border-gray-300 rounded-md hover:bg-gray-50 text-gray-700 font-medium transition-colors"
          activeLinkClassName="bg-primary text-white border-primary hover:bg-opacity-90"
          disabledLinkClassName="opacity-50 cursor-not-allowed"
        />
      )}

      {selectedProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 transition-opacity">
          <div className="bg-white rounded-xl shadow-lg w-full max-w-lg p-6 relative">
            <div className="flex items-center justify-between mb-6 border-b pb-3">
              <h2 className="text-xl font-bold text-gray-800">
                Chi tiết sản phẩm
              </h2>
              <button
                onClick={handleCloseModal}
                className="text-gray-500 hover:text-primary transition-colors"
              >
                <MdClose size={24} />
              </button>
            </div>

            <div className="space-y-4 text-sm text-gray-700">
              <div className="flex justify-between border-b border-gray-100 pb-2">
                <span className="font-semibold">Mã sản phẩm:</span>
                <span className="font-medium text-gray-900">
                  {selectedProduct.id}
                </span>
              </div>
              <div className="flex justify-between border-b border-gray-100 pb-2">
                <span className="font-semibold">Tên sản phẩm:</span>
                <span className="font-medium text-gray-900">
                  {selectedProduct.name}
                </span>
              </div>
              <div className="flex justify-between border-b border-gray-100 pb-2">
                <span className="font-semibold">Danh mục:</span>
                <span>{selectedProduct.category}</span>
              </div>
              <div className="flex justify-between border-b border-gray-100 pb-2">
                <span className="font-semibold">Trạng thái:</span>
                <span
                  className={`font-medium ${selectedProduct.status === "Hoạt động" ? "text-green-600" : "text-yellow-600"}`}
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
                onClick={handleCloseModal}
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
