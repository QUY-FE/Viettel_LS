"use client";
import React, { useState } from "react";

const SimPage = () => {
  const [activeTab, setActiveTab] = useState("prepaid");
  return (
    <div className="max-w-7xl mx-auto min-h-screen mt-4">
      <div className="w-full h-[30vh] bg-grayMedium rounded-lg my-4"></div>

      <div className="hidden sm:flex space-x-2 justify-between items-center mt-4 border-b pb-4 ">
      <h1 className="my-4 font-bold text-3xl text-center">
        Sim
        <span className="font-magistral text-primary"> Viettel</span>
      </h1>
        <div className="flex items-center justify-center gap-2">
          <button className="bg-[#EE0033] text-white px-4 py-2 rounded-full text-sm font-medium">
            Sim trả trước
          </button>
          <button className="bg-[#F2F2F2] text-[#44494D] px-4 py-2 rounded-full text-sm font-medium hover:bg-gray-200">
            Sim trả sau
          </button>
        </div>
      </div>
    </div>
  );
};

export default SimPage;
