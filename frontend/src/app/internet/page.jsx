"use client";
import Breadcrumb from "#/components/ui/Breadcrumb";
import { Check } from "lucide-react";
import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Link from "next/link";
import ContactModal from "#/components/common/ContactModal";
import Loading from "./Loading";

const fetchInternetProducts = async () => {
  const res = await axios.get("http://localhost:5000/api/products");
  return res.data.data.filter(
    (item) => item.category === "internet" && item.status === "Hoạt động",
  );
};

const InternetPage = () => {
  const breadcrumbItems = [{ label: "Internet", href: "/internet" }];

  const [open, setOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleContact = (product) => {
    setSelectedProduct(product);
    setOpen(true);
  };
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
    <>
      <div className="max-w-7xl mx-auto min-h-screen px-2 lg:px-4">
        <Breadcrumb items={breadcrumbItems} />

        {isLoading && <Loading />}
        {isError && (
          <div className="text-center text-primary py-8">
            <p>Ops, Có lỗi xảy ra khi tải dữ liệu.</p>
          </div>
        )}

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {products.map((item) => (
            <div
              key={item._id || item.slug}
              className="relative w-full max-w-sm overflow-hidden rounded-2xl bg-white p-8 shadow-xl ring-1 ring-gray-200 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
            >
              {item.totalBuy > 12 ? (
                <div className="absolute right-6 top-2 z-10">
                  <div className="relative flex w-[72px] flex-col items-center bg-primary px-2 py-2 text-white shadow-lg rounded-full">
                    <span className="text-xs">Bán chạy</span>
                  </div>
                </div>
              ) : null}

              {/* Content */}
              <h3 className="text-3xl font-bold tracking-tight text-primary font-magistral">
                {item.nameProduct}
              </h3>

              <div className="mt-4 flex items-baseline text-2xl font-extrabold tracking-tight text-gray-900">
                {item.price?.toLocaleString()}.000đ
                <span className="ml-1 text-base font-medium text-gray-500">
                  /Tháng
                </span>
              </div>

              <ul className="mt-8 space-y-4 text-sm leading-6 text-gray-600">
                {item.features.length > 0 ? (
                  item.features.map((feature, index) => (
                    <li key={index} className="flex gap-x-3">
                      <Check
                        className="h-6 w-5 flex-none text-primary"
                        aria-hidden="true"
                      />

                      <span>{feature}</span>
                    </li>
                  ))
                ) : (
                  <li>Không có tính năng nào được liệt kê.</li>
                )}
              </ul>

              <div className="mt-8 flex gap-3">
                <Link
                  href={`/internet/${item.slug}`}
                  className="cst_btn-secondary"
                >
                  Xem thêm
                </Link>

                <button
                  onClick={() => handleContact(item.nameProduct)}
                  className="cst_btn-primary"
                >
                  Đăng ký
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <ContactModal
        open={open}
        onClose={() => setOpen(false)}
        problem={selectedProduct}
      />
    </>
  );
};

export default InternetPage;
