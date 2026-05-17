"use client";

import Breadcrumb from "#/components/ui/Breadcrumb";
import {
  Search,
  UserRound,
  MapPin,
  Phone,
  ChevronRight,
  Loader2,
  AlertCircle,
  X,
} from "lucide-react";
import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import useDebounce from "#/hooks/useDebounce";

const breadcrumbItems = [{ label: "Tìm kiếm nhân viên khu vực", href: "/search" }];

const fetchStaffs = async () => {
  const response = await axios.get("http://localhost:5000/api/users/all");
  return response.data.filter((item) => item.role === "user");
};

export default function Page() {
  const [query, setQuery] = useState("");

  const debouncedQuery = useDebounce(query, 800);

  const {
    data: staffs = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["staffs"],
    queryFn: fetchStaffs,
    staleTime: 5 * 60 * 1000,
  });

  const filteredStaffs = useMemo(() => {
    if (!debouncedQuery.trim()) return staffs;

    const safeQuery = debouncedQuery.toLowerCase();

    return staffs.filter((item) => {
      if (!item || !item.address) return false;

      return String(item.address).toLowerCase().includes(safeQuery);
    });
  }, [debouncedQuery, staffs]);

  return (
    <main className="relative mx-auto mt-4 min-h-screen max-w-6xl overflow-hidden px-2 lg:px-4">
      <Breadcrumb items={breadcrumbItems} />

      <div className="overflow-hidden rounded-2xl bg-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] sm:rounded-[28px] border border-gray-100">
        <div className="flex flex-col lg:grid lg:grid-cols-[340px_1fr]">
          {/* Sidebar */}
          <aside className="bg-gray-50/50 p-4 sm:p-7 border-b lg:border-b-0 lg:border-r border-gray-100">
            <div className="sticky top-5">
              <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary shadow-sm text-white">
                <UserRound size={28} />
              </div>

              <h2 className="mb-4 text-2xl font-bold leading-tight text-primary sm:text-3xl tracking-tight">
                Tìm kiếm nhân viên
              </h2>

              <p className="text-sm leading-relaxed text-gray-500">
                Nhập tên khu vực, phường/xã hoặc quận/huyện để tra cứu thông tin
                nhân sự phụ trách tuyến của bạn.
              </p>

              <div className="mt-8 rounded-2xl bg-white p-5 border border-gray-100 shadow-sm">
                <p className="mb-3 text-sm font-semibold text-primary">
                  Tổng đài hỗ trợ
                </p>
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <Phone size={14} />
                  </div>
                  <span className="font-medium tracking-wide">1800 8168</span>
                </div>
              </div>
            </div>
          </aside>

          {/* Content */}
          <section className="bg-white p-4 sm:p-6 lg:p-8">
            {/* Search Input */}
            <div className="relative mb-8 group">
              <Search
                size={18}
                className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 transition-colors group-focus-within:text-primary sm:left-6"
              />

              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Nhập khu vực cần tìm kiếm (VD: TP.Lạng Sơn)..."
                className="h-12 w-full rounded-full bg-gray-50 border border-gray-200 pl-11 pr-[110px] text-sm text-gray-700 outline-none transition-all focus:border-primary focus:bg-white focus:ring-4 focus:ring-primary/10 placeholder:text-gray-400 sm:h-14 sm:pl-14 sm:pr-[140px] sm:text-base"
              />

              {/* Nút Xóa (Clear) */}
              {query && (
                <button
                  type="button"
                  onClick={() => setQuery("")}
                  className="absolute right-[80px] top-1/2 -translate-y-1/2 rounded-full p-1.5 text-gray-400 transition-colors hover:bg-gray-200 hover:text-gray-700 sm:right-[105px]"
                  aria-label="Xóa nội dung"
                >
                  <X size={16} strokeWidth={2.5} />
                </button>
              )}

              <button className="absolute right-1.5 top-1.5 h-9 rounded-full bg-primary px-5 text-sm font-medium text-white shadow-sm transition-all hover:bg-primary/90 hover:shadow active:scale-95 sm:right-2 sm:top-2 sm:h-10 sm:px-8">
                Tìm
              </button>
            </div>

            {/* Render Data States */}
            {isLoading ? (
              <div className="flex flex-col items-center justify-center py-24 text-center">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
                <p className="mt-4 text-sm font-medium text-gray-500">
                  Đang đồng bộ dữ liệu...
                </p>
              </div>
            ) : isError ? (
              <div className="text-center text-primary py-8">
            <p>Ops, Có lỗi xảy ra khi tải dữ liệu.</p>
          </div>
            ) : filteredStaffs.length > 0 ? (
              <div className="space-y-4">
                {filteredStaffs.map((item, index) => (
                  <div
                    key={index}
                    className="group flex flex-col gap-4 rounded-2xl border border-gray-100 bg-white p-5 transition-all duration-200 hover:border-primary/30 hover:shadow-[0_4px_20px_rgb(0,0,0,0.03)] sm:flex-row sm:items-center sm:justify-between"
                  >
                    <div className="min-w-0 flex-1">
                      <div className="mb-2 flex items-center gap-3">
                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gray-50 text-gray-500 transition-colors group-hover:bg-primary/10 group-hover:text-primary">
                          <UserRound size={20} />
                        </div>

                        <div>
                          <h3 className="text-base font-bold text-gray-900 sm:text-lg group-hover:text-primary transition-colors">
                            {item.username}
                          </h3>
                          <div className="mt-1 flex items-center gap-1.5 text-sm text-gray-500">
                            <MapPin size={14} className="text-gray-400" />
                            {item.address}
                          </div>
                        </div>
                      </div>

                      <div className="ml-[60px] flex items-center gap-2 text-sm font-medium text-gray-600">
                        <Phone size={14} className="text-gray-400" />
                        {item.phone}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-24 text-center bg-gray-50/50 rounded-2xl border border-dashed border-gray-200">
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-white shadow-sm text-gray-400">
                  <UserRound size={32} strokeWidth={1.5} />
                </div>
                <h3 className="mb-2 text-lg font-semibold text-gray-900">
                  Không tìm thấy kết quả
                </h3>
                <p className="max-w-sm text-sm leading-relaxed text-gray-500">
                  Không có nhân sự nào khớp với từ khóa{" "}
                  <span className="font-medium text-primary">
                    {debouncedQuery}
                  </span>
                  . Vui lòng thử lại với tên khu vực khác.
                </p>
              </div>
            )}
          </section>
        </div>
      </div>
    </main>
  );
}