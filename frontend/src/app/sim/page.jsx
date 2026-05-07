"use client";
import Breadcrumb from "#/components/ui/Breadcrumb";
import React, { useState } from "react";

const SimPage = () => {
  const [activeTab, setActiveTab] = useState(true);

  const handleChangeTab = (tab) => {
    setActiveTab(tab);
  };
   const breadcrumbItems = [
      { label: "Di động", href: "/sim" },

    ];
  return (
    <div className="max-w-7xl mx-auto min-h-screen px-2 lg:px-4">
      <Breadcrumb items={breadcrumbItems} />
      <div className=" sm:flex space-x-2 justify-between items-center border-b pb-4 ">
      <h1 className="my-4 font-bold text-3xl text-center">
        Sim
        <span className="font-magistral text-primary"> Viettel</span>
      </h1>
        <div className="flex items-center justify-center gap-2">
          <button
            className={`px-4 py-2 rounded-full text-sm font-medium ${
              activeTab ? "bg-primary text-white" : "bg-grayLow text-[#44494D] hover:bg-gray-200"
            }`}
            onClick={() => handleChangeTab(true)}
          >
            Sim trả trước
          </button>
          <button
            className={`px-4 py-2 rounded-full text-sm font-medium ${
              !activeTab ? "bg-primary text-white" : "bg-grayLow text-[#44494D] hover:bg-gray-200"
            }`}
            onClick={() => handleChangeTab(false)}
          >
            Sim trả sau
          </button>
        </div>
      </div>

      {
        activeTab ? (
          <h1>tra trước</h1>
        ) : (
          <h1>tra sau</h1>
        )
      }

    </div>
  );
};

export default SimPage;
