import Home from "@/components/PageCom/Home";
import askar_img from "../../public/askar.png";
import live_img from "../../public/live.png";
import radio_img from "../../public/radio.png";
import tafsir_img from "../../public/tafsir.png";
import rewaya_img from "../../public/rewaya.png";
import quran_img from "../../public/quran.png";

const HomePage = () => {
  
  const data = [
    { name: "الادعية", url: "/askar" ,bg:"bg-gradient-to-r from-sky-800 to-sky-400" ,src:askar_img},
    { name: "القران الكريم", url: "/reciters",bg:"bg-gradient-to-r from-sky-800 to-sky-400"  ,src:quran_img},
    { name: "القراءات", url: "/rewaya" ,bg:"bg-gradient-to-r from-sky-800 to-sky-400" ,src:rewaya_img},
    { name: "التفسير", url: "/tafsir" ,bg:"bg-gradient-to-r from-sky-800 to-sky-400" ,src:tafsir_img},
    { name: "الراديو", url: "/radio" ,bg:"bg-gradient-to-r from-sky-800 to-sky-400" ,src:radio_img},
    { name: "بث مباشر", url: "/live" ,bg:"bg-gradient-to-r from-sky-800 to-sky-400" ,src:live_img},
  ];
  return (
    <>
      <Home data={data}  />
    </>
  );
};
export default HomePage;
