"use client";
import Link from "next/link";
import { ChevronRight } from "lucide-react";


const Breadcrumb = ({ items }) => {
  return (
    <div className="w-full  rounded-lg p-6 mb-4 flex items-center justify-start relative overflow-hidden">
      {/* Pattern background chìm (tùy chọn) */}
      <div className="absolute inset-0 opacity-10 pointer-events-none bg-[url('/path-to-your-pattern.png')] bg-cover" />
      
      <nav aria-label="Breadcrumb" className="relative z-10">
        <ol className="flex items-center gap-2 text-sm md:text-base ">
          <li>
            <Link href="/" className="hover:text-primary transition-colors">
              Trang chủ
            </Link>
          </li>
          
          {items.map((item, index) => (
            <li key={index} className="flex items-center gap-2">
              <ChevronRight size={20}  />
              {index === items.length - 1 ? (
                <span className="font-bold " aria-current="page">
                  {item.label}
                </span>
              ) : (
                <Link 
                  href={item.href || "#"} 
                  className="hover:text-primary transition-colors"
                >
                  {item.label}
                </Link>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </div>
  );
};

export default Breadcrumb;