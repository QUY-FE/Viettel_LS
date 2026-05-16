"use client";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

const AdminLogin = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const onSubmit = async (data) => {
    try {
      const res = await axios.post(
        "http://localhost:5000/api/users/admin-login",
        data,
        {
          headers: { "Content-Type": "application/json" },
        },
      );

      const auth = res.data;
      if (auth.token) {
        localStorage.setItem("token", auth.token);
        setTimeout(() => {
          localStorage.removeItem("token");
          toast.info("Hết hạn truy cập, hãy đăng nhập lại");
          router.push("/admin");
        }, 3600 * 1000);

        toast.success("Đăng nhập thành công");
        router.push("/admin/dashboard");
      }
    } catch (error) {
      console.error(error);
      toast.error("Đăng nhập thất bại");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className=" p-8 rounded-lg shadow-md w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-800">
            Admin Control Panel
          </h1>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label
              className="block text-sm font-medium text-gray-700 mb-2"
              htmlFor="username"
            >
              Username
            </label>
            <input
              id="username"
              type="text"
              {...register("username", { required: "Vui lòng nhập username" })}
              className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all ${
                errors.username
                  ? "border-red-500 focus:ring-red-300"
                  : "border-gray-300"
              }`}
            />
            {errors.username && (
              <span className="text-red-500 text-xs mt-1 block">
                {errors.username.message}
              </span>
            )}
          </div>

          <div>
            <label
              className="block text-sm font-medium text-gray-700 mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              {...register("password", {
                required: "Vui lòng nhập password",
              })}
              className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all ${
                errors.password
                  ? "border-red-500 focus:ring-red-300"
                  : "border-gray-300"
              }`}
            />
            {errors.password && (
              <span className="text-red-500 text-xs mt-1 block">
                {errors.password.message}
              </span>
            )}
          </div>

          <div className="flex justify-center lg:gap-4 gap-2">
            <Link href={"/"} className="cst_btn-icon">
              Trang chủ
            </Link>
            <button type="submit" className="cst_btn-primary">
              Đăng nhập
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
