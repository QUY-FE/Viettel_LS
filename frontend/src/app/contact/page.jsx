"use client";
import { useForm } from "react-hook-form";
import {
  User,
  Phone,
  MapPin,
  AlertCircle,
  FileText,
  Clock,
  Mail,
  PhoneCall,
} from "lucide-react";

export default function SupportForm() {
  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8">
        {/* FORM */}
        <div className="bg-white p-6 rounded-2xl shadow">
          <h2 className="text-2xl font-semibold mb-6 text-primary">
            Liên hệ hỗ trợ
          </h2>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Name */}
            <div className="flex items-center border rounded-lg px-3">
              <User className="w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Họ và tên"
                className="w-full px-2 py-2 outline-none"
                {...register("name")}
              />
            </div>

            {/* Phone */}
            <div className="flex items-center border rounded-lg px-3">
              <Phone className="w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Số điện thoại"
                className="w-full px-2 py-2 outline-none"
                {...register("phone")}
              />
            </div>

            {/* Address */}
            <div className="flex items-center border rounded-lg px-3">
              <MapPin className="w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Địa chỉ"
                className="w-full px-2 py-2 outline-none"
                {...register("address")}
              />
            </div>

            {/* Select */}
            <div className="flex items-center border rounded-lg px-3">
              <AlertCircle className="w-5 h-5 text-gray-400" />
              <select
                className="w-full px-2 py-2 outline-none bg-transparent"
                {...register("issue")}
              >
                <option value="">-- Chọn sự cố --</option>
                <option value="internet">Mất mạng</option>
                <option value="tv">Lỗi truyền hình</option>
                <option value="billing">Thanh toán</option>
                <option value="other">Khác</option>
              </select>
            </div>

            {/* Another */}
            <div className="flex items-start border rounded-lg px-3 py-2">
              <FileText className="w-5 h-5 text-gray-400 mt-1" />
              <textarea
                placeholder="Mô tả thêm"
                className="w-full px-2 outline-none h-24"
                {...register("another")}
              />
            </div>

            {/* Buttons */}
            <div className="flex gap-3">
              <button className="cst_btn-primary px-6 py-2 rounded-lg">
                Gửi
              </button>
              <button
                type="button"
                className="cst_btn px-6 py-2 rounded-lg"
                onClick={() => window.history.back()}
              >
                Quay lại
              </button>
            </div>
          </form>
        </div>

        {/* INFO */}
        <div className="space-y-6">
          {/* Map */}
          <div className="bg-white p-4 rounded-2xl shadow">
            <h3 className="font-semibold mb-3 text-primary">Bản đồ</h3>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3703.793322675005!2d106.76644507601324!3d21.826914959885848!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x36b54dcce61a7c1b%3A0x4986611b9233b67e!2zVG_DoCBuaMOgIFZpZXR0ZWwgTOG6oW5nIFPGoW4!5e0!3m2!1svi!2s!4v1777543448161!5m2!1svi!2s"
            className="w-full h-64 rounded-lg border"
             />
          </div>

          {/* Contact */}
          <div className="bg-white p-4 rounded-2xl shadow space-y-3">
            <h3 className="font-semibold text-primary">Thông tin liên hệ</h3>

            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-primary" />
              <p>8h - 18h</p>
            </div>

            <div className="flex items-center gap-2">
              <PhoneCall className="w-5 h-5 text-primary" />
              <p>1900 1234</p>
            </div>

            <div className="flex items-center gap-2">
              <Mail className="w-5 h-5 text-primary" />
              <p>support@gmail.com</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
