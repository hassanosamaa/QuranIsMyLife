"use client";
import { addToCart, removeFromCart } from "@/store/favSlice";
import Image from "next/image";
import React, { forwardRef, useImperativeHandle, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import play from "/public/play.svg";
import pause from "/public/pause.svg";
import dow from "/public/download.svg";
import heart from "/public/heart.svg";
import IconDel from "/public/del.svg";
import { motion } from "framer-motion";
import heardfull from "/public/heardred.svg";

const AudioCom = forwardRef(({ src, title, name, add, download, del, reciter, onPlay }, ref) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);
  const items = useSelector((state) => state.fav.items);
  const fav= items.find((e) =>e.src==src)


  const dispatch=useDispatch()
             
  useImperativeHandle(ref, () => ({
    pause() {
      audioRef.current.pause();
      setIsPlaying(false);
    },
  }));


  const togglePlay = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.currentTime = 0;
      audioRef.current.play();
      onPlay(); 
    }
    setIsPlaying(!isPlaying);
  };


  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = src;
    link.setAttribute('download', 'audio.mp3');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  const handleAdd = (src, name, title, reciter ) => {
    const soundDetails = {
      src: src,
      name: name,
      title: title,
      reciter: reciter,
    };
    dispatch(addToCart(soundDetails));
  };
  const handleDel = (src) => {
    console.log(src);

    dispatch(removeFromCart(src));
  };

  return (
    <div className="flex flex-col justify-between items-center  bg-[#FAFAFA] rounded-[20px] shadow-md p-5 h-full">
      <div className="text-right ml-auto">
        <h2 className="mb-[1px] md:text-[18px] font-[700] text-[black] md:leading-[39px]">
          {title}
        </h2>

        {del && (
          <h3 className="text-[16px] font-[500] text-[#474747] leading-[28px]">
            {reciter}
          </h3>
        )}
        <h3 className="text-[13px] font-[400] text-[#9D9CA1] leading-[28px]">
          {name}
        </h3>
      </div>

      <div className="flex gap-2 items-center justify-start mr-auto mt-5 ">
        <audio ref={audioRef} src={src} preload="auto" />
        <motion.button
          initial={{ scale: isPlaying ? 0.7 : 1, opacity: isPlaying ? 1 : 1 }}
          animate={{ scale: isPlaying ? 1.2 : 1, opacity: isPlaying ? 0.7 : 1 }}
          transition={{ duration: 1, ease: "easeInOut", repeat:isPlaying? Infinity:null }}
          onClick={togglePlay}
          className="bg-blue-200 text-white px-4 py-2 rounded-full shadow-lg text-[12px] md:text-[16px]"
        >
          <Image width={15} height={15} src={isPlaying ? pause : play} alt="state"/>
        </motion.button>

        {download && (
          <button
            onClick={handleDownload}
            className="bg-green-200 text-white px-4 py-2 rounded-full shadow-lg  text-[12px] md:text-[16px]"
          >
            <Image width={15} height={15} src={dow} alt="state" />
          </button>
        )}
        
        {add && (
          <motion.button
            
            onClick={() => {
              handleAdd(src, name, title, reciter);
            }}
            className="bg-amber-200 text-white px-4 py-2 rounded-full shadow-lg  text-[12px] md:text-[16px]"
          >
            <Image width={20} height={20} src={fav?heardfull:heart} alt="state"/>
          </motion.button>
        )}
        {del && (
          <button
            onClick={() => {
              handleDel(src);
            }}
            className="bg-red-100 text-white px-4 py-2 rounded-full shadow-lg  text-[12px] md:text-[16px]"
          >
            <Image width={20} height={20} src={IconDel} alt="state" />
          </button>
        )}
      </div>
    </div>
  );
});

export default AudioCom;
