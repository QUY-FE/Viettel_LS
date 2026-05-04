"use client";

import Image from "next/image";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

const BANNER_DATA = [
  { id: 4, src: "/chuanhoasim.webp", alt: "Chuẩn hoá SIM" },
  { id: 5, src: "/Banner2.jpg", alt: "Khuyến mãi viễn thông" },
  { id: 6, src: "/combo3in1.webp", alt: "Combo 3 in 1" },
];

const Banner = () => {
  return (
    <section className="max-w-screen-xl mx-auto my-4">
      <div className="relative h-[200px] md:h-[450px] lg:h-[500px] rounded-xl overflow-hidden shadow-sm">
        <Swiper
          spaceBetween={0}
          centeredSlides={true}
          loop={true}
          autoplay={{ delay: 4000, disableOnInteraction: false }}
          pagination={{ clickable: true, el: ".custom-pagination" }}
          navigation={{
            prevEl: ".custom-prev",
            nextEl: ".custom-next",
          }}
          modules={[Autoplay, Pagination, Navigation]}
          className="h-full w-full"
        >
          {BANNER_DATA.map((banner) => (
            <SwiperSlide key={banner.id}>
              <div className="relative w-full h-full">
                <Image
                  src={banner.src}
                  alt={banner.alt}
                  fill
                  priority={banner.id === 4}
                  className="object-cover"
                  sizes="(max-width: 1280px) 100vw, 1280px"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Bottom bar: dots trái + arrows phải */}
        <div className="absolute bottom-4 left-0 right-0 z-10 flex items-center justify-between px-5">
          {/* Pagination dots */}
          <div className="custom-pagination flex items-center gap-2" />

          {/* Navigation arrows */}
          <div className="flex items-center gap-2">
            <button className="custom-prev w-9 h-9 rounded-full border border-white/70 bg-white/20 hover:bg-white/35 transition flex items-center justify-center text-white backdrop-blur-sm">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M10 12L6 8L10 4" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            <button className="custom-next w-9 h-9 rounded-full border border-white/70 bg-white/20 hover:bg-white/35 transition flex items-center justify-center text-white backdrop-blur-sm">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M6 4L10 8L6 12" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
        </div>
      </div>

      <style jsx global>{`
        /* Ẩn arrows mặc định của Swiper */
        .swiper-button-next,
        .swiper-button-prev {
          display: none !important;
        }

        /* Pagination dots — pill style như vietteltelecom */
        .custom-pagination .swiper-pagination-bullet {
          width: 8px;
          height: 8px;
          border-radius: 9999px;
          background: rgba(255, 255, 255, 0.5);
          opacity: 1;
          transition: width 0.25s ease, background 0.25s ease;
          margin: 0 !important;
        }
        .custom-pagination .swiper-pagination-bullet-active {
          width: 28px;
          background: rgba(255, 255, 255, 0.95);
        }
      `}</style>
    </section>
  );
};

export default Banner;