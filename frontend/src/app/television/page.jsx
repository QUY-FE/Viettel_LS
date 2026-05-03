"use client";
import { ChevronDown } from "lucide-react";
import { useState } from "react";

const faqData = [
  {
    question:
      "Truyền hình Viettel có đặc điểm gì khác so với truyền hình cáp thông thường?",
    answer: [
      "Điểm khác biệt của truyền hình Viettel so với dịch vụ truyền hình cáp truyền thống là đặc tính tương tác và được chủ động lựa chọn nội dung xem.",
      "Giải trí theo yêu cầu: xem phim, nghe nhạc với kho nội dung phong phú và được cập nhật thường xuyên, cùng nhiều chương trình giải trí hấp dẫn dành cho thiếu nhi. Tính năng tiên tiến: xem lại, tua lại, tạm dừng, xem hai màn hình…",
      "Dịch vụ giá trị gia tăng hấp dẫn: đọc báo điện tử.",
    ],
  },
  {
    question:
      "Tôi chỉ thích xem thể thao trên truyền hình chứ không quan tâm đến các nội dung khác, vậy truyền hình Viettel có các kênh thể thao hấp dẫn không?",
    answer: [
      "Để đáp ứng nhu cầu giải trí thể thao với các trận bóng đá đỉnh cao của giải Anh, Ý, Tây Ban Nha và Supper Sunday, Viettel đã tích hợp trên dịch vụ TV360.",
      "Vui lòng liên hệ hotline 0868.61.86.63 để được tư vấn miễn phí.",
    ],
  },
  {
    question:
      "Tôi muốn xem kênh địa phương nơi tôi sinh sống, vậy dịch vụ truyền hình Viettel có đáp ứng không?",
    answer: [
      "Truyền hình Viettel có 26 kênh truyền hình địa phương, phân bổ đều khắp các miền trên lãnh thổ Việt Nam.",
      "Số lượng kênh sẽ được điều chỉnh phù hợp với nhu cầu khách hàng.",
    ],
  },
  {
    question:
      "Nhà tôi đồng thời sử dụng nhiều tivi, vậy có cách nào để giảm thiểu chi phí đầu tư ban đầu không?",
    answer: [
      "Nên sử dụng đường truyền cáp quang Viettel để dùng dịch vụ cho nhiều tivi cùng lúc.",
      "Mỗi tivi cần 1 đầu thu nhưng Viettel có ưu đãi khi lắp đặt cho nhiều tivi.",
    ],
  },
  {
    question:
      "Tôi chỉ muốn mua 1 đầu thu để dùng cho nhiều tivi, như vậy có được không?",
    answer: [
      "Có thể sử dụng cáp HDMI và AV hoặc bộ chia AV để chia ra nhiều tivi.",
      "Tuy nhiên, các tivi sẽ phải xem cùng một nội dung tại cùng thời điểm.",
    ],
  },
  {
    question:
      "Làm thế nào để kiểm soát chi phí mua thêm nội dung từ các dịch vụ giá trị gia tăng?",
    answer: [
      "Có thể cài đặt mật khẩu để quản lý việc mua nội dung.",
      "Có thể tra cứu lịch sử và chi phí ngay trên màn hình tivi.",
    ],
  },
];

const TelevisionPage = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleItem = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };
  return (
    <div className="max-w-7xl mx-auto min-h-screen mt-4">
      <div className="w-full h-[30vh] bg-grayMedium rounded-lg shadow-lg">Image</div>

      <h1 className="my-4 font-bold text-3xl text-center">
        Truyền Hình{" "}
        <span className="font-magistral text-primary"> Viettel</span> TV360
      </h1>
      <h3 className="my-4 font-bold text-xl">
        Giới thiệu dịch vụ truyền hình Viettel TV
      </h3>
      <p>
        Truyền hình Viettel TV là dịch vụ chạy trên hạ tầng internet cáp quang
        GPON của Viettel, khách hàng có thể xem kênh truyền hình độ nét cao và
        các nội dung theo yêu cầu (Phim, ca nhạc, tua lại, xem lại …) thông qua
        đầu thu Viettel TV Box giúp khách hàng được trải nghiệm các tính năng ưu
        việt chỉ có ở dịch vụ truyền hình của Viettel.
      </p>
      <h3 className="my-4 font-bold text-xl">
        Các tiện ích khác trên hệ thống truyền hình Viettel TV
      </h3>
      <ul className="list-disc list-inside">
        <li>
          Dịch vụ giáo dục: cung cấp các Video bài giảng cho học sinh cấp 1, 2,
          3.
        </li>
        <li>Dịch vụ đọc báo điện tử trên online TV.</li>
        <li>
          Dịch vụ thông tin Mua sắm & Thị trường: cung cấp giá và hướng dẫn tiêu
          dùng tại hàng loạt các siêu thị lớn như: Big C, Metro, Media Mart…
        </li>
        <li>
          Dịch vụ Video theo yêu cầu (Video on Demand – VOD): quý khách sẽ được
          thỏa thích lựa chọn và xem video từ phim hành động gay cấn đến tình
          cảm hài hước, video thời sự, ca nhạc, thời trang…Đặc biệt video của
          các trận bóng đá, phim mới nhất sẽ được cập nhật thường xuyên.
        </li>
        <li>
          Dịch vụ âm nhạc theo yêu cầu ( Music on Demand – MOD): dịch vụ sẽ đem
          lại cho bạn những giây phút thực sự thư giãn và hài lòng với những
          video âm nhạc, nhạc mp3 phong phú và được cập nhật liên tục.
        </li>
        <li>
          {" "}
          Biến TV thường thành TV thông minh: khách hàng có thể tự cài đặt thêm
          hàng ngàn ứng dụng từ kho ứng dụng Google Play như Youtube, Facebook
          Watch, ứng dụng xem phim Online, nghe nhạc, đọc báo, chơi game…
        </li>
      </ul>
      <h3 className="my-4 font-bold text-xl">
        Điều kiện sử dụng dịch vụ truyền hình Viettel TV
      </h3>
      <ul className="list-disc list-inside">
        <li>
          {" "}
          Đường truyền internet cáp quang Viettel: khách hàng có thể đăng ký
          đồng thời combo dịch vụ internet cáp quang + truyền hình Viettel TV
          hoặc đăng ký thêm dịch vụ truyền hình Viettel TV trên đường truyền
          internet cáp quang có sẵn.
        </li>
        <li>
          Đầu thu Viettel TV Box: Bộ giải mã chuyển đổi tín hiệu từ internet
          sang truyền hình.
        </li>
      </ul>
      <h3 className="my-4 font-bold text-xl">
        Gói cước khuyến mãi đăng ký lắp đặt dịch vụ truyền hình Viettel TV
      </h3>
      <div className="w-full h-[30vh] bg-grayMedium rounded-lg">API </div>

      <h3 className="my-4 font-bold text-xl">
        Các câu hỏi thường gặp về dịch vụ truyền hình Viettel TV
      </h3>

      <div className="space-y-4">
        {faqData.map((item, index) => (
          <div
            key={index}
            className="border rounded-xl shadow-sm overflow-hidden"
          >
            <button
              onClick={() => toggleItem(index)}
              className="w-full flex items-center gap-3 text-left p-4 bg-gray-100 hover:bg-gray-200 transition font-semibold"
            >
              <ChevronDown size={20} />
              {item.question}
            </button>

            {activeIndex === index && (
              <div className="p-4 space-y-2 bg-white text-gray-700">
                {item.answer.map((line, i) => (
                  <p key={i}>– {line}</p>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      <button className="cst_btn-primary">Tư vấn miễn phí</button>
    </div>
  );
};

export default TelevisionPage;
