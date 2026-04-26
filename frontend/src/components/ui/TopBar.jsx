import { Info, MapPinHouse, PhoneCall, UserSearch } from "lucide-react";
import React from "react";

const TopBar = () => {
  return (
    <div className="hidden lg:block w-full h-[24px]   text-xs bg-gradient-to-tr from-primaryRed  to-red-400 text-white">
      <div className="max-w-screen-xl mx-auto px-4 pt-1">
        <div className="w-full h-full flex items-center justify-end gap-2">
          <p
            className="px-2 border-r-[1px] border-grayLow 
          flex items-center justify-center gap-1 hover:scale-105 transition-transform cursor-pointer"
          >
            <MapPinHouse size={16} />
            Cửa hàng gần bạn
          </p>
          <p className="px-2 border-r-[1px] border-grayLow flex items-center justify-center gap-1 
           hover:scale-105 transition-transform cursor-pointer">
            <UserSearch size={16} />
            Nhân viên khu vực
          </p>
          <p className="px-2 border-r-[1px] border-grayLow flex items-center justify-center gap-1 
           hover:scale-105 transition-transform cursor-pointer">
            <Info size={16}/>
            Giới thiệu
          </p>
          <p className="px-2 flex items-center justify-center gap-1 hover:scale-105 transition-transform cursor-pointer">
            <PhoneCall size={14} /> 1900 0000
          </p>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
