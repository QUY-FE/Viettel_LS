"use client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import Link from "next/link";
import React, { useState } from "react";
import { MdVisibility, MdEdit, MdDelete, MdClose } from "react-icons/md";

const fetchOrders = async () => {
  const res = await axios.get("http://localhost:5000/api/contacts/all");
  return res.data.data;
};

const deleteOrder = async (id) => {
  await axios.delete(`http://localhost:5000/api/contacts/delete/${id}`);
};
const OrdersPage = () => {
  const queryClient = useQueryClient();
  const [selectedOrder, setSelectedOrder] = useState(null);

  const handleOpenModal = (order) => {
    setSelectedOrder(order);
  };

  const handleCloseModal = () => {
    setSelectedOrder(null);
  };

  const {
    data: Orders = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["orders"],
    queryFn: fetchOrders,
  });

  const deleteMutation = useMutation({
    mutationFn: deleteOrder,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["orders"],
      });
    },
  });

  const handleDeleteOrder = async (id) => {
    const confirmed = confirm("Bạn có chắc chắn muốn xóa đơn hàng này?");

    if (!confirmed) return;

    deleteMutation.mutate(id);
  };
  if (isLoading) {
    return (
      <div className="p-6 text-gray-600 font-medium">Đang tải dữ liệu...</div>
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
        <h1 className="text-2xl font-bold text-gray-800">Quản lý Đơn hàng</h1>
      </div>

      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200 text-sm text-gray-600">
                <th className="p-4 font-semibold">STT</th>
                <th className="p-4 font-semibold">Khách hàng</th>
                <th className="p-4 font-semibold">Sản phẩm/Dịch vụ</th>
                <th className="p-4 font-semibold">Ngày đặt</th>
                <th className="p-4 font-semibold">Trạng thái</th>
                <th className="p-4 font-semibold text-right">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-sm text-gray-700">
              {Orders.map((order, index) => (
                <tr
                  key={order._id}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="p-4 font-medium text-gray-900">{index + 1}</td>
                  <td className="p-4">{order.name}</td>
                  <td className="p-4">{order.problem}</td>
                  <td className="p-4">{order.createdAt}</td>

                  <td className="p-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        order.status === "Hoàn thành"
                          ? "bg-green-100 text-green-700"
                          : order.status === "Đang chờ xử lý"
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-red-100 text-red-700"
                      }`}
                    >
                      {order.status}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => handleOpenModal(order)}
                        className="p-2 text-gray-600 hover:bg-gray-100 rounded-md transition-colors"
                      >
                        <MdVisibility size={18} />
                      </button>
                      <Link
                        href={`/admin/orders/${order._id}`}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
                      >
                        <MdEdit size={18} />
                      </Link>
                      <button
                        onClick={() => handleDeleteOrder(order._id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-md transition-colors"
                      >
                        <MdDelete size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {selectedOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 transition-opacity">
          <div className="bg-white rounded-xl shadow-lg w-full max-w-lg p-6 relative">
            <div className="flex items-center justify-between mb-6 border-b pb-3">
              <h2 className="text-xl font-bold text-gray-800">
                Chi tiết đơn hàng: {selectedOrder.id}
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
                <span className="font-semibold">Khách hàng:</span>
                <span>{selectedOrder.name}</span>
              </div>
              <div className="flex justify-between border-b border-gray-100 pb-2">
                <span className="font-semibold">Sản phẩm/Dịch vụ:</span>
                <span>{selectedOrder.problem}</span>
              </div>
              <div className="flex justify-between border-b border-gray-100 pb-2">
                <span className="font-semibold">Ngày đặt:</span>
                <span>{selectedOrder.createdAt}</span>
              </div>
              <div className="flex justify-between border-b border-gray-100 pb-2">
                <span className="font-semibold">Trạng thái:</span>
                <span
                  className={`font-medium ${
                    selectedOrder.status === "Hoàn thành"
                      ? "text-green-600"
                      : selectedOrder.status === "Đang xử lý"
                        ? "text-blue-600"
                        : "text-red-600"
                  }`}
                >
                  {selectedOrder.status}
                </span>
              </div>
              <div className="flex justify-between pt-2">
                <span className="font-semibold text-lg">Tổng tiền:</span>
                <span className="font-bold text-lg text-primary">
                  {selectedOrder.total?.toLocaleString("vi-VN")}đ
                </span>
              </div>
            </div>

            <div className="mt-8 flex justify-end">
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

export default OrdersPage;
