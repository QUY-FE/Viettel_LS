import { Link2, Mail, MapPin, PhoneCall, StickyNote } from "lucide-react";
import React from "react";
import Link from "next/link";
const page = () => {
  return (
    <>
      <div className="max-w-[900px] mx-auto min-h-screen px-2">
        <h1 className="my-4 font-bold text-3xl text-center">
          Giới thiệu
          <span className="font-magistral text-primary"> Viettel </span>
          Lạng Sơn
        </h1>
        <div>
          <p className="my-4">
            <span className="font-magistral text-primary">
              Viettel Lạng Sơn
            </span>{" "}
            xin kính gửi tới quý khách hàng lời chào trân trọng và lời cảm ơn
            sâu sắc vì đã quan tâm, ủng hộ đối với Viettel trong suốt thời gian
            qua !
          </p>
          <p>
            - Ngày 20/3/2004, Chi nhánh Viettel Lạng Sơn được thành lập trở
            thành đơn vị cung cấp dịch vụ viễn thông thứ 2 tại tỉnh. Sau 20 năm,
            Viettel Lạng Sơn đã xây dựng được gần 800 vị trí trạm thu phát sóng
            di động 2G, 3G, 4G, 5G và cung cấp cho gần 700.000 thuê bao các
            loại; phát triển hệ thống kênh phân phối gồm 12 cửa hàng trực tiếp,
            2 siêu thị, 168 hộ kinh doanh và hơn 3.000 điểm bán hàng. Qua đó,
            trở thành đơn vị cung cấp dịch vụ viễn thông, công nghệ thông tin số
            1 trên địa bàn tỉnh với 74% thị phần về di động và xấp xỉ 42% về cố
            định băng rộng.
          </p>
          <p className="my-4">
            - Thực hiện sứ mệnh Sáng tạo vì con người, Viettel luôn coi sự sáng
            tạo là kim chỉ nam cho mọi hành động. Sự sáng tạo ấy được Viettel
            thể hiện rõ nét trong triết lý kinh doanh, phương châm hành động
            nhằm mang lại lợi ích tốt nhất cho khách hàng của Viettel nói riêng
            và mọi người dân Việt Nam nói chung.
          </p>
          <p className="my-4">
            - Với triết lý kinh doanh coi mỗi khách hàng là một cá thể riêng
            biệt, có nhu cầu được lắng nghe, chia sẻ, được phục vụ một cách tốt
            nhất và được đối xử công bằng, Viettel Telecom luôn nỗ lực ở mức cao
            nhất để mỗi khách hàng đều được nói theo cách của riêng mình. Đối
            với chúng tôi, sự hài lòng và tin cậy của khách hàng chính là khởi
            nguồn cho sự thịnh vượng và phát triển bền vững.
          </p>
          <p className="my-4">
            - Là doanh nghiệp Viễn thông hàng đầu Việt Nam, bước đầu thành công
            trên thị trường Quốc tế, Viettel hiện đang cung cấp rất nhiều sản
            phẩm, dịch vụ viễn thông, sản phẩm ứng dụng công nghệ thông tin chất
            lượng cao. Với mong muốn cung cấp tới quý khách hàng những dịch vụ
            hoàn hảo, mang lại hiệu quả cao trong công việc. Trân trọng cảm ơn
            sự quan tâm của quý khách !
          </p>
        </div>

        <div className="w-full h-[220px] lg:w-[600px] lg:h-[400px] mx-auto bg-gray-50 rounded-lg my-8">ảnh mô tả</div>
      </div>
      <div className="max-w-7xl mx-auto sm:flex items-center mt-10 p-4">
        <ul className="sm:w-1/2">
          <li className="py-2 lg:text-base text-sm">
            <span className="font-magistral text-primary">
              Viettel Lạng Sơn{" "}
            </span>
            - Chi nhánh tập đoàn CÔNG NGHIỆP VIỄN THÔNG QUÂN ĐỘI
          </li>
          <li className="py-2 flex items-center justify-start gap-2 lg:text-base text-sm">
            <MapPin size={26} />
            Địa chỉ: Số 422, đường Hùng Vương, phường Đông Kinh, TP. Lạng Sơn
          </li>
          <li className="py-2 flex items-center justify-start gap-2 lg:text-base text-sm">
            <StickyNote size={18} />
            Mã số thuế:
          </li>
          <li className="py-2 flex items-center justify-start gap-2 lg:text-base text-sm">
            <PhoneCall size={18} />
            Hotline: 0205 6250 178
          </li>
          <li className="py-2 flex items-center justify-start gap-2 lg:text-base text-sm">
            <Mail size={18} />
            Email:
          </li>
          <li className="py-2 flex items-center justify-start gap-2 lg:text-base text-sm">
            <Link2 size={18} />
            Website:{" "}
            <Link href="https://facebook.com" target="_blank" className="block hover:underline text-primary ">
              https://viettellangson.vn
            </Link>
          </li>
        </ul>
        <div className="sm:w-1/2">
          <div className="bg-white p-4 rounded-2xl shadow">
            <h3 className="font-magistral mb-3 text-primary">Bản đồ</h3>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3703.793322675005!2d106.76644507601324!3d21.826914959885848!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x36b54dcce61a7c1b%3A0x4986611b9233b67e!2zVG_DoCBuaMOgIFZpZXR0ZWwgTOG6oW5nIFPGoW4!5e0!3m2!1svi!2s!4v1777543448161!5m2!1svi!2s"
              className="w-full h-64 rounded-lg border"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default page;
