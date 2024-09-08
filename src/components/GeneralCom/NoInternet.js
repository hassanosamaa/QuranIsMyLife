import React from "react";
import noInternet from "../../../public/internet.png";
import Image from "next/image";

export default function NoInternet() {
  return (
    <div className="bg-[#ff643d63] min-h-screen">
      <div className="container mx-auto">
        <div className="min-h-screen flex justify-center items-center">
          <Image className="w-full h-full " src={noInternet} alt="wifi" />
        </div>
      </div>
    </div>
  );
}
