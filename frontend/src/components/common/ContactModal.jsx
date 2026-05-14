"use client";
import { useForm } from "react-hook-form";
import BaseModal from "./BaseModal";
import { MapPin, Phone, User } from "lucide-react";
import axios from "axios";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";


export default function ContactModal({ open, onClose, problem }) {
  const route = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues:{
      name: "",
      phone: "",
      address: "",
      problem: "",
      status: "Đang chờ xử lý",
    }
  });

  const onSubmit = async (data) => {
    const formattedData = {
      ...data,
      problem: `Tôi cần tư vấn về gói ${problem}`,
      status: "Đang chờ xử lý",
    }
    try {
      await axios.post(`http://localhost:5000/api/contacts/create`,
        formattedData,
      );
      toast.success("Yêu cầu của bạn đã được gửi thành công! chúng tôi sẽ liên hệ lại với bạn sớm nhất có thể.", {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
      });
      reset();
      route.push("/");
    } catch (error) {
      toast.error("Có lỗi xảy ra khi gửi yêu cầu. Vui lòng thử lại.", {
        position: "top-right",
        autoClose: 800,
        hideProgressBar: false,
      });
      console.error("Error submitting contact form:", error);
    }
  };

  return (
    <BaseModal open={open} onClose={onClose} title="Liên hệ tư vấn">
      <p className="text-primary font-bold mb-4">{problem}</p>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* name */}
        <div>
          <div className="flex items-center border rounded-lg px-3">
            <User className="w-5 h-5 text-gray-400" />

            <input
              type="text"
              placeholder="Họ và tên"
              className="w-full px-2 py-2 outline-none"
              {...register("name", {
                required: "Vui lòng nhập họ và tên",
                minLength: {
                  value: 2,
                  message: "Họ tên phải có ít nhất 2 ký tự",
                },
              })}
            />
          </div>

          {errors.name && (
            <p className="text-red-500 text-sm mt-1">
              {errors.name.message}
            </p>
          )}
        </div>

        {/* phone */}
        <div>
          <div className="flex items-center border rounded-lg px-3">
            <Phone className="w-5 h-5 text-gray-400" />

            <input
              type="text"
              placeholder="Số điện thoại"
              className="w-full px-2 py-2 outline-none"
              {...register("phone", {
                required: "Vui lòng nhập số điện thoại",
                pattern: {
                  value: /^(0|\+84)[0-9]{9}$/,
                  message: "Số điện thoại không hợp lệ",
                },
              })}
            />
          </div>

          {errors.phone && (
            <p className="text-red-500 text-sm mt-1">
              {errors.phone.message}
            </p>
          )}
        </div>

        {/* Address */}
            <div>
              <div className="flex items-center border rounded-lg px-3">
                <MapPin className="w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Địa chỉ"
                  className="w-full px-2 py-2 outline-none"
                  {...register("address", {   
                    required: "Vui lòng nhập địa chỉ",
                    minLength: {
                      value: 5,
                      message: "Địa chỉ quá ngắn",
                    },
                  })}
                />
              </div>

              {errors.address && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.address.message}
                </p>
              )}
            </div>

        <div className="flex justify-center gap-8">
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