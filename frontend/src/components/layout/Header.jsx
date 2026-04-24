"use client";
import { usePathname } from "next/navigation";
import React, { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { Moon, Newspaper, Package, Phone, PhoneCall, Search, TextAlignJustify, TvMinimal } from "lucide-react";
import TopBar from "../ui/TopBar";

const navList = [
  {
    name: "Sản phẩm & dịch vụ",
    icon: <Package size={18}/>,
    href: "/products",
  },
  {
    name: "Gói cước",
    icon: <Phone size={18}/>,
    href: "/serv",
  },
  {
    name: "Truyền hình",
    icon: <TvMinimal size={18}/>,
    href: "/services",
  },
  {
    name: "Tin tức & sự kiện",
    icon: <Newspaper size={18}/>,
    href: "/news",
  },
  {
    name: "Liên hệ",
    icon: <PhoneCall size={18}/>,
    href: "/contact",
  },
];

const actionList = [
  {
    name: "Ngôn ngữ",
    href: "/",
    icon: null,
  },
  {
    name: "Tuyển dụng",
    href: "/",
    icon: null,
  },
  {
    name: "Giao diện",
    href: "/2",
    icon: <Moon size={16}/>,
  },
  
];

const Header = () => {
  const path = usePathname();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      // Nếu click xảy ra bên ngoài phần tử chứa menuRef thì đóng menu
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  return (
    <>
    <TopBar/>
    <header className="w-full h-[80px] sticky top-0 bg-white z-[1000] border-y-[2px] border-grayLow shadow-sm">
      <div className="max-w-screen-xl mx-auto h-full flex items-center justify-between">
        <Link href={"/"} className="w-2/12 h-full ">
          <Image
            src="/Logo.png"
            alt="logo"
            width={300}
            height={80}
            className="object-contain"
            priority
          />
        </Link>

        <nav className="w-8/12 h-full px-4">
          <ul className="h-full flex items-center space-x-8 px-2 ">
            {navList.map((route,index) => (
              <li key={index}>
                <Link
                  href={route.href}
                  className={
                    path === route.href
                      ? "text-primaryRed font-semibold"
                      : "flex items-center justify-center gap-1 w-full h-full py-4 text-sm hover:text-primaryRed text-graynormal"
                  }
                >
                  {route.icon && <span className="mr-1">{route.icon}</span>}
                  {route.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="w-2/12 h-full flex items-center justify-end gap-2">
          <Link href={"/search"} className="p-2 rounded-full hover:bg-grayLow">
            <Search size={24} />
          </Link>
          <div className="relative" ref={menuRef}>
            <button
              className="p-2 rounded-full hover:bg-grayLow flex items-center justify-center"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <TextAlignJustify size={24} />
            </button>

            <div
              className={
                isMenuOpen
                  ? "block absolute top-12 right-0 w-[200px] min-h-[40vh] bg-white rounded shadow"
                  : "hidden"
              }
            >
              <h1 className="text-center py-2 font-semibold mb-1 border-b-[2px] border-grayLow">
                Menu Content
              </h1>
              <ul className="px-2 py-1 text-graynormal">
                {actionList.map((action, index) => (
                  <li className="p-2  hover:bg-grayLow rounded" key={index}>
                    <Link
                      href={action.href}
                      className="flex items-center w-full h-full text-sm"
                    >
                      {action.icon && <span className="mr-2">{action.icon}</span>}
                      {action.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </header>
    </>
  );
};

export default Header;
