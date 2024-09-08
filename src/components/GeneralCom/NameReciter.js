import React from "react";

export default function NameReciter({ reciter }) {
  return (
    <>
      <div className="mx-auto p-6 text-center fixed right-0 left-0 bg-gray-950">
        <h2 className="text-[20px] md:text-[30px] font-[400] text-orange-600  ">
           {reciter}
        </h2>
      </div>
      <div className="h-[80px] md:h-[100px]"></div>
    </>
  );
}
