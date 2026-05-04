import Banner from "#/components/ui/Banner";
import { ChevronRight, Wifi, Calendar, Box, Smartphone, Clock4 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

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
    <div className="max-w-screen-xl mx-auto px-2 lg:px-4">
      <Banner />

      <div className="my-8">
        <h1 className="my-4 text-center text-2xl text-grayNormal">
          <span className="text-3xl font-magistral text-primary font-bold">
            Viettel{" "}
          </span>
          Lạng Sơn
        </h1>
        <p className="text-center text-base lg:text-xl text-grayNormal">
          Nhà cung cấp dịch vụ di động, internet, truyền hình và giải pháp công
          nghệ thông tin
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-white rounded-3xl shadow-sm hover:shadow-xl transition-all duration-300 p-2 md:p-6 lg:p-8 border-t-4 border-primary transform ">
          <div className=" flex items-center gap-2 mb-2 lg:mb-4">
            <span className="bg-red-50 w-16 h-16 rounded-2xl flex items-center justify-center mb-2 lg:mb-6">
              {" "}
              <Wifi className="text-primary" size={32} />
            </span>

            <h3 className="text-xl font-bold text-black mb-1 lg:mb-3">
              Internet Cáp Quang
            </h3>
          </div>
          <p className="text-[#44494D] text-sm mb-6 leading-relaxed">
            Tốc độ siêu phàm, mượt mà mọi trải nghiệm. Tặng kèm Modem Wifi 6
            hiện đại phủ sóng toàn bộ ngôi nhà.
          </p>
          <div className="text-3xl font-bold text-primary mb-2 md:mb-6 lg:mb-8">
            Từ 165k
            <span className="text-sm text-[#B5B4B4] font-normal">/tháng</span>
          </div>
          <button className="cst_btn-secondary w-full">
            Đăng ký ngay
          </button>
        </div>

        <div className="bg-white rounded-3xl shadow-sm hover:shadow-xl transition-all duration-300 p-8 border-t-4 border-primary transform ">
          <div className=" flex items-center gap-2 mb-2 lg:mb-4">
            <span className="bg-red-50 w-16 h-16 rounded-2xl flex items-center justify-center mb-2 lg:mb-6">
              {" "}
              <Smartphone className="text-primary" size={32} />
            </span>

            <h3 className="text-xl font-bold text-black mb-1 lg:mb-3">
              Gói Cước Di Động 5G
            </h3>
          </div>
          <p className="text-[#44494D] text-sm mb-6 leading-relaxed">
            Data thả ga, gọi thoại miễn phí. Phủ sóng 4G/5G 100% các xã tại Lạng
            Sơn. Tốc độ kết nối vượt trội.
          </p>
          <div className="text-3xl font-bold text-primary mb-2 md:mb-6 lg:mb-8">
            Từ 90k
            <span className="text-sm text-[#B5B4B4] font-normal">/tháng</span>
          </div>
          <button className="cst_btn-secondary w-full">
            Mua Sim / Gói cước
          </button>
        </div>

        <div className="bg-white rounded-3xl shadow-sm hover:shadow-xl transition-all duration-300 p-8 border-t-4 border-primary transform ">
          <div className=" flex items-center gap-2 mb-2 lg:mb-4">
            <span className="bg-red-50 w-16 h-16 rounded-2xl flex items-center justify-center mb-2 lg:mb-6">
              <Box className="text-primary" size={32} />
            </span>

            <h3 className="text-xl font-bold text-black mb-1 lg:mb-3">
              Smart Home & Camera
            </h3>
          </div>

          <p className="text-[#44494D] text-sm mb-6 leading-relaxed">
            Giải pháp an ninh và nhà thông minh toàn diện bảo vệ gia đình bạn
            24/7. Dễ dàng quản lý qua ứng dụng.
          </p>
          <div className="text-3xl font-bold text-primary mb-2 md:mb-6 lg:mb-8">
            Từ 490k
            <span className="text-sm text-[#B5B4B4] font-normal">
              /thiết bị
            </span>
          </div>
          <button className="cst_btn-secondary w-full">
            Xem chi tiết
          </button>
        </div>
      </div>

      <div className="mt-16 mb-12">
        <div className="my-8 flex items-center justify-between">
          <h1 className="flex items-center justify-center gap-[2px] lg:gap-2 my-4 text-center text-lgx lg:text-3xl text-primary font-bold">
            <Clock4 />
            Tin tức nổi bật
          </h1>
          <Link href="/news" className="cst_btn-secondary-icon">
            Xem thêm <ChevronRight size={20} />
          </Link>
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
              <h3 className="font-bold text-lg text-grayNormal group-hover:text-primary transition-colors line-clamp-2">
                {item.title}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
