"use client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Link from "next/link";
import React, { useState } from "react";
import { MdAdd, MdEdit, MdDelete, MdVisibility, MdClose } from "react-icons/md";


const fetchUsers = async () => {
  const res = await axios.get("http://localhost:5000/api/users/all");
  return res.data;
};




const UsersPage = () => {
  
  const {
    data: users = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["products"],
    queryFn: fetchUsers,
  });

  console.log(users)
  const [selectedUser, setSelectedUser] = useState(null);

  const handleOpenModal = (user) => {
    setSelectedUser(user);
  };

  const handleCloseModal = () => {
    setSelectedUser(null);
  };

  return (
    <div className="flex flex-col gap-6 relative">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800">Quản lý Người dùng</h1>
        <Link href={"/admin/users/create"} 
        className="cst_btn-secondary-icon">
          <MdAdd size={20} />
          Thêm người dùng
        </Link>
      </div>

      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200 text-sm text-gray-600">
                <th className="p-4 font-semibold">Họ tên</th>
                {/* <th className="p-4 font-semibold">Email</th> */}
                <th className="p-4 font-semibold">Số điện thoại</th>
                <th className="p-4 font-semibold">Phân quyền</th>
                <th className="p-4 font-semibold">Trạng thái</th>
                <th className="p-4 font-semibold text-right">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-sm text-gray-700">
              {users.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                  <td className="p-4 font-medium text-gray-900">{user.username}</td>
                  {/* <td className="p-4">{user.email}</td> */}
                  <td className="p-4">{user.phone}</td>
                  <td className="p-4">
                    <span className={`font-semibold ${user.role === "admin" || "Admin" ? "text-primary" : "text-gray-600"}`}>
                      {user.role}
                    </span>
                  </td>
                  <td className="p-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      user.status === "Hoạt động" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                    }`}>
                      {user.status}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button 
                        onClick={() => handleOpenModal(user)}
                        className="p-2 text-gray-600 hover:bg-gray-100 rounded-md transition-colors"
                        title="Xem chi tiết"
                      >
                        <MdVisibility size={18} />
                      </button>
                      <Link 
                      href={`/admin/users/create/${user._id}`}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
                        title="Sửa"
                      >
                        <MdEdit size={18} />
                      </Link>
                      <button 
                        className="p-2 text-red-600 hover:bg-red-50 rounded-md transition-colors" 
                        title="Xóa"
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

      {selectedUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 transition-opacity">
          <div className="bg-white rounded-xl shadow-lg w-full max-w-lg p-6 relative">
            <div className="flex items-center justify-between mb-6 border-b pb-3">
              <h2 className="text-xl font-bold text-gray-800">Chi tiết người dùng</h2>
              <button 
                onClick={handleCloseModal}
                className="text-gray-500 hover:text-primary transition-colors"
              >
                <MdClose size={24} />
              </button>
            </div>
            
            <div className="space-y-4 text-sm text-gray-700">
              <div className="flex justify-between border-b border-gray-100 pb-2">
                <span className="font-semibold">Họ và tên:</span>
                <span className="font-medium text-gray-900">{selectedUser.username}</span>
              </div>
              <div className="flex justify-between border-b border-gray-100 pb-2">
                <span className="font-semibold">Phân quyền:</span>
                <span className={`font-semibold ${selectedUser.role === "Admin" ? "text-primary" : "text-gray-600"}`}>
                  {selectedUser.role}
                </span>
              </div>
              <div className="flex justify-between border-b border-gray-100 pb-2">
                <span className="font-semibold">Trạng thái:</span>
                <span className={`font-medium ${selectedUser.status === "Hoạt động" ? "text-green-600" : "text-red-600"}`}>
                  {selectedUser.status}
                </span>
              </div>
              <div className="flex flex-col gap-1 border-b border-gray-100 pb-2">
                <span className="font-semibold">Địa chỉ:</span>
                <span className="text-gray-600">{selectedUser.address}</span>
              </div>
              
              <div className="pt-2">
                <h3 className="font-semibold text-gray-800 mb-3">Thông tin liên hệ</h3>
                <div className="grid grid-cols-2 gap-4 bg-gray-50 p-4 rounded-lg">
                  <div>
                    <span className="block text-xs text-gray-500 mb-1">Số điện thoại</span>
                    <span className="font-medium">{selectedUser.phone}</span>
                  </div>
                  <div>
                    <span className="block text-xs text-gray-500 mb-1">Zalo</span>
                    <span className="font-medium">{selectedUser.zalo}</span>
                  </div>
                  <div className="col-span-2">
                    <span className="block text-xs text-gray-500 mb-1">Email</span>
                    <span className="font-medium">{selectedUser.email}</span>
                  </div>
                  {selectedUser.facebook && (
                    <div className="col-span-2">
                      <span className="block text-xs text-gray-500 mb-1">Facebook</span>
                      <a href={selectedUser.facebook} target="_blank" rel="noreferrer" className="text-blue-600 hover:underline break-all">
                        {selectedUser.facebook}
                      </a>
                    </div>
                  )}
                </div>
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

export default UsersPage;