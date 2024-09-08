import Home from "@/components/PageCom/Home";
import askar_img from "../../public/askar.png";
import live_img from "../../public/live.png";
import radio_img from "../../public/radio.png";
import tafsir_img from "../../public/tafsir.png";
import rewaya_img from "../../public/rewaya.png";
import quran_img from "../../public/quran.png";

const HomePage = () => {
  
  const data = [
    { name: "الادعية", url: "/askar" ,bg:"bg-red-500" ,src:askar_img},
    { name: "القران الكريم", url: "/reciters",bg:"bg-yellow-500"  ,src:quran_img},
    { name: "القراءات", url: "/rewaya" ,bg:"bg-green-500" ,src:rewaya_img},
    { name: "التفسير", url: "/tafsir" ,bg:"bg-orange-500" ,src:tafsir_img},
    { name: "الراديو", url: "/radio" ,bg:"bg-purple-500" ,src:radio_img},
    { name: "بث مباشر", url: "/live" ,bg:"bg-lime-500" ,src:live_img},
  ];
  return (
    <>
      <Home data={data}  />
    </>
  );
};
export default HomePage;
