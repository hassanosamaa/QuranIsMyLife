import Image from "next/image";
import Link from "next/link";
import bgSvg from "../../../public/bgSvg.svg";

export default function Card({ title, src, classStyle, url }) {
  return (
    <Link
      href={`${url}`}
      className={`${classStyle} 
       overflow-hidden flex flex-col md:gap-[30px] justify-between rounded-[32px] relative  `}
    >
      <div className="absolute bottom-0 left-0 right-0 w-full  ">
        <Image className="w-full " src={bgSvg} alt={title} />
      </div>
      <div className="p-[15px] md:p-[30px] text-right">
        <h2 className="text-[#004B40]  font-[700] text-[20px] md:text-[50px] leading-[19.5px]">
          {title}
        </h2>
      </div>
      <div>
        <Image
          src={src}
          className=" w-[180px] sm:w-[380px] h-[100px] sm:h-[250px] relative z-10 "
          alt="background"
        />
      </div>
    </Link>
  );
}
