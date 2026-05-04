"use client";

import {
  Search,
  MapPin,
  UserRound,
  PackageSearch,
  Clock,
  ChevronRight,
} from "lucide-react";
import { useState } from "react";

const stores = [
  {
    name: "Viettel Store TP Lạng Sơn",
    address: "Số 123 Lê Lợi, Phường Vĩnh Trại, TP Lạng Sơn",
    time: "08:00 - 22:00",
    open: true,
  },
  {
    name: "CH Giao Dịch Hữu Lũng",
    address: "Số 45 Chi Lăng, Thị trấn Hữu Lũng, Lạng Sơn",
    time: "08:00 - 18:00",
    open: true,
  },
  {
    name: "CH Giao Dịch Lộc Bình",
    address: "Khu 5, Thị trấn Lộc Bình, Lạng Sơn",
    time: "08:00 - 17:30",
    open: false,
  },
  {
    name: "CH Giao Dịch Cao Lộc",
    address: "Số 88 Quốc Lộ 1A, Cao Lộc, Lạng Sơn",
    time: "08:00 - 18:00",
    open: true,
  },
];

const products = [
  { label: "Gói 5G Data", desc: "Tốc độ cao, phủ sóng rộng toàn quốc" },
  { label: "Internet Cáp Quang", desc: "Kết nối ổn định cho hộ gia đình" },
  { label: "Combo Truyền Hình", desc: "Hàng trăm kênh HD & 4K" },
  { label: "Sim Số Đẹp", desc: "Đầu số đẹp, phong thuỷ, dễ nhớ" },
  { label: "Chữ Ký Số", desc: "Xác thực điện tử hợp pháp" },
  { label: "Cloud Server", desc: "Hạ tầng đám mây doanh nghiệp" },
];

const tabs = [
  { key: "store", icon: MapPin, label: "Cửa hàng gần nhất" },
  { key: "staff", icon: UserRound, label: "Nhân viên CSKH" },
  { key: "product", icon: PackageSearch, label: "Sản phẩm & Dịch vụ" },
];

export default function Page() {
  const [tab, setTab] = useState("store");
  const [query, setQuery] = useState("");

  const placeholder =
    tab === "product"
      ? "Nhập tên sản phẩm hoặc dịch vụ..."
      : "Nhập tên đường, phường/xã, quận/huyện...";

  return (
    <main className="min-h-screen relative overflow-hidden mt-4 px-2 lg:px-4">
      <div className="max-w-6xl mx-auto rounded-2xl sm:rounded-[28px] bg-[#f4f4f4]/95 shadow-2xl overflow-hidden">
        <div className="flex flex-col lg:grid lg:grid-cols-[340px_1fr] min-h-0 lg:min-h-[620px]">
          {/* ── Sidebar / Tab nav ── */}
          <aside className="bg-[#ececec] p-3 sm:p-7 lg:p-7">
            <h2 className="text-xl sm:text-2xl lg:text-[36px] leading-tight font-bold text-black mb-4 sm:mb-6 lg:mb-8 hidden sm:block">
              Bạn đang tìm kiếm?
            </h2>

            {/* Mobile: horizontal scroll tabs */}
            <div className="flex gap-2 overflow-x-auto  pb-1 sm:hidden">
              {tabs.map(({ key, icon: Icon, label }) => (
                <button
                  key={key}
                  onClick={() => setTab(key)}
                  className={`shrink-0 flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition whitespace-nowrap ${
                    tab === key
                      ? "bg-[#ff0037] text-white shadow"
                      : "bg-white text-black"
                  }`}
                >
                  <Icon size={16} />
                  {label}
                </button>
              ))}
            </div>

            {/* sm+: vertical tabs */}
            <div className="hidden sm:flex flex-row lg:flex-col gap-3">
              {tabs.map(({ key, icon: Icon, label }) => (
                <button
                  key={key}
                  onClick={() => setTab(key)}
                  className={`flex-1 lg:flex-none lg:w-full h-13 sm:h-14 rounded-2xl flex items-center gap-3 px-4 sm:px-6 text-sm sm:text-base lg:text-lg font-semibold transition ${
                    tab === key
                      ? "bg-[#ff0037] text-white shadow-lg"
                      : "bg-white text-black hover:bg-gray-50"
                  }`}
                >
                  <Icon size={20} />
                  <span className="text-left leading-tight">{label}</span>
                </button>
              ))}
            </div>
          </aside>

          {/* ── Content panel ── */}
          <section className="p-4 sm:p-6 lg:p-8 bg-[#f8f8f8]">
            {/* Search bar */}
            <div className="relative mb-5 sm:mb-7">
              <Search
                size={18}
                className="absolute left-4 sm:left-6 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
              />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={placeholder}
                className="w-full h-12 sm:h-14 rounded-full bg-[#ececec] pl-11 sm:pl-14 pr-28 sm:pr-36 text-sm sm:text-base outline-none text-gray-700 placeholder:text-gray-400"
              />
              <button className="absolute right-1.5 sm:right-2 top-1.5 sm:top-2 h-9 sm:h-10 px-4 sm:px-7 rounded-full bg-black text-white text-sm font-medium hover:bg-gray-800 transition">
                Tìm
              </button>
            </div>

            {/* Tab content */}
            {tab === "product" ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3 sm:gap-4">
                {products.map(({ label, desc }, i) => (
                  <div
                    key={i}
                    className="bg-white rounded-2xl border border-gray-200 p-4 sm:p-5 hover:shadow-lg transition cursor-pointer group"
                  >
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-[#ff0037]/10 flex items-center justify-center mb-3 sm:mb-4">
                      <PackageSearch className="text-[#ff0037]" size={20} />
                    </div>
                    <h3 className="font-bold text-base sm:text-lg text-black mb-1">
                      {label}
                    </h3>
                    <p className="text-gray-500 text-xs sm:text-sm leading-relaxed">
                      {desc}
                    </p>
                  </div>
                ))}
              </div>
            ) : tab === "staff" ? (
              <div className="flex flex-col items-center justify-center py-16 text-center text-gray-400 gap-3">
                <UserRound size={40} strokeWidth={1.2} />
                <p className="text-base font-medium">
                  Tính năng đang được cập nhật
                </p>
                <p className="text-sm">
                  Vui lòng liên hệ tổng đài 18008168 để được hỗ trợ.
                </p>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-16 text-center text-gray-400 gap-3">
                <UserRound size={40} strokeWidth={1.2} />
                <p className="text-base font-medium">
                  Tính năng đang được cập nhật
                </p>
                <p className="text-sm">
                  Vui lòng liên hệ tổng đài 18008168 để được hỗ trợ.
                </p>
              </div>
              // <div className="space-y-3 sm:space-y-4 max-h-[420px] sm:max-h-[500px] overflow-y-auto pr-1">
              //   {stores.map((item, i) => (
              //     <div
              //       key={i}
              //       className="bg-white border border-gray-200 rounded-2xl p-4 sm:p-5 flex items-start justify-between gap-3 hover:shadow-md transition"
              //     >
              //       <div className="min-w-0 flex-1">
              //         <div className="flex items-center gap-2 mb-1.5">
              //           <MapPin size={15} className="text-[#ff0037] shrink-0" />
              //           <h3 className="font-bold text-sm sm:text-base lg:text-lg text-black leading-tight truncate">
              //             {item.name}
              //           </h3>
              //         </div>
              //         <p className="text-gray-600 text-xs sm:text-sm mb-1.5 leading-snug">
              //           {item.address}
              //         </p>
              //         <div className="flex items-center gap-1.5 text-gray-400 text-xs sm:text-sm">
              //           <Clock size={13} />
              //           {item.time}
              //         </div>
              //       </div>

              //       <div className="flex flex-col items-end gap-2 shrink-0">
              //         <span
              //           className={`px-2.5 sm:px-4 py-1 sm:py-1.5 rounded-md text-xs sm:text-sm font-semibold whitespace-nowrap ${
              //             item.open
              //               ? "bg-[#dff4e6] text-[#12994c]"
              //               : "bg-gray-100 text-gray-500"
              //           }`}
              //         >
              //           {item.open ? "Đang mở" : "Đã đóng"}
              //         </span>
              //         <button className="hidden sm:flex items-center gap-1 text-xs text-gray-400 hover:text-black transition">
              //           Chỉ đường <ChevronRight size={13} />
              //         </button>
              //       </div>
              //     </div>
              //   ))}
              // </div>
            )}
          </section>
        </div>
      </div>
    </main>
  );
}
