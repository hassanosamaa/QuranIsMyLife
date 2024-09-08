import AudioCom from "@/components/GeneralCom/AudioCom";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export default function Fav() {

  const [isClient, setIsClient] = useState(false);

  const items = useSelector((state) => state.fav.items);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  }
  console.log(items);
  

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
                />
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}
