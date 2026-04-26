import Banner from "#/components/ui/Banner";
import { ChevronRight, Wifi, Calendar } from "lucide-react";
import Image from "next/image";

export default function HomePage() {
  const news = [
    {
      id: 1,
      title: "Viettel Lạng Sơn bùng nổ ưu đãi lắp đặt Internet trong tháng này",
      date: "25/04/2026",
      image: "/goicuoc1.jpg",
    },
    {
      id: 2,
      title: "Hướng dẫn đăng ký gói cước 5G siêu tốc độ tại khu vực Lạng Sơn",
      date: "24/04/2026",
      image: "/goicuoc7.jpg",
    },
    {
      id: 3,
      title: "Viettel đồng hành cùng chuyển đổi số nông nghiệp địa phương",
      date: "22/04/2026",
      image: "/goicuoc2.jpg",
    },
  ];

  return (
    <div className="max-w-screen-xl mx-auto px-4">
      <Banner />

      <div className="my-8">
        <h1 className="my-4 text-center text-2xl text-graynormal">
          <span className="text-3xl font-magistral text-primaryRed font-bold">
            Viettel{" "}
          </span>
          Lạng Sơn
        </h1>
        <p className="text-center text-xl text-graynormal">
          Nhà cung cấp dịch vụ di động, internet, truyền hình và giải pháp công
          nghệ thông tin
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-shadow p-8 border-t-4 border-primaryRed">
          <div className="bg-red-50 w-16 h-16 rounded-full flex items-center justify-center mb-6">
            <Wifi className="text-primaryRed" size={32} />
          </div>
          <h3 className="text-xl font-bold text-[#000000] mb-2">
            Dịch vụ Internet
          </h3>
          <p className="text-[#44494D] text-sm mb-4">
            Tốc độ cao, mượt mà mọi trải nghiệm. Tặng kèm Modem Wifi 6 hiện đại.
          </p>
          <div className="text-2xl font-bold text-primaryRed mb-6">
            Từ 165.000đ
            <span className="text-sm text-[#B5B4B4] font-normal">/tháng</span>
          </div>
          <button className="cst_btn-primary-icon">
            Xem chi tiết
            <ChevronRight size={20} />
          </button>
        </div>
      </div>

      <div className="mt-16 mb-12">
        <div className="my-8 flex items-center justify-between">
          <h1 className="my-4 text-center text-3xl font-magistral text-primaryRed font-bold">
            Tin tức nổi bật
          </h1>
          <button className="cst_btn-primary-icon">
            Xem tất cả <ChevronRight size={20} />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {news.map((item) => (
            <div key={item.id} className="group cursor-pointer">
              <div className="overflow-hidden rounded-xl mb-4">
                <Image
                  src={item.image}
                  alt={item.title}
                  width={400}
                  height={250}
                  className=" object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="flex items-center gap-2 text-gray-400 text-sm mb-2">
                <Calendar size={14} />
                <span>{item.date}</span>
              </div>
              <h3 className="font-bold text-lg text-graynormal group-hover:text-primaryRed transition-colors line-clamp-2">
                {item.title}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
