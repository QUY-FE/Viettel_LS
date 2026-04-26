"use client";

import React, { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  Moon,
  Newspaper,
  Package,
  PhoneCall,
  Search,
  Menu,
  X,
  TvMinimal,
  Rss,
} from "lucide-react";
import TopBar from "../ui/TopBar";

const navList = [
  {
    name: "Sản phẩm & dịch vụ",
    icon: <Package size={18} />,
    href: "/products",
  },
  { name: "Internet", icon: <Rss size={18} />, href: "/serv" },
  { name: "Truyền hình", icon: <TvMinimal size={18} />, href: "/services" },
  { name: "Tin tức & sự kiện", icon: <Newspaper size={18} />, href: "/news" },
  { name: "Liên hệ", icon: <PhoneCall size={18} />, href: "/contact" },
];

const actionList = [
  { name: "Ngôn ngữ", href: "/", icon: null },
  { name: "Tuyển dụng", href: "/", icon: null },
  { name: "Giao diện", href: "/2", icon: <Moon size={16} /> },
];

const Header = () => {
  const path = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
      <TopBar />
      <header className="w-full h-[80px] sticky top-0 bg-white z-[1000] border-y-[2px] border-grayLow shadow-sm">
        <div className="max-w-screen-xl mx-auto h-full flex items-center justify-between px-4">
          <Link href="/">
            <Image
              src="/LogoviettelLS.png"
              alt="logo viettel lạng sơn"
              width={260}
              height={60}
              className="object-contain"
              priority
            />
          </Link>

          <nav className="hidden lg:block h-full">
            <ul className="h-full flex items-center space-x-8">
              {navList.map((route, index) => (
                <li key={index} className="h-full">
                  <Link
                    href={route.href}
                    className={`flex items-center justify-center gap-1 w-full h-full text-sm transition-colors ${
                      path === route.href
                        ? "text-primaryRed font-semibold"
                        : "text-graynormal hover:text-primaryRed"
                    }`}
                  >
                    {route.icon && <span className="mr-1">{route.icon}</span>}
                    {route.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center justify-end gap-2">
            <Link
              href="/search"
              className=" py-2 px-2 flex items-center gap-2 text-xs rounded-full bg-grayLow shadow hover:shadow-md"
            >
              <Search size={20} />
              Bạn cần tìm gì?
            </Link>

            <div className="relative" ref={menuRef}>
              <button
                className="p-2 rounded-full hover:bg-grayLow flex items-center justify-center transition-colors"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>

              <div
                className={`absolute top-12 right-0 w-[240px] bg-white rounded-lg shadow-lg border border-grayLow overflow-hidden transition-all duration-200 origin-top-right ${
                  isMenuOpen
                    ? "scale-100 opacity-100 visible"
                    : "scale-95 opacity-0 invisible"
                }`}
              >
                <div className="lg:hidden border-b border-grayLow py-2">
                  <ul className="text-graynormal">
                    {navList.map((route, index) => (
                      <li key={index}>
                        <Link
                          href={route.href}
                          className={`flex items-center px-4 py-3 text-sm hover:bg-grayLow ${
                            path === route.href
                              ? "text-primaryRed font-semibold bg-gray-50"
                              : ""
                          }`}
                        >
                          {route.icon && (
                            <span className="mr-3">{route.icon}</span>
                          )}
                          {route.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="py-2">
                  <ul className="text-graynormal">
                    {actionList.map((action, index) => (
                      <li key={index}>
                        <Link
                          onClick={() => setIsMenuOpen(false)}
                          href={action.href}
                          className="flex items-center px-4 py-3 text-sm hover:bg-grayLow"
                        >
                          {action.icon && (
                            <span className="mr-3">{action.icon}</span>
                          )}
                          {action.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
