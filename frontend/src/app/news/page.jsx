import { ChevronRight } from 'lucide-react'
import React from 'react'

const page = () => {
  return (
    <div className="bg-white min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-end mb-10 border-b border-gray-100 pb-4">
          <div>
            <h1 className="text-4xl font-bold text-[#000000] mb-2">Tin tức Xứ Lạng</h1>
            <p className="text-[#44494D]">Cập nhật tin tức công nghệ, khuyến mãi từ Viettel Lạng Sơn.</p>
          </div>
          <div className="hidden sm:flex space-x-2">
            <button className="bg-[#EE0033] text-white px-4 py-2 rounded-full text-sm font-medium">Mới nhất</button>
            <button className="bg-[#F2F2F2] text-[#44494D] px-4 py-2 rounded-full text-sm font-medium hover:bg-gray-200">Khuyến mãi</button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            { img: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=800&auto=format&fit=crop', tag: 'Công nghệ', title: 'Viettel chính thức phủ sóng 5G tại trung tâm TP Lạng Sơn', date: '10/04/2026', desc: 'Trải nghiệm tốc độ mạng siêu nhanh lên đến 1Gbps ngay tại quảng trường Hùng Vương và các tuyến đường trọng điểm.' },
            { img: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=800&auto=format&fit=crop', tag: 'Khuyến mãi', title: 'Tặng ngay Modem Wifi 6 khi lắp đặt Internet cáp quang mới', date: '08/04/2026', desc: 'Chương trình áp dụng cho khách hàng đóng trước 6 tháng cước từ gói SUN2T trở lên trên toàn tỉnh Lạng Sơn.' },
            { img: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=800&auto=format&fit=crop', tag: 'Cộng đồng', title: 'Viettel Lạng Sơn đồng hành cùng chuyển đổi số cấp Xã', date: '05/04/2026', desc: 'Đội ngũ kỹ thuật đã hoàn thành việc nâng cấp hạ tầng viễn thông cho 5 xã vùng sâu tại huyện Bình Gia.' },
            { img: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&auto=format&fit=crop', tag: 'Dịch vụ', title: 'Ra mắt tính năng thanh toán điện nước tự động qua Viettel Money', date: '01/04/2026', desc: 'Người dân Lạng Sơn giờ đây có thể dễ dàng thanh toán hóa đơn thiết yếu mà không cần đến điểm giao dịch.' }
          ].map((news, i) => (
            <div key={i} className="bg-white group cursor-pointer">
              <div className="relative overflow-hidden rounded-2xl mb-4 h-56">
                <img src={news.img} alt={news.title} className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute top-4 left-4 bg-[#EE0033] text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                  {news.tag}
                </div>
              </div>
              <p className="text-xs text-[#B5B4B4] mb-2 font-medium">{news.date}</p>
              <h3 className="text-xl font-bold text-[#000000] mb-2 group-hover:text-[#EE0033] transition-colors line-clamp-2">{news.title}</h3>
              <p className="text-sm text-[#44494D] line-clamp-3 mb-4">{news.desc}</p>
              <span className="text-[#EE0033] text-sm font-medium flex items-center group-hover:underline">Đọc tiếp <ChevronRight size={16} className="ml-1"/></span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default page
