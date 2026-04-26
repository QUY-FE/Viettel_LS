// File: components/Footer.jsx

import {
  Globe,
  Mail,
  MapPin,
  MessageCircleQuestionMark,
  PencilLine,
  PhoneCall,
  Rss,
  Search,
  ShieldAlert,
  TvMinimal,
} from "lucide-react";

import Image from "next/image";
import Link from "next/link";
import React from "react";

import { FaFacebook, FaInstagram, FaTiktok, FaYoutube } from "react-icons/fa";

const socialArr = [
  {
    name: "Facebook",
    icon: <FaFacebook size={20} color="#0866ff" />,
    link: "https://www.facebook.com/viettellsn",
  },
  {
    name: "Instagram",
    icon: <FaInstagram size={20} color="#e90198" />,
    link: "https://www.instagram.com",
  },
  {
    name: "TikTok",
    icon: <FaTiktok size={20} color="#000000" />,
    link: "https://www.tiktok.com/@viettellangson",
  },
  {
    name: "Youtube",
    icon: <FaYoutube size={20} color="#ff0033" />,
    link: "https://www.youtube.com",
  },
];

const serviceArr = [
  { name: "Di động 5G", icon: Globe, link: "#" },
  { name: "Internet", icon: Rss, link: "#" },
  { name: "Truyền hình số", icon: TvMinimal, link: "#" },
  { name: "Chữ ký số", icon: PencilLine, link: "#" },
];

const supportArr = [
  { name: "Tra cứu cước", icon: Search, link: "#" },
  { name: "Báo hỏng dịch vụ", icon: ShieldAlert, link: "#" },
  { name: "Câu hỏi thường gặp", icon: MessageCircleQuestionMark, link: "#" },
];

function MenuList({ items }) {
  return (
    <ul className="space-y-4 text-sm">
      {items.map((item) => {
        const Icon = item.icon;

        return (
          <li key={item.name}>
            <Link
              href={item.link}
              className="flex items-center gap-2 transition-all hover:text-primaryRed"
            >
              <Icon size={16} />
              <span>{item.name}</span>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}

function Footer() {
  return (
    <footer className="mt-10 text-graynormal border-t-[1px] border-grayLow pt-10 ">
      <div className="mx-auto max-w-7xl px-4 lg:px-0">
        <div className="mb-16 grid gap-12 md:grid-cols-4">
          <div className="space-y-6">
            <Image
              src="/logoDefault.png"
              alt="Viettel Lạng Sơn"
              width={220}
              height={80}
              priority
            />

            <p className="text-justify text-sm leading-relaxed">
              <span className="font-magistral text-primaryRed">
                Viettel Lạng Sơn
              </span>{" "}
              cung cấp các dịch vụ: internet cáp quang, truyền hình, các dịch vụ
              di động và giải pháp dành cho doanh nghiệp.
            </p>
          </div>

          <div>
            <h5 className="mb-6 font-bold text-primaryRed">Dịch vụ</h5>
            <MenuList items={serviceArr} />
          </div>

          <div>
            <h5 className="mb-6 font-bold text-primaryRed">
              Hỗ trợ khách hàng
            </h5>
            <MenuList items={supportArr} />
          </div>

          <div>
            <h5 className="mb-6 font-bold text-primaryRed">Liên hệ</h5>

            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-3">
                <MapPin size={20} className="shrink-0 text-primaryRed" />
                <span>
                  Số 422, đường Hùng Vương, phường Đông Kinh, TP. Lạng Sơn
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={20} className="shrink-0 text-primaryRed" />
                <span>cskh.viettells@gmail.com</span>
              </li>

              <li className="flex items-center gap-3">
                <PhoneCall size={20} className="shrink-0 text-primaryRed" />
                <span>0205 6250 178</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="mx-auto flex max-w-screen-xl flex-col-reverse items-center gap-4 border-t py-2 text-center text-xs text-grayMedium sm:flex-row sm:justify-between">
        <p>
          &copy; 2026{" "}
          <span className="font-magistral text-primaryRed">
            Viettel Lạng Sơn
          </span>
          . All Rights Reserved
        </p>

        <div className="flex items-center gap-2">
          {socialArr.map((item) => (
            <Link
              key={item.name}
              href={item.link}
              target="_blank"
              aria-label={item.name}
              className="flex h-10 w-10 items-center justify-center rounded-full transition-all hover:scale-105 hover:bg-grayLow"
            >
              {item.icon}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
}

export default Footer;
