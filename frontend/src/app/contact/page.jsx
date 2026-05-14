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
import Breadcrumb from "#/components/ui/Breadcrumb";
import axios from "axios";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";


const problems = [
  { value: "internet", label: "Mất mạng" },
  { value: "tv", label: "Lỗi truyền hình" },
  { value: "billing", label: "Thanh toán" },
  { value: "other", label: "Khác" },
]



export default function SupportForm() {
  const route = useRouter();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      phone: "",
      address: "",
      problem: "",
      another: "",
      status: "Đang chờ xử lý",
    }
  });
  const onSubmit = async (data) => {
    const formattedData = {
      ...data,
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
    <div className="max-w-6xl mx-auto min-h-screen px-2 lg:px-4">
      <Breadcrumb items={[{ label: "Liên hệ", href: "/contact" }]} />

      <div className="grid md:grid-cols-2 gap-8">
        {/* FORM */}
        <div className="bg-white p-4 lg:p-6 rounded-2xl shadow">
          <h2 className="text-center lg:text-left text-2xl font-semibold mb-6 text-primary">
            Liên hệ hỗ trợ
          </h2>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Name */}
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
                      message: "Tên phải có ít nhất 2 ký tự",
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

            {/* Phone */}
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
                      value: /^(0|\+84)[0-9]{9,10}$/,
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

            {/* problem */}
            <div>
              <div className="flex items-center border rounded-lg px-3">
                <AlertCircle className="w-5 h-5 text-gray-400" />

                <select
                  className="w-full px-2 py-2 outline-none bg-transparent"
                  {...register("problem", {
                    required: "Vui lòng chọn sự cố",
                  })}
                >
                  <option value="">-- Chọn sự cố --</option>
                  {problems.map((problem) => (
                    <option key={problem.value} value={problem.value}>
                      {problem.label}
                    </option>
                  ))}
                </select>
              </div>

              {errors.problem && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.problem.message}
                </p>
              )}
            </div>

            {/* Another */}
            <div>
              <div className="flex items-start border rounded-lg px-3 py-2">
                <FileText className="w-5 h-5 text-gray-400 mt-1" />

                <textarea
                  placeholder="Mô tả thêm"
                  className="w-full px-2 outline-none h-24"
                  {...register("another")}
                />
              </div>

              {errors.another && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.another.message}
                </p>
              )}
            </div>

            {/* Buttons */}
            <div className="flex items-center justify-between lg:justify-end lg:gap-4">
              <button
                type="button"
                className="cst_btn px-6 py-2 rounded-lg"
                onClick={() => window.history.back()}
              >
                Quay lại
              </button>

              <button className="cst_btn-primary px-6 py-2 rounded-lg">
                Gửi
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
