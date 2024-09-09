import AudioCom from "@/components/GeneralCom/AudioCom";
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";

export default function Fav() {

  const [isClient, setIsClient] = useState(false);
  const audioRefs = useRef([]);


  const items = useSelector((state) => state.fav.items);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  }

  const handlePlay = (index) => {
    audioRefs.current.forEach((audio, i) => {
      if (i !== index && audio) {
        audio.pause();
      }
    });
  };

  return (
    <>
      <div className="bg-colorBack min-h-screen">
        <div className="container mx-auto p-5">
          <div className="grid grid-cols-1 md:grid-cols-2 pt-5  gap-[20px]  ">
            {items?.map((e, i) => {
              return (
                <AudioCom
                  reciter={e.reciter}
                  key={i}
                  src={e.src}
                  name={e.name}
                  title={e.title}
                  add={false}
                  del={true}
                  ref={(el) => (audioRefs.current[i] = el)}
                  onPlay={() => handlePlay(i)}
                />
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}
