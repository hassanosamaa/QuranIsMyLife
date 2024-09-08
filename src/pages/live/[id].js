import NameReciter from "@/components/GeneralCom/NameReciter";
import dynamic from "next/dynamic";
import React from "react";

const VideoCom = dynamic(() => import("@/components/GeneralCom/VideoCom"), {
  ssr: false,
});

export async function getServerSideProps(context) {
  const { id } = context.params;
  return {
    props: {
      live_id: id,
    },
  };
}


export default function Live_tv({ live_id }) {
  return (
    <div className="bg-colorBack min-h-screen">
      <div className="container mx-auto p-5">
        <NameReciter reciter={live_id == "3" ? "قناة القرآن الكريم" : "قناة السنة النبوية"}/>
        <div className="grid grid-cols-1 pt-5   gap-[20px] ">
          <h1 className="text-right text-[20px] font-[500] ">
            {live_id == "3" ? "قناة القرآن الكريم" : "قناة السنة النبوية"}
          </h1>
          <VideoCom
            url={
              live_id == "3"
                ? "https://win.holol.com/live/quran/playlist.m3u8"
                : "https://win.holol.com/live/sunnah/playlist.m3u8"
            }
          />
        </div>
      </div>
    </div>
  );
}
