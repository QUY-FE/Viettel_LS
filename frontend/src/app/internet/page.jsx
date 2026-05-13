"use client";
import Breadcrumb from "#/components/ui/Breadcrumb";
import {
  Check,
  Info,
  MonitorPlay,
  PackageCheck,
  ShieldCheck,
  Wifi,
  Zap,
} from "lucide-react";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchInternetProducts = async () => {
  const res = await axios.get("http://localhost:5000/api/products");
  return res.data.data.filter(
    (item) => item.category === "internet" && item.status === "Hoạt động",
  );
};

const InternetPage = () => {
  const breadcrumbItems = [{ label: "Internet", href: "/internet" }];
  const {
    data: products = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["internet-products"],
    queryFn: fetchInternetProducts,
  });

  return (
    <div className="max-w-7xl mx-auto min-h-screen px-2 lg:px-4">
      <Breadcrumb items={breadcrumbItems} />

      <h1 className="my-4 font-bold text-3xl text-center">
        Internet
        <span className="font-magistral text-primary"> Viettel</span>
      </h1>
      <p className="my-4 font-bold text-xl text-center">
        Các gói cước tốc độ cao, tích hợp giải pháp Mesh wifi
      </p>

      {isLoading && <div className="text-center py-8">Đang tải dữ liệu...</div>}
      {isError && (
        <div className="text-center text-red-500 py-8">
          {error?.message || "Có lỗi xảy ra khi tải dữ liệu."}
        </div>
      )}

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {products.map((item) => (
          <div
            key={item._id || item.slug}
            className="w-full max-w-sm rounded-2xl bg-white p-8 shadow-xl ring-1 ring-gray-200 transition-all hover:shadow-2xl"
          >
            <h3 className="text-3xl font-bold tracking-tight text-primary font-magistral">
              {item.nameProduct}
            </h3>

            <div className="mt-4 flex items-baseline text-2xl font-extrabold tracking-tight text-gray-900">
              {item.price?.toLocaleString()}.000đ<span>/Tháng</span>
            </div>

            <ul className="mt-8 space-y-4 text-sm leading-6 text-gray-600">
              {item.features.length > 0 ? (
                item.features.map((feature, index) => (
                  <li key={index} className="flex gap-x-3">
                    <Check
                      className="h-6 w-5 flex-none text-[#EE0033]"
                      aria-hidden="true"
                    />
                    <span>{feature}</span>
                  </li>
                ))
              ) : (
                <li className="">
                  Không có tính năng nào được liệt kê.
                </li>
              )}
            </ul>

            <div className="mt-8 flex gap-3">
              <button
                onClick={() => onLearnMore(item)}
                className="cst_btn-secondary"
              >
                Xem thêm
              </button>

              <button
                onClick={() => onSubscribe(item)}
                className="cst_btn-primary"
              >
                Đăng ký
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InternetPage;
