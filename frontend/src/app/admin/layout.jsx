"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import { IoExitOutline } from "react-icons/io5";
import { MdOutlineShoppingCart, MdOutlinePeopleAlt } from "react-icons/md";
import { toast } from "react-toastify";
import Image from "next/image";
import { Box, ChartPie, Clock10 } from "lucide-react";

export default function AdminLayout({ children }) {
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token && pathname !== "/admin") {
      router.replace("/admin");
      return;
    }
    if (token && pathname ===  "/admin" ) {
      router.replace("/admin/dashboard");
    }
  }, [pathname, router]);

  const handleLogout = () => {
    if (!confirm("Bạn có muốn thoát ?")) return;
    try {
      localStorage.removeItem("token");
    } catch (error) {
      console.error("Logout error:", error);
    }
    toast.info("Bạn đã rời khỏi trang Admin");
    router.replace("/admin");
  };

  const menu = [
    {
      name: "Dashboard",
      path: "/admin/dashboard",
      icon: <ChartPie size={20} />,
    },
    { name: "Sản phẩm", path: "/admin/products", icon: <Box size={20} /> },
    {
      name: "Đơn hàng",
      path: "/admin/orders",
      icon: <MdOutlineShoppingCart size={20} />,
    },
    { name: "Tin tức", path: "/admin/news", icon: <Clock10 size={20} /> },
    {
      name: "Người dùng",
      path: "/admin/users",
      icon: <MdOutlinePeopleAlt size={20} />,
    },
  ];

  if (pathname === "/admin") {
    return <div className="min-h-screen ">{children}</div>;
  }

  return (
    <div className="min-h-screen bg-[#F2F2F2] flex flex-col font-sans">
      {/* Header - Fixed top */}
      <header className="sticky top-0 z-50 w-full h-[64px] bg-white border-b border-gray-200 flex items-center justify-between px-6 shadow-sm">
        <div></div>
        {/* Header Actions */}
        <div className="flex items-center gap-5">
          <div className="flex items-center gap-3">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-semibold text-gray-800">
                Administrator
              </p>
              <p className="text-xs text-gray-500">Quản trị viên</p>
            </div>
            <div className="w-10 h-10 relative rounded-full border border-gray-200 p-0.5 overflow-hidden bg-white">
              <Image
                src={"/Banner2.jpg"}
                alt="admin avatar"
                fill
                className="rounded-full object-cover"
              />
            </div>
          </div>

          <div className="h-6 w-px bg-gray-300 mx-2"></div>

          <button
            onClick={handleLogout}
            className="flex items-center justify-center w-10 h-10 text-gray-500 rounded-full hover:bg-red-50 hover:text-primary transition-colors"
            title="Đăng xuất"
          >
            <IoExitOutline size={24} />
          </button>
        </div>
      </header>

      {/* Main Layout Area */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <aside className="w-64 bg-white border-r border-gray-200 flex-shrink-0 shadow-sm hidden md:block">
          <nav className="p-4 space-y-1">
            {menu.map((item) => {
              const isActive = pathname === item.path;
              return (
                <Link
                  key={item.path}
                  href={item.path}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-all duration-200 ${
                    isActive
                      ? "bg-primary/10 text-primary"
                      : "text-gray-600 hover:bg-gray-50 hover:text-primary"
                  }`}
                >
                  {item.icon}
                  {item.name}
                </Link>
              );
            })}
          </nav>
        </aside>

        {/* Content Wrapper */}
        <main className="flex-1 p-6 overflow-auto">
          {/* Bọc children trong một card trắng để nội dung nổi bật trên nền xám */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 min-h-[calc(100vh-120px)]">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
