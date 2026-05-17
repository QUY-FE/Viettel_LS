"use client";

import ContactModal from "#/components/common/ContactModal";
import Breadcrumb from "#/components/ui/Breadcrumb";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Check, Wifi } from "lucide-react";
import { useParams } from "next/navigation";
import { useState } from "react";
import Loading from "./Loading";

const Page = () => {
  const { slug } = useParams();
  const [open, setOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleContact = (product) => {
    setSelectedProduct(product);
    setOpen(true);
  };
  const breadcrumbItems = [
    { label: "Internet", href: "/internet" },
    { label: slug, href: `/internet/${slug}` },
  ];

  const fetchInternetProductBySlug = async () => {
    const res = await axios.get(`http://localhost:5000/api/products/${slug}`);

    return res.data.data.category === "internet" &&
      res.data.data.status === "Hoạt động"
      ? res.data.data
      : null;
  };

  const {
    data: product,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["internet-product", slug],
    queryFn: fetchInternetProductBySlug,
    enabled: !!slug,
  });

  return (
    <>
      <div className="max-w-7xl mx-auto min-h-screen px-4 py-6">
        <Breadcrumb items={breadcrumbItems} />

        {isLoading && (
          <Loading />
        )}
        {isError && (
          <div className="text-center text-red-500 py-8">
            {error?.message || "Có lỗi xảy ra khi tải dữ liệu."}
          </div>
        )}
        {!isLoading && !isError && !product && (
          <div className="text-center py-8 text-gray-500">Sản phẩm không tồn tại.</div>
        )}

        {product && (
        <div className="grid grid-cols-1 lg:grid-cols-[480px_1fr] overflow-hidden rounded-[32px] border border-primary/10 bg-white shadow-[0_20px_60px_rgba(0,0,0,0.08)]">
          {/* LEFT */}
          <div className="relative overflow-hidden bg-primary/5 p-8 lg:p-10">
            {/* Top Badge */}
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-2 rounded-full bg-white px-5 py-3 text-primary shadow-sm">
                <Wifi size={20} />
                <span className="font-semibold">{product?.category}</span>
              </span>
            </div>

            {/* Circle Effect */}
            <div className="relative mt-20 flex justify-center">
              <div className="absolute w-[320px] h-[320px] rounded-full border border-primary/10" />
              <div className="absolute w-[260px] h-[260px] rounded-full border border-primary/10" />
              <div className="absolute w-[200px] h-[200px] rounded-full border border-primary/10" />

              {/* Main Icon */}
              <div className="relative z-10 flex h-[220px] w-[220px] items-center justify-center rounded-full bg-white shadow-[0_10px_40px_rgba(0,0,0,0.08)]">
                <Wifi size={80} className="text-primary" />
              </div>
            </div>

            {/* Info */}
            <div className="mt-16 text-center">
              <h1 className="text-3xl font-black leading-tight font-magistral text-primary">
                {product?.nameProduct}
              </h1>
            </div>

            {/* Stats */}
            <div className="mx-auto mt-12 flex max-w-[320px] overflow-hidden rounded-3xl bg-white shadow-sm">
              <div className="flex-1 p-5 text-center">
                <h3 className="text-xl font-black text-slate-900">
                  {product?.totalBuy || 0}
                </h3>

                <p className="mt-1 text-slate-500">Đã đăng ký</p>
              </div>

              <div className="w-[1px] bg-slate-200" />

              <div className="flex-1 p-5 text-center">
                <h3 className="text-xl font-black text-slate-900">
                  {product?.totalLike || 0}
                </h3>

                <p className="mt-1 text-slate-500">Yêu thích</p>
              </div>
            </div>

            {/* Bottom Wave */}
            <div className="absolute bottom-0 left-0 h-32 w-full bg-gradient-to-r from-primary/10 via-primary/5 to-transparent blur-2xl" />
          </div>

          {/* RIGHT */}
          <div className="p-8 lg:p-12">
            {/* Price */}
            <div>
              <p className="text-lg font-semibold uppercase tracking-wide text-slate-500">
                Giá cước
              </p>

              <div className="mt-4 flex items-center gap-3">
                <h2 className="text-4xl font-black text-primary">
                  {product?.price?.toLocaleString()}.000
                </h2>

                <span className="mt-1 text-xl text-slate-500">đ/tháng</span>
              </div>
            </div>

            {/* Divider */}
            <div className="my-10 h-[1px] w-full bg-slate-200" />

            {/* Features */}
            <div>
              <h3 className="text-xl font-black text-slate-900">
                Đặc điểm nổi bật
              </h3>

              <div className="mt-8 space-y-6">
                {product?.features?.length > 0 ? (
                  product.features.map((feature, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <Check size={20} className="text-primary" />

                      <p className=" text-slate-700">{feature}</p>
                    </div>
                  ))
                ) : (
                  <p className="text-slate-500">
                    Không có tính năng nào được liệt kê.
                  </p>
                )}
              </div>
            </div>

            {/* Description */}
            {product?.description && (
              <>
                <div className="my-10 h-[1px] w-full bg-slate-200" />

                <div>
                  <h3 className="text-4xl font-black text-slate-900">
                    Mô tả dịch vụ
                  </h3>

                  <p className="mt-6 text-xl leading-relaxed text-slate-600">
                    {product?.description}
                  </p>
                </div>
              </>
            )}

            {/* Buttons */}
            <div className="mt-14 flex lg:items-center  flex-wrap gap-5">
              <button
                className="cst_btn-primary "
                onClick={() =>
                  handleContact(`Tôi muốn đăng ký ${product?.nameProduct}`)
                }
              >
                Đăng ký ngay
              </button>

              <button
                className="cst_btn-secondary"
                onClick={() =>
                  handleContact(
                    `Tôi muốn tư vấn thêm về ${product?.nameProduct}`,
                  )
                }
              >
                Tư vấn thêm
              </button>
            </div>
          </div>
        </div>
        )}
      </div>
      <ContactModal
        open={open}
        onClose={() => setOpen(false)}
        problem={selectedProduct}
      />
    </>
  );
};

export default Page;
