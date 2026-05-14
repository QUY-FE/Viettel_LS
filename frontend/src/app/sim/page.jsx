"use client";
import Breadcrumb from "#/components/ui/Breadcrumb";
import Link from "next/link";
import React, { useState } from "react";

const SimPage = () => {
  const [activeTab, setActiveTab] = useState(true);

  const handleChangeTab = (tab) => {
    setActiveTab(tab);
  };
  const breadcrumbItems = [{ label: "Di động", href: "/sim" }];
  return (
    <div className="max-w-7xl mx-auto min-h-screen px-2 lg:px-4">
      <Breadcrumb items={breadcrumbItems} />
      <div className=" sm:flex space-x-2 justify-between items-center border-b pb-4 ">
        <h1 className="my-4 font-bold text-3xl text-center">
          Sim
          <span className="font-magistral text-primary"> Viettel</span>
        </h1>
        <div className="flex items-center justify-center gap-2">
          <button
            className={`px-4 py-2 rounded-full text-sm font-medium ${
              activeTab
                ? "bg-primary text-white"
                : "bg-grayLow text-[#44494D] hover:bg-gray-200"
            }`}
            onClick={() => handleChangeTab(true)}
          >
            Sim trả trước
          </button>
          <button
            className={`px-4 py-2 rounded-full text-sm font-medium ${
              !activeTab
                ? "bg-primary text-white"
                : "bg-grayLow text-[#44494D] hover:bg-gray-200"
            }`}
            onClick={() => handleChangeTab(false)}
          >
            Sim trả sau
          </button>
        </div>
      </div>

      {activeTab ? (
        <h1>tra trước</h1>
      ) : (
        <>
          <div className="space-y-6">
            <p>
              Khi nhu cầu sử dụng di động ngày càng tăng và khách hàng có nhu
              cầu gọi thoại, SMS (nội mạng và ngoại mạng) và cần lưu lượng data
              cho nhu cầu sử dụng Mobile Internet ngày càng tăng của mình mà
              muốn được hưởng các chính sách chăm sóc khách hàng đặc biệt hoặc
              đơn giản hơn là muốn quản lý chi tiết cước thuê bao mỗi tháng.
            </p>

            <p>
              Như vậy hình thức thuê bao trả sau của <strong>Viettel</strong> sẽ
              là giải pháp vô cùng hợp lý giúp tối ưu chi tiêu di động hàng
              tháng của bạn trong thời điểm hiện nay.
            </p>

            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Lợi ích khi sử dụng dịch vụ di động trả sau Viettel
              </h2>
            </div>

            <div className="space-y-8">
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  1. Cước gọi di động trả sau Viettel rẻ hơn so với trả trước
                </h3>

                <p>
                  Điều mà nhiều người dùng quan tâm chính là cước gọi cả ngoại
                  mạng lẫn nội mạng của thuê bao trả sau sẽ rẻ hơn rất nhiều so
                  với thuê bao trả trước.
                </p>

                <p className="mt-3">
                  Theo thống kê, bạn sẽ tiết kiệm được khoảng từ{" "}
                  <strong>50 - 70%</strong> chi phí nếu dùng thuê bao trả sau
                  Viettel. Bởi vì một lý do rất đơn giản là gói cước trả trước
                  có giá niêm yết đắt hơn gói cước trả sau.
                </p>

                <p className="mt-3">
                  Bạn còn ngần ngại gì mà không chuyển ngay sang dịch vụ di động
                  trả sau của Viettel hoặc chuyển thuê bao trả trước của mình
                  sang gói cước trả sau của Viettel đang khuyến mãi.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  2. Hình thức thanh toán cước di động trả sau Viettel đa dạng
                </h3>

                <p>
                  Đối với dịch vụ di động trả sau Viettel, bạn có thể thanh toán
                  cước phí hàng tháng dưới nhiều hình thức như:
                </p>

                <ul className="list-disc pl-6 mt-3 space-y-2">
                  <li>Thanh toán tại nhà</li>
                  <li>Internet Banking</li>
                  <li>ViettelPay</li>
                  <li>Ủy nhiệm thu</li>
                  <li>Dùng thẻ cào thanh toán</li>
                </ul>

                <p className="mt-3">
                  Ngoài ra, khách hàng còn được chiết khấu <strong>3%</strong>{" "}
                  trên tổng cước thanh toán khi thanh toán qua hình thức thương
                  mại điện tử.
                </p>

                <p className="mt-3">
                  Bên cạnh đó, bạn còn nhận được nhiều chương trình ưu đãi
                  khuyến mãi hấp dẫn.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  3. Sử dụng di động trả sau Viettel không bị gián đoạn cuộc gọi
                </h3>

                <p>
                  Với những thuê bao trả trước khi sắp hết tiền thường sẽ không
                  biết trước được. Vì thế nên bạn rất dễ gặp tình trạng đang gọi
                  thì tắt máy.
                </p>

                <p className="mt-3">
                  Để không bị gặp phải tình trạng này bạn nên chuyển sang thuê
                  bao trả sau để tiện trong việc liên hệ.
                </p>
              </div>
            </div>
          </div>
          <div className="my-10">
            <Link
              href={"https://viettel.vn/vx/di-dong/sim-so/"}
              target="_blank"
              rel="noopener noreferrer"
              className="cst_btn-secondary-icon"
            >
              Mua SIM số trả sau
            </Link>
          </div>
        </>
      )}
    </div>
  );
};

export default SimPage;
