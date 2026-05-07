import React from "react";
import Image from "next/image";
import { Eye } from "lucide-react";
import Breadcrumb from "#/components/ui/Breadcrumb";

const page = () => {
  const breadcrumbItems = [
      { label: "Tin tức", href: "/news" },
    ]
  return (
    <div className="max-w-7xl mx-auto min-h-screen px-2 lg:px-4 mt-4">
      <Breadcrumb items={breadcrumbItems} />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {[
          {
            img: "/goicuoc1.jpg",
            tag: "Công nghệ",
            title: "Viettel chính thức phủ sóng 5G tại trung tâm TP Lạng Sơn",
            date: "10/04/2026",
            desc: "Trải nghiệm tốc độ mạng siêu nhanh lên đến 1Gbps ngay tại quảng trường Hùng Vương và các tuyến đường trọng điểm.",
          },
          
        ].map((news, i) => (
          <div key={i} className="bg-white group cursor-pointer">
            <div className="relative overflow-hidden rounded-2xl mb-1 lg:mb-4 h-56">
              <Image
                src={news.img}
                alt={news.title}
                fill
                className="object-cover transform group-hover:scale-105 transition-transform duration-500"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                style={{ borderRadius: '1rem' }}
                priority={i < 2}
              />
              <div className="absolute top-4 left-4 bg-primary text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                {news.tag}
              </div>
            </div>
            <h3 className="text-lg lg:text-xl font-bold text-black group-hover:text-primary transition-colors line-clamp-2">
              {news.title}
            </h3>

            <div className="flex items-center justify-between text-grayMedium text-xs  mb-2 font-medium">
            <p className=" flex items-center gap-[2px]"><Eye  size={20}/> 1664</p>

            <p >
              {news.date}
            </p>
            
            </div>
            
          </div>
        ))}
      </div>
    </div>
  );
};

export default page;
