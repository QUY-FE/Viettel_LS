"use client";

import React, { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  Package,
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
import TopBar from "../ui/TopBar";

const navList = [
  { name: "Sản phẩm dịch vụ", icon: <Package  size={18} />, href: "/products" },
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

// Gợi ý tìm kiếm mặc định — có thể thay bằng API call thực tế
const suggestions = [
  "Gói cước Internet",
  "Truyền hình Viettel",
  "Sim số đẹp",
  "Chữ ký số",
  "Liên hệ hỗ trợ",
];

const Header = () => {
  const path = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const menuRef = useRef(null);
  const searchRef = useRef(null);
  const searchInputRef = useRef(null);

  // Đóng menu khi click ra ngoài
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsSearchOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Auto-focus input khi mở search dropdown
  useEffect(() => {
    if (isSearchOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isSearchOpen]);

  // Đóng search khi nhấn Escape
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") setIsSearchOpen(false);
    };
    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    // TODO: redirect hoặc call search API
    console.log("Search:", searchQuery);
    setIsSearchOpen(false);
  };

  return (
    <>
      <TopBar />
      <header className="w-full h-[80px] sticky top-0 bg-white z-[1000] border-y-[2px] border-grayLow shadow-sm">
        <div className="max-w-screen-xl mx-auto h-full flex items-center justify-between px-4">
          <Link href="/">
            <Image
              src="/Logo.png"
              alt="Logo Viettel Lạng Sơn"
              width={160}
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
            <div className="relative" ref={searchRef}>
              <button
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className="p-2 rounded-full hover:bg-grayLow hover:scale-105 transition-transform flex items-center justify-center"
                aria-expanded={isSearchOpen}
                aria-label="Mở tìm kiếm"
              >
                <Search size={22} />
                
              </button>

              {/* Overlay backdrop mờ */}
              {isSearchOpen && (
                <div
                  className="fixed inset-0 bg-black/20 backdrop-blur-sm z-[999]"
                  onClick={() => setIsSearchOpen(false)}
                />
              )}

              {/* Search panel dropdown */}
              <div
                className={`
                  fixed left-1/2 -translate-x-1/2
                  top-[82px]
                  w-[min(100vw,80rem)]
                  h-[40vh]
                  bg-white rounded-xl shadow-2xl border border-grayLow
                  z-[1000]
                  flex flex-col
                  transition-all duration-200 origin-top
                  ${isSearchOpen
                    ? "scale-y-100 opacity-100 visible"
                    : "scale-y-95 opacity-0 invisible pointer-events-none"
                  }
                `}
              >
                {/* Search input */}
                <form
                  onSubmit={handleSearch}
                  className="flex items-center gap-3 px-6 pt-6 pb-4 border-b border-grayLow"
                >
                  <Search size={20} className="text-grayNormal shrink-0" />
                  <input
                    ref={searchInputRef}
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Tìm kiếm sản phẩm, dịch vụ..."
                    className="flex-1 text-base outline-none text-gray-800 placeholder:text-gray-400"
                  />
                  {searchQuery && (
                    <button
                      type="button"
                      onClick={() => setSearchQuery("")}
                      className="text-grayNormal hover:text-gray-700 shrink-0"
                    >
                      <X size={18} />
                    </button>
                  )}
                  <button
                    type="submit"
                    className="ml-2 px-4 py-1.5 bg-primary text-white text-sm rounded-full hover:opacity-90 transition-opacity shrink-0"
                  >
                    Tìm
                  </button>
                </form>

                {/* Gợi ý / kết quả */}
                <div className="flex-1 overflow-y-auto px-6 py-4">
                  <p className="text-xs text-grayNormal mb-3 font-medium uppercase tracking-wide">
                    Gợi ý tìm kiếm
                  </p>
                  <ul className="flex flex-wrap gap-2">
                    {suggestions
                      .filter((s) =>
                        searchQuery
                          ? s.toLowerCase().includes(searchQuery.toLowerCase())
                          : true
                      )
                      .map((s, i) => (
                        <li key={i}>
                          <button
                            type="button"
                            onClick={() => setSearchQuery(s)}
                            className="px-3 py-1.5 text-sm rounded-full border border-grayLow bg-gray-50 hover:bg-grayLow hover:text-primary transition-colors"
                          >
                            {s}
                          </button>
                        </li>
                      ))}
                  </ul>
                </div>

                {/* Close hint */}
                <div className="px-6 py-3 border-t border-grayLow flex justify-end">
                  <span className="text-xs text-gray-400">
                    Nhấn <kbd className="px-1 py-0.5 rounded border border-gray-200 font-mono">Esc</kbd> để đóng
                  </span>
                </div>
              </div>
            </div>
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