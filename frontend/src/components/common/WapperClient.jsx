"use client";
import React from "react";
import Header from "../layout/Header";
import Footer from "../layout/Footer";
import { usePathname } from "next/navigation";

const WrapperClient = ({ children }) => {
  const pathname = usePathname();

  const decoration =
    pathname === "/admin" ||
    pathname === "/admin/dashboard" ||
    pathname === "/admin/products" ||
    pathname === "/admin/news" ||
    pathname === "/admin/orders" ||
    pathname === "/admin/users" ||
    pathname === "/admin/users/create" ||
    pathname === "/admin/products/create" ||
    pathname.startsWith("/admin/products/edit/") ||
    pathname.startsWith("/admin/products/") ||
    pathname.startsWith("/blog/");
  return (
    <>
      {decoration ? null : <Header />}
      <main>{children}</main>
      {decoration ? null : <Footer />}
    </>
  );
};

export default WrapperClient;
