"use client";
import React, { useState } from "react";
import { MdAdd, MdEdit, MdDelete } from "react-icons/md";

const NewsPage = () => {
  const [news, setNews] = useState([
    { id: 1, title: "Triển khai mạng 5G tốc độ cao", category: "Công nghệ", author: "Admin", views: 1250, status: "Đã xuất bản" },
    { id: 2, title: "Chương trình khuyến mãi cáp quang tháng 5", category: "Khuyến mãi", author: "Marketing", views: 840, status: "Bản nháp" },
  ]);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800">Quản lý Tin tức</h1>
        <button className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-lg font-medium hover:opacity-90 transition-opacity">
          <MdAdd size={20} />
          Thêm bài viết
        </button>
      </div>

      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200 text-sm text-gray-600">
                <th className="p-4 font-semibold">Tiêu đề</th>
                <th className="p-4 font-semibold">Danh mục</th>
                <th className="p-4 font-semibold">Tác giả</th>
                <th className="p-4 font-semibold">Lượt xem</th>
                <th className="p-4 font-semibold">Trạng thái</th>
                <th className="p-4 font-semibold text-right">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-sm text-gray-700">
              {news.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                  <td className="p-4 font-medium text-gray-900 max-w-xs truncate">{item.title}</td>
                  <td className="p-4">{item.category}</td>
                  <td className="p-4">{item.author}</td>
                  <td className="p-4">{item.views}</td>
                  <td className="p-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      item.status === "Đã xuất bản" ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-700"
                    }`}>
                      {item.status}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-md transition-colors"><MdEdit size={18} /></button>
                      <button className="p-2 text-red-600 hover:bg-red-50 rounded-md transition-colors"><MdDelete size={18} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default NewsPage;