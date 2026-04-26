// app/contact/page.tsx

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-[#f6f7fb] px-6 py-12">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden grid grid-cols-1 md:grid-cols-2">
          <div className="bg-gradient-to-br from-red-600 to-red-500 text-white p-10">
            <h1 className="text-4xl font-bold mb-6">Liên hệ hỗ trợ</h1>

            <p className="text-white/90 text-lg mb-10 leading-8">
              Chúng tôi luôn sẵn sàng hỗ trợ khách hàng nhanh chóng và tận tâm.
            </p>

            <div className="space-y-8">
              <div>
                <p className="text-sm uppercase tracking-widest text-white/70 mb-2">
                  Hotline
                </p>
                <p className="text-3xl font-semibold">1800 8098</p>
              </div>

              <div>
                <p className="text-sm uppercase tracking-widest text-white/70 mb-2">
                  Email
                </p>
                <p className="text-xl font-medium break-all">
                  hotro@viettel.vn
                </p>
              </div>

              <div>
                <p className="text-sm uppercase tracking-widest text-white/70 mb-2">
                  Giờ làm việc
                </p>
                <p className="text-lg">08:00 - 22:00 mỗi ngày</p>
              </div>
            </div>
          </div>

          <div className="p-10">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">
              Form hỗ trợ khách hàng
            </h2>

            <form className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tên
                </label>
                <input
                  type="text"
                  className="w-full h-12 px-4 rounded-xl border border-gray-300 outline-none focus:border-red-500"
                  placeholder="Nhập họ tên"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Số điện thoại
                </label>
                <input
                  type="text"
                  className="w-full h-12 px-4 rounded-xl border border-gray-300 outline-none focus:border-red-500"
                  placeholder="Nhập số điện thoại"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Địa chỉ
                </label>
                <input
                  type="text"
                  className="w-full h-12 px-4 rounded-xl border border-gray-300 outline-none focus:border-red-500"
                  placeholder="Nhập địa chỉ"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Lý do
                </label>
                <textarea
                  rows={5}
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 outline-none resize-none focus:border-red-500"
                  placeholder="Nhập nội dung cần hỗ trợ"
                />
              </div>

              <button
                type="submit"
                className="cst_btn-primary h-12 px-8 rounded-xl text-white font-semibold bg-red-600 hover:bg-red-700 transition"
              >
                Gửi
              </button>
            </form>
          </div>
        </div>
      </div>
    </main>
  )
}