"use client";
import ContactModal from "#/components/common/ContactModal";
import { MonitorPlay, ShieldCheck, Smartphone, Wifi, Zap } from "lucide-react";
import React, { useState } from "react";

const ProductPage = () => {
  const [open, setOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleOpen = (product) => {
    setSelectedProduct(product);
    setOpen(true);
  };
  return (
    <>
      <div className="bg-[#F2F2F2] min-h-screen py-12">
        <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
          

          {/* Category: Internet */}
          <div className="mb-16">
            <div className="flex items-center mb-4 lg:mb-8">
              <Wifi className="text-[#EE0033] mr-3" size={28} />
              <h2 className="text-xl lg:text-2xl font-bold text-[#000000]">
                Internet & Truyền Hình
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                "SUN1T - 150Mbps",
                "SUN2T - 250Mbps",
                "STAR1T - Kèm Wifi Mesh",
              ].map((plan, i) => (
                <div
                  key={plan}
                  className="bg-white rounded-2xl p-4 lg:p-6 shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-lg font-bold text-[#000000]">{plan}</h3>
                    {i === 2 && (
                      <span className="bg-[#EE0033] text-white text-xs px-2 py-1 rounded font-medium">
                        Bán chạy
                      </span>
                    )}
                  </div>
                  <ul className="space-y-3 mb-6 text-sm text-[#44494D]">
                    <li className="flex items-center">
                      <Zap size={16} className="text-green-500 mr-2" /> Băng
                      thông tối thiểu: {150 + i * 100} Mbps
                    </li>
                    <li className="flex items-center">
                      <ShieldCheck size={16} className="text-green-500 mr-2" />{" "}
                      Miễn phí modem Wifi {i === 2 ? "Mesh" : "6"}
                    </li>
                    <li className="flex items-center">
                      <MonitorPlay size={16} className="text-green-500 mr-2" />{" "}
                      Tích hợp truyền hình TV360
                    </li>
                  </ul>
                  <div className="border-t border-gray-100 pt-4">
                    <div className="text-2xl font-bold text-[#EE0033]">
                      {165 + i * 30}.000đ
                      <span className="text-sm text-[#B5B4B4] font-normal">
                        /tháng
                      </span>
                    </div>
                    <button
                      onClick={() => handleOpen(plan)}
                      className="w-full cst_btn-secondary mt-2 lg:mt-4"
                    >
                      Đăng ký mua
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Category: Mobile */}
          <div>
            <div className="flex items-center mb-4 lg:mb-8">
              <Smartphone className="text-[#EE0033] mr-3" size={28} />
              <h2 className="text-xl lg:text-2xl font-bold text-[#000000]">
                Gói cước Di động 4G/5G
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {["V90B", "MXH120", "V200B", "5G150"].map((plan, i) => (
                <div
                  key={plan}
                  className="bg-white rounded-2xl p-6 border border-gray-100 hover:border-[#EE0033] transition-colors relative overflow-hidden group"
                >
                  <div className="absolute top-0 right-0 bg-[#F2F2F2] text-[10px] font-bold px-3 py-1 rounded-bl-lg text-[#44494D]">
                    DATA & THOẠI
                  </div>
                  <h3 className="text-xl font-black text-[#EE0033] mb-2">
                    {plan}
                  </h3>
                  <div className="text-3xl font-bold text-[#000000]">
                    {90 + i * 30}K
                    <span className="text-base text-[#44494D] font-normal">
                      /tháng
                    </span>
                  </div>
                  <ul className="space-y-2 mb-6 text-sm text-[#44494D]">
                    <li>
                      • <span className="font-bold">{1 + i}GB/Ngày</span> Data
                      tốc độ cao
                    </li>
                    <li>• Miễn phí nội mạng &lt; 10 phút</li>
                    {i > 0 && <li>• Miễn phí data MXH</li>}
                  </ul>
                  <button
                    onClick={() => handleOpen(plan)}
                    className="cst_btn-secondary w-full mt-2 lg:mt-4"
                  >
                    Đăng ký
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <ContactModal
        open={open}
        onClose={() => setOpen(false)}
        product={selectedProduct}
      />
    </>
  );
};

export default ProductPage;
