"use client";

import React, { useRef, useState } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  PhoneCall,
  Search,
  Menu,
  X,
  TvMinimal,
  Rss,
  CardSim,
  UserPlus,
  PencilLine,
  Clock4,
  Info,
} from "lucide-react";
import SearchDropdown from "../common/SearchDropdown";
import TopBar from "../ui/TopBar";

const navList = [
  { name: "Internet", icon: <Rss size={18} />, href: "/internet" },
  { name: "Truyền hình", icon: <TvMinimal size={18} />, href: "/television" },
  { name: "Di động", icon: <CardSim size={18} />, href: "/sim" },
  { name: "Chữ ký số", icon: <PencilLine size={18} />, href: "/digitalSignature" },
  { name: "Tin tức", icon: <Clock4 size={18} />, href: "/news" },
];

const actionList = [
  { name: "Tuyển dụng", href: "/tuyendung", icon: <UserPlus size={16} /> },
  { name: "Liên hệ", icon: <PhoneCall size={18} />, href: "/contact" },
];



const Header = () => {
  const path = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const menuRef = useRef(null);


  // Đóng menu khi click ra ngoài
  React.useEffect(() => {
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
              src="/Logo.png"
              alt="Logo Viettel Lạng Sơn"
              width={140}
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
                        ? "text-primary font-semibold"
                        : "text-grayNormal hover:text-primary"
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

            {/* ── SEARCH DROPDOWN ── */}
            <SearchDropdown isSearchOpen={isSearchOpen} setIsSearchOpen={setIsSearchOpen} />
            {/* ── END SEARCH ── */}

            <div className="relative" ref={menuRef}>
              <button
                className="p-2 rounded-full hover:bg-grayLow hover:scale-105 transition-transform flex items-center justify-center"
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
                  <ul className="text-grayNormal">
                    {navList.map((route, index) => (
                      <li key={index}>
                        <Link
                          onClick={() => setIsMenuOpen(false)}
                          href={route.href}
                          className={`flex items-center px-4 py-3 text-sm hover:bg-grayLow ${
                            path === route.href
                              ? "text-primary font-semibold bg-gray-50"
                              : ""
                          }`}
                        >
                          {route.icon && <span className="mr-3">{route.icon}</span>}
                          {route.name}
                        </Link>
                      </li>
                    ))}
                    <li>
                        <Link
                          onClick={() => setIsMenuOpen(false)}
                          href={"/about"}
                          className="flex items-center px-4 py-3 text-sm gap-3 "
                        >
                          <Info size={20}/>
                          Giới thiệu
                        </Link>
                      </li>
                  </ul>
                </div>

                <div className="py-2">
                  <ul className="text-grayNormal">
                    {actionList.map((action, index) => (
                      <li key={index}>
                        <Link
                          onClick={() => setIsMenuOpen(false)}
                          href={action.href}
                          className="flex items-center px-4 py-3 text-sm hover:bg-grayLow "
                        >
                          {action.icon && <span className="mr-3">{action.icon}</span>}
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