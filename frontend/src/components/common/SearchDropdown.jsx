"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { Search, X, Loader2 } from "lucide-react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import useDebounce from "../../hooks/useDebounce";
import Link from "next/link";



const fetchProducts = async () => {
  const { data } = await axios.get("http://localhost:5000/api/products");
  return data.data;
};

const SearchDropdown = ({ isSearchOpen, setIsSearchOpen }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const debouncedSearchQuery = useDebounce(searchQuery, 300);
  const searchRef = useRef(null);
  const searchInputRef = useRef(null);

  const handleCloseSearch = () => {
    setIsSearchOpen(false);
    setSearchQuery("");
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        handleCloseSearch();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [setIsSearchOpen]);

  useEffect(() => {
    if (isSearchOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isSearchOpen]);

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") handleCloseSearch();
    };
    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [setIsSearchOpen]);

  const {
    data: products = [],
    isLoading,
    isError,
    isFetching,
  } = useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
    staleTime: 1000 * 60 * 5,
  });

  const filteredProducts = useMemo(() => {
    if (!debouncedSearchQuery.trim()) return [];
    const safeQuery = debouncedSearchQuery.toLowerCase().trim();
    return products.filter((item) => {
      if (!item || !item.nameProduct) return false;
      return item.nameProduct.toLowerCase().includes(safeQuery);
    });
  }, [debouncedSearchQuery, products]);

  const isSearching =
    searchQuery.trim() !== debouncedSearchQuery.trim() || isFetching;

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    handleCloseSearch();
  };

  return (
    <div className="relative" ref={searchRef}>
      <button
        onClick={() => {
          if (isSearchOpen) {
            handleCloseSearch();
          } else {
            setIsSearchOpen(true);
          }
        }}
        className="p-2 rounded-full hover:bg-grayLow hover:scale-105 transition-transform flex items-center justify-center"
        aria-expanded={isSearchOpen}
        aria-label="Mở tìm kiếm"
      >
        <Search size={22} />
      </button>

      {isSearchOpen && (
        <div
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-[999]"
          onClick={handleCloseSearch}
        />
      )}

      <div
        className={`
          fixed left-1/2 -translate-x-1/2
          top-[82px]
          w-[min(100vw-2rem,80rem)]
          max-h-[60vh]
          bg-white rounded-xl shadow-2xl border border-grayLow
          z-[1000]
          flex flex-col
          transition-all duration-200 origin-top
          ${
            isSearchOpen
              ? "scale-y-100 opacity-100 visible"
              : "scale-y-95 opacity-0 invisible pointer-events-none"
          }
        `}
      >
        <form
          onSubmit={handleSearchSubmit}
          className="flex items-center gap-3 px-6 pt-6 pb-4 border-b border-grayLow"
        >
          <Search size={20} className="text-grayNormal shrink-0" />
          <input
            ref={searchInputRef}
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Tìm kiếm sản phẩm ..."
            className="flex-1 text-base outline-none text-gray-800 placeholder:text-gray-400"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery("")}
              className="p-1 rounded-full hover:bg-gray-100 text-grayNormal hover:text-gray-700 shrink-0 transition-colors"
            >
              <X size={18} />
            </button>
          )}
          <button
            type="submit"
            disabled={!searchQuery.trim()}
            className="ml-2 px-4 py-1.5 bg-primary text-white text-sm font-medium rounded-full hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed transition-all shrink-0"
          >
            Tìm
          </button>
        </form>

        <div className="flex-1 overflow-y-auto px-6 py-4 custom-scrollbar">
          {searchQuery.trim() ? (
            <>
              <p className="text-xs text-grayNormal mb-3 font-medium uppercase tracking-wide">
                Kết quả tìm kiếm
              </p>
              {isLoading || isSearching ? (
                <div className="flex items-center justify-center py-8 gap-2 text-grayNormal">
                  <Loader2 className="w-5 h-5 animate-spin text-primary" />
                  <span className="text-sm">Đang tìm kiếm...</span>
                </div>
              ) : isError ? (
                <div className="text-red-500 text-sm py-4">
                  Không thể kết nối đến máy chủ.
                </div>
              ) : filteredProducts.length > 0 ? (
                <ul className="flex flex-col gap-1">
                  {filteredProducts.map((product) => (
                    <li key={product._id}>
                      <Link
                      href={
                            product.category === "internet"
                              ? `/internet/${product.slug}`
                              : product.category === "television"
                                ? `/television/${product.slug}`
                                : "#"
                          }
                        onClick={handleCloseSearch}
                        className="w-full text-left px-3 py-2.5 rounded-lg hover:bg-gray-50 text-gray-800 transition-colors flex items-center justify-between group"
                      >
                        <span className="font-medium group-hover:text-primary transition-colors">
                          {product.nameProduct}
                        </span>
                        <span
                          
                          className="text-xs text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          Xem chi tiết →
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="text-center py-8 text-gray-400 text-sm">
                  Không tìm thấy sản phẩm phù hợp cho
                  <span className="font-medium text-gray-600">
                    {searchQuery}
                  </span>
                </div>
              )}
            </>
          ) : null }
        </div>

        <div className="px-6 py-3 border-t border-grayLow flex justify-end bg-gray-50 rounded-b-xl">
          <span className="text-xs text-gray-400">
            Nhấn{" "}
            <kbd className="px-1.5 py-0.5 rounded border border-gray-200 bg-white shadow-sm font-mono text-[10px]">
              Esc
            </kbd>{" "}
            để đóng
          </span>
        </div>
      </div>
    </div>
  );
};

export default SearchDropdown;
