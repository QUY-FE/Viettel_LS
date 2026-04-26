"use client";

import Image from "next/image";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

const BANNER_DATA = [
  { id: 1, src: "/goicuoc9.jpg", alt: "Gói cước 9" },
  { id: 2, src: "/TH6.png", alt: "Truyền hình 360" },
  { id: 3, src: "/goicuoc9.jpg", alt: "Khuyến mãi viễn thông" },
];

const Banner = () => {
  return (
    <section className="max-w-screen-xl mx-auto my-4 px-4">
      <div className="relative h-[350px] md:h-[450px] lg:h-[500px] rounded-xl overflow-hidden shadow-sm ">
        <Swiper
          spaceBetween={0}
          centeredSlides={true}
          loop={true}
          autoplay={{
            delay: 4000,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
            dynamicBullets: true,
          }}
          navigation={true}
          modules={[Autoplay, Pagination, Navigation]}
          className="h-full w-full"
        >
          {BANNER_DATA.map((banner) => (
            <SwiperSlide key={banner.id}>
              <div className="relative w-full h-full bg-gray-100">
                <Image
                  src={banner.src}
                  alt={banner.alt}
                  fill
                  priority={banner.id === 1}
                  className="object-cover lg:object-contain"
                  sizes="(max-width: 1280px) 100vw, 1280px"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <style jsx global>{`
        .swiper-button-next,
        .swiper-button-prev {
          color: #fff;
          background: rgba(0, 0, 0, 0.2);
          width: 40px;
          height: 40px;
          border-radius: 50%;
        }
        .swiper-button-next:after,
        .swiper-button-prev:after {
          font-size: 18px;
          font-weight: bold;
        }
        .swiper-pagination-bullet-active {
          background: #F2F2F2 !important;
        }
      `}</style>
    </section>
  );
};

export default Banner;