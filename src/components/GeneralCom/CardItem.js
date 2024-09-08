import Image from "next/image";
import React from "react";

export default function CardItem({ name, countSuwar, src,rewaya }) {
  return (
    <div className="flex justify-end items-center md:gap-[15px] bg-[#FAFAFA] rounded-[20px] shadow-md p-3">
      <div className="text-right p-3">
        <h2 className="mb-[1px] md:text-[18px] font-[700] text-[black] md:leading-[39px]">
          {name}
        </h2>
        <h3 className=" text-[13px] font-[400] text-[#9D9CA1] leading-[28px]">
          {countSuwar} مقطع صوتي{" "}
        </h3>
        <h3 className=" text-[13px] font-[500] text-[#9D9CA1] leading-[28px]">
          {rewaya}
        </h3>
      </div>
      <div className="w-[114px] h-[81px] rounded-sm overflow-hidden text-right">
        <Image className="w-full h-full " src={src} alt={name}/>
      </div>
    </div>
  );
}
