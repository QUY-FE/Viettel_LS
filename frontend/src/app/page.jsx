"use client";
import Banner from "#/components/ui/Banner";
import {
  ChevronRight,
  Rss,
  Calendar,
  Clock4,
  Check,
  Tv2,
  CardSim,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Loading from "./Loading";

const fetchProducts = async () => {
  const res = await axios.get("http://localhost:5000/api/products");

  return res.data.data;
};

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

export default function HomePage() {
  const { data: products = [], isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });

  return (
    <div className="max-w-screen-xl mx-auto px-2 lg:px-4">
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <Banner />
          <div className="my-8">
            <h1 className="my-4 text-center text-2xl text-grayNormal">
              <span className="text-3xl font-magistral text-primary font-bold">
                Viettel{" "}
              </span>
              Lạng Sơn
            </h1>
            <p className="text-center text-base lg:text-xl text-grayNormal">
              Nhà cung cấp dịch vụ di động, internet, truyền hình và giải pháp
              công nghệ thông tin
            </p>
          </div>

          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={24}
            slidesPerView={1}
            navigation
            pagination={{ clickable: true }}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
            breakpoints={{
              768: {
                slidesPerView: 2,
              },
              1024: {
                slidesPerView: 3,
              },
            }}
            className="pb-14"
          >
            {products.map((product) => {
              return (
                <SwiperSlide key={product._id}>
                  <Link
                    href={
                      product.category === "internet"
                        ? `/internet/${product.slug}`
                        : product.category === "television"
                          ? `/television/${product.slug}`
                          : "sim"
                    }
                    className="block bg-white rounded-3xl shadow-sm hover:shadow-xl transition-all duration-300 p-4 md:p-6 lg:p-8 border-t-4 border-primary h-full"
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <span className="bg-red-50 text-primary w-16 h-16 rounded-2xl flex items-center justify-center">
                        {product.category === "internet" ? (
                          <Rss />
                        ) : product.category === "television" ? (
                          <Tv2 />
                        ) : (
                          <CardSim />
                        )}
                      </span>

                      <h3 className="text-xl font-bold font-magistral text-primary">
                        {product.nameProduct}
                      </h3>
                    </div>
                    <div className="text-3xl font-bold text-primary mb-6">
                      Từ {product.price}k
                      <span className="text-sm text-[#B5B4B4] font-normal">
                        /tháng
                      </span>
                    </div>
                    <ul className="mt-8 space-y-4 text-sm leading-6 text-gray-600 mb-4">
                      {product.features.length > 0 ? (
                        product.features.map((feature, index) => (
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
                  </Link>
                </SwiperSlide>
              );
            })}
          </Swiper>

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
        </>
      )}
    </div>
  );
}
