'use client'

import { Search, MapPin, UserRound, PackageSearch } from 'lucide-react'
import { useState } from 'react'

const stores = [
  {
    name: 'Viettel Store TP Lang Sơn',
    address: 'Số 123 Lê Lợi, Phường Vĩnh Trại, TP Lang Sơn',
    time: '08:00 - 22:00',
  },
  {
    name: 'CH Giao Dịch Hữu Lũng',
    address: 'Số 45 Chi Lăng, Thị trấn Hữu Lũng, Lang Sơn',
    time: '08:00 - 18:00',
  },
  {
    name: 'CH Giao Dịch Lộc Bình',
    address: 'Khu 5, Thị trấn Lộc Bình, Lang Sơn',
    time: '08:00 - 17:30',
  },
  {
    name: 'CH Giao Dịch Cao Lộc',
    address: 'Số 88 Quốc Lộ 1A, Cao Lộc, Lang Sơn',
    time: '08:00 - 18:00',
  },
]

export default function Page() {
  const [tab, setTab] = useState('store')

  return (
    <main className="min-h-screen relative overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1516321497487-e288fb19713f?q=80&w=2070&auto=format&fit=crop')",
        }}
      />

      <div className="absolute inset-0 bg-white/75 backdrop-blur-md" />

      <div className="relative z-10 px-8 py-10">
        <div className="max-w-6xl mx-auto mb-6">
          <h1 className="text-5xl font-bold text-black mb-2">
            Tra cứu Viettel
          </h1>
          <p className="text-gray-700 text-lg">
            Tìm kiếm cửa hàng, nhân viên hỗ trợ và sản phẩm dịch vụ nhanh chóng
          </p>
        </div>

        <div className="max-w-6xl mx-auto rounded-[28px] bg-[#f4f4f4]/95 shadow-2xl overflow-hidden">
          <div className="grid grid-cols-[380px_1fr] min-h-[650px]">
            <div className="bg-[#ececec] p-7">
              <h2 className="text-[38px] leading-tight font-bold text-black mb-8">
                Bạn đang tìm kiếm?
              </h2>

              <div className="space-y-4">
                <button
                  onClick={() => setTab('store')}
                  className={`w-full h-16 rounded-2xl flex items-center gap-3 px-6 text-lg font-semibold transition ${
                    tab === 'store'
                      ? 'bg-[#ff0037] text-white shadow-lg'
                      : 'bg-white text-black'
                  }`}
                >
                  <MapPin size={22} />
                  Cửa hàng Viettel gần nhất
                </button>

                <button
                  onClick={() => setTab('staff')}
                  className={`w-full h-16 rounded-2xl flex items-center gap-3 px-6 text-lg font-semibold transition ${
                    tab === 'staff'
                      ? 'bg-[#ff0037] text-white shadow-lg'
                      : 'bg-white text-black'
                  }`}
                >
                  <UserRound size={22} />
                  Nhân viên CSKH khu vực
                </button>

                <button
                  onClick={() => setTab('product')}
                  className={`w-full h-16 rounded-2xl flex items-center gap-3 px-6 text-lg font-semibold transition ${
                    tab === 'product'
                      ? 'bg-[#ff0037] text-white shadow-lg'
                      : 'bg-white text-black'
                  }`}
                >
                  <PackageSearch size={22} />
                  Tra cứu sản phẩm & dịch vụ
                </button>
              </div>
            </div>

            <div className="p-8 bg-[#f8f8f8]">
              <div className="relative mb-7">
                <Search
                  size={22}
                  className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400"
                />

                <input
                  type="text"
                  placeholder={
                    tab === 'product'
                      ? 'Nhập tên sản phẩm hoặc dịch vụ...'
                      : 'Nhập tên đường, phường/xã, quận/huyện tại Lang Sơn...'
                  }
                  className="w-full h-14 rounded-full bg-[#ececec] pl-14 pr-40 outline-none text-gray-700 placeholder:text-gray-400"
                />

                <button className="absolute right-2 top-2 h-10 px-8 rounded-full bg-black text-white font-medium">
                  Tìm kiếm
                </button>
              </div>

              {tab === 'product' ? (
                <div className="grid grid-cols-2 gap-5">
                  {[
                    'Gói 5G Data',
                    'Internet Cáp Quang',
                    'Combo Truyền Hình',
                    'Sim Số Đẹp',
                    'Chữ Ký Số',
                    'Cloud Server',
                  ].map((item, index) => (
                    <div
                      key={index}
                      className="bg-white rounded-2xl border border-gray-200 p-5 hover:shadow-lg transition"
                    >
                      <div className="w-12 h-12 rounded-xl bg-[#ff0037]/10 flex items-center justify-center mb-4">
                        <PackageSearch className="text-[#ff0037]" size={22} />
                      </div>
                      <h3 className="font-bold text-lg text-black mb-2">
                        {item}
                      </h3>
                      <p className="text-gray-500 text-sm">
                        Dịch vụ chính hãng Viettel, hỗ trợ đăng ký nhanh.
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="space-y-5 max-h-[520px] overflow-y-auto pr-2">
                  {stores.map((item, index) => (
                    <div
                      key={index}
                      className="bg-white border border-gray-200 rounded-2xl p-5 flex items-start justify-between"
                    >
                      <div className="pr-5">
                        <div className="flex items-center gap-2 mb-2">
                          <MapPin size={18} className="text-[#ff0037]" />
                          <h3 className="font-bold text-xl text-black">
                            {item.name}
                          </h3>
                        </div>

                        <p className="text-gray-700 mb-2 text-[17px]">
                          {item.address}
                        </p>

                        <p className="text-gray-400 text-[16px]">
                          Giờ mở cửa: {item.time}
                        </p>
                      </div>

                      <span className="shrink-0 bg-[#dff4e6] text-[#12994c] px-4 py-2 rounded-md text-sm font-semibold">
                        Đang mở cửa
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}