import React from "react";

export default function Loading({ countElements }) {
    const arr = new Array(countElements).fill(0);
    

  return (
    <div className="bg-gray-950 min-h-screen">
      <div className="container mx-auto p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  gap-[20px] pt-5 "></div>
        {arr.map((e,i) => {
          return (
            <div key={i} className=" animate-pulse mb-3">
              <div className="flex justify-end items-center md:gap-[15px] bg-gray-600 rounded-[20px] shadow-md p-3">
                <div className="text-right p-3 space-y-2">
                  <h2 className="mb-[1px] md:text-[18px] font-[700] text-[black] md:leading-[39px] rounded-md h-[10px] w-[250px] bg-gray-800"></h2>
                  <h3 className="ml-auto text-[13px] font-[400] bg-gray-800 leading-[28px] h-[20px] w-[100px] rounded-md "></h3>
                </div>
                <div className=" w-[114px] h-[81px] rounded-md overflow-hidden text-right  bg-gray-800"></div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
