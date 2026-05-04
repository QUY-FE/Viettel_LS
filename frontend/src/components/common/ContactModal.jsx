"use client";
import { useForm } from "react-hook-form";
import BaseModal from "./BaseModal";
import { Phone, User } from "lucide-react";

export default function ContactModal({ open, onClose, product }) {
  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    console.log({
      ...data,
      product,
    });
    onClose();
  };

  return (
    <BaseModal open={open} onClose={onClose} title="Liên hệ tư vấn">
      
      <p className="text-[#EE0033] font-bold mb-4">
        {product}
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

        
          <div className="flex items-center border rounded-lg px-3">
              <User className="w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Họ và tên"
                className="w-full px-2 py-2 outline-none"
                {...register("name")}
              />
            </div>
          <div className="flex items-center border rounded-lg px-3">
              <Phone className="w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Số điện thoại"
                className="w-full px-2 py-2 outline-none"
                {...register("phone")}
              />
            </div>
        

        <div className="flex justify-center gap-2">
          <button
            type="button"
            onClick={onClose}
            className="cst_btn px-4 py-2 rounded-lg"
          >
            Đóng
          </button>

          <button
            type="submit"
            className="cst_btn-primary px-4 py-2 rounded-lg"
          >
            Gửi
          </button>
        </div>

      </form>
    </BaseModal>
  );
}