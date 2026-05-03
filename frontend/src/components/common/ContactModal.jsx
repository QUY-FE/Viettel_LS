"use client";
import { useForm } from "react-hook-form";
import BaseModal from "./BaseModal";

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

        <div className="grid grid-cols-2 gap-3">
          <input
            placeholder="Tên"
            className="border rounded-lg px-3 py-2"
            {...register("name")}
          />
          <input
            placeholder="SĐT"
            className="border rounded-lg px-3 py-2"
            {...register("phoneNum")}
          />
        </div>

        <div className="flex justify-end gap-2">
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