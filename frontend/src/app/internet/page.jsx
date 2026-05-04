import { MonitorPlay, ShieldCheck, Wifi, Zap } from "lucide-react";
import React from "react";

const MockData = [
  {
    _id: "1",
    type: "internet",
    name: "METNN_V1",
    features: [
      "Băng thông tối thiểu: 150Mbps",
      "Miễn phí modem Wifi 6",
      "Tích hợp truyền hình TV360",
    ],
    price: 165.0,
    description: "",
    slug: "metnn_v1",
    image: "",
    totalBuy: 0,
  },
];

const page = () => {
  return (
    <div className="max-w-7xl mx-auto min-h-screen px-2 lg:px-4">
      <div className="w-full h-[30vh] bg-grayMedium rounded-lg shadow-lg my-4 border-b border-grayMedium flex items-center justify-center">
        Đăng ký Internet cho ngôi nhà của bạn
      </div>

      <h1 className="my-4 font-bold text-3xl text-center">
        Internet
        <span className="font-magistral text-primary"> Viettel</span>
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-2">
        {MockData.map((item) => (
          <div
            key={item._id}
            className=" rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300 
            px-4 pt-6 pb-2 border-t-4 border-primary transform "
          >
            <div className="bg-red-50  p-2 rounded-xl flex items-center justify-center gap-2 mb-4 text-primary">
              <Wifi size={26} />
              <h3 className="text-xl font-bold font-magistral">{item.name}</h3>
            </div>
            <ul className="space-y-3 my-4 text-sm ">
              <li className="flex items-center">
                <Zap size={16} className="text-green-500 mr-2" /> Băng thông tối
                thiểu: {item.features[0].split(": ")[1]}
              </li>
              <li className="flex items-center">
                <ShieldCheck size={16} className="text-green-500 mr-2" />{" "}
                {item.features[1]}
              </li>
              <li className="flex items-center">
                <MonitorPlay size={16} className="text-green-500 mr-2" />{" "}
                {item.features[2]}
              </li>
            </ul>
            <div className="text-2xl font-bold text-primary mb-2">
              Từ {item.price.toLocaleString()}đ
              <span className="text-sm text-[#B5B4B4] font-normal">/tháng</span>
            </div>
            <div className="w-full flex items-center justify-around mb-2 lg:mb-4">
            <button className="cst_btn-secondary">Chi tiết</button>
            <button className="cst_btn-primary">Đăng ký</button>

            </div>
          </div>
        ))}

        
      </div>
    </div>
  );
};

export default page;
