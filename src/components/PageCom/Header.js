import React, { useEffect, useState } from "react";
import Image from "next/image";
import sh_1 from "/public/sh_1.png";
import sh_2 from "/public/sh_2.png";
import sh_3 from "/public/sh_3.png";
import sh_4 from "/public/sh_4.png";
import sh_5 from "/public/sh_5.png";
import sh_6 from "/public/sh_6.png";
import AudioHome from "../GeneralCom/AudioHome";

export default function Header() {
  const [isClient, setIsClient] = useState(false); // للتأكد من تشغيل الكود في العميل فقط

  const imagesReciters = [sh_1, sh_2, sh_3, sh_4, sh_5, sh_6];
  const srcReciters = [
    "https://backup.qurango.net/radio/mahmoud_khalil_alhussary_mojawwad",
    "https://backup.qurango.net/radio/mishary_alafasi",
    "https://backup.qurango.net/radio/mohammed_siddiq_alminshawi_mojawwad",
    "https://backup.qurango.net/radio/abdulbasit_abdulsamad_mojawwad",
    "https://backup.qurango.net/radio/mahmoud_ali__albanna",
    "https://backup.qurango.net/radio/nasser_alqatami",
  ];
  const nameReciters = [
    " محمود خليل الحصري",
    " مشاري راشد العفاسي",
    " محمد صديق المنشاوي",
    " عبد الباسط عبد الصمد",
    " محمود علي البنا",
    " ناصر القطامي",
  ];
  const randomNumber = Math.floor(Math.random() * 6);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  }

  return (
    <div className="overflow-hidden flex justify-between items-center pt-5 pr-2  pb-0 shadow-md mb-[18px] rounded-[20px] bg-gradient-to-r from-sky-800 to-sky-400 ">
      <Image
        className="w-[170px] md:w-[480px] h-[170px] md:h-[250px]"
        src={imagesReciters[randomNumber]}
        alt="quran"
      />
      <div className="w-full flex flex-col justify-center items-center gap-5">
        <h2 className="text-[18px] sm:text-[30px] md:text-[50px] text-center font-[500] text-orange-900">
          حياتي مع القران
        </h2>
        <AudioHome src={srcReciters[randomNumber]} />
        <h3 className="text-gray-900 font-[700] text-[12px] md:text-[18px] ">{nameReciters[randomNumber]}</h3>
      </div>
    </div>
  );
}
