"use client";
import React from 'react';
import { useForm } from 'react-hook-form';
import { Wallet, TrendingUp, Gift, GraduationCap, Shirt, MapPin, Users, Handshake } from 'lucide-react';
import Breadcrumb from '#/components/ui/Breadcrumb';

const benefitsData = [
  { id: 1, icon: <Wallet size={20} />, text: 'Thu nhập cơ bản từ 5 triệu đồng trở lên' },
  { id: 2, icon: <TrendingUp size={20} />, text: 'Bình quân ~ 8 trđ/ người/ tháng' },
  { id: 3, icon: <Gift size={20} />, text: 'Hưởng các chính sách thưởng kích thích theo tháng, quý, năm ... nếu đạt KPIs được giao' },
  { id: 4, icon: <GraduationCap size={20} />, text: 'Ứng viên được đào tạo nghiệp vụ' },
  { id: 5, icon: <Shirt size={20} />, text: 'Trang bị công cụ dụng cụ, đồng phục đầy đủ' },
];

const locationsData = [
  'Văn Lãng',
  'Tràng Định',
  'Cao Lộc - Đồng Đăng',
  'Hữu Lũng',
  'TP Lạng Sơn'
];

const breadcrumbItems = [
  { label: "Tuyển dụng", href: "/tuyendung" },
]

const RecruitmentPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log({
        name: data.name,
        phone: data.phone,
        problem: "Ứng tuyển vị trí Nhân viên kinh doanh tại Viettel Lạng Sơn" 
    });
  };

  return (
    <div className="min-h-screen bg-white font-sans text-gray-800 selection:bg-primary selection:text-white">
      <section className="max-w-6xl mx-auto px-4 py-6">
        <Breadcrumb items={breadcrumbItems} />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="border rounded-xl overflow-hidden shadow-sm flex flex-col">
            <div className="bg-primary text-white text-center py-2 font-bold uppercase">
              Quyền lợi hấp dẫn
            </div>
            <div className="bg-grayLow p-5 flex-grow">
              <ul className="space-y-4">
                {benefitsData.map((item) => (
                  <li key={item.id} className="flex items-start">
                    <span className="mr-3 text-primary">{item.icon}</span>
                    <span className="text-sm font-medium">{item.text}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="border rounded-xl overflow-hidden shadow-sm flex flex-col">
            <div className="bg-primary text-white text-center py-2 font-bold uppercase">
              Khu vực tuyển dụng
            </div>
            <div className="bg-grayLow p-5 flex-grow">
              <ul className="space-y-3">
                {locationsData.map((loc, index) => (
                  <li key={index} className="flex items-center">
                    <MapPin className="text-primary mr-2" size={18} />
                    <span className="font-bold">{loc}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="border rounded-xl overflow-hidden shadow-sm flex flex-col">
            <div className="bg-primary text-white text-center py-2 font-bold uppercase">
              Cơ hội dành cho bạn
            </div>
            <div className="bg-grayLow p-5 flex-grow flex flex-col items-center justify-center text-center">
              <div className="mb-6 flex flex-col items-center">
                <Users className="text-primary mb-2" size={40} />
                <p className="font-bold text-lg">SỐ LƯỢNG</p>
                <p className="font-bold text-lg text-primary">KHÔNG GIỚI HẠN</p>
              </div>
              <hr className="w-full border-gray-300 mb-6" />
              <div className="flex flex-col items-center">
                <Handshake className="text-primary mb-2" size={40} />
                <p className="text-sm">Môi trường Viettel</p>
                <p className="font-bold">ỔN ĐỊNH - CHUYÊN NGHIỆP</p>
                <p className="font-bold">PHÁT TRIỂN LÂU DÀI</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-3xl mx-auto px-4 py-8 text-center">
        <form 
          onSubmit={handleSubmit(onSubmit)} 
          className="bg-grayLow p-6 rounded-xl shadow-sm border border-gray-200"
        >
          <h3 className="text-2xl font-bold text-primary mb-6 uppercase">Ứng tuyển ngay</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="flex flex-col text-left">
              <input
                type="text"
                placeholder="Họ và tên"
                className={`p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary ${
                  errors.name ? 'border-primary' : 'border-gray-300'
                }`}
                {...register('name', { required: true })}
              />
              {errors.name && (
                <span className="text-primary text-sm mt-1">Vui lòng nhập họ và tên</span>
              )}
            </div>

            <div className="flex flex-col text-left">
              <input
                type="tel"
                placeholder="Số điện thoại"
                className={`p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary ${
                  errors.phone ? 'border-primary' : 'border-gray-300'
                }`}
                {...register('phone', { 
                  required: true, 
                  pattern: /^(0[3|5|7|8|9])+([0-9]{8})$/ 
                })}
              />
              {errors.phone && (
                <span className="text-primary text-sm mt-1">Số điện thoại không hợp lệ</span>
              )}
            </div>
          </div>
          
          <button type="submit" className="cst_btn-secondary w-full md:w-auto px-8 py-3">
            Đăng ký
          </button>
        </form>
      </section>
    </div>
  );
};

export default RecruitmentPage;