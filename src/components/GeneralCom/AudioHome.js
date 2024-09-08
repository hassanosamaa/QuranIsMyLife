import React, { useRef, useState } from 'react'
import play from "/public/play.svg";
import pause from "/public/pause.svg";
import { motion } from "framer-motion";
import Image from "next/image";



export default function AudioHome({src}) {

    const [isPlaying, setIsPlaying] = useState(false);
    const audioRef = useRef(null);
    const togglePlay = () => {
        if (isPlaying ) {
          audioRef.current.pause();
        } else {
          audioRef.current.play();
          
        }
        setIsPlaying(!isPlaying);
      };

  return (
    <div>
       <audio ref={audioRef} src={src} preload="auto" />
        <motion.button
          initial={{ scale: isPlaying ? 0.7 : 1, opacity: isPlaying ? 1 : 1 }}
          animate={{ scale: isPlaying ? 1.2 : 1, opacity: isPlaying ? 0.5 : 1 }}
          transition={{ duration: 1.5, ease: "easeInOut", repeat:isPlaying? Infinity:null }}
          onClick={togglePlay}
          className="bg-blue-200 flex justify-center items-center text-white p-2 rounded-full shadow-lg w-[50px] h-[50px] md:text-[16px]"
        >
          <Image className='w-[25px] h-[25px]'  src={isPlaying ? play : pause} alt="state"/>
        </motion.button>
    </div>
  )
}
