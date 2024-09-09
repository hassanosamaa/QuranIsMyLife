import AudioCom from "@/components/GeneralCom/AudioCom";
import NameReciter from "@/components/GeneralCom/NameReciter";
import { removeSearch } from "@/store/searchSlice";
import { loading } from "@/utils/loading";
import { dehydrate, QueryClient, useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

const fetch = async (id) => {
  const info = id?.split("_");
  const { data } = await axios.get(
    `https://www.mp3quran.net/api/v3/reciters?reciter=${info[1]}&rewaya=${info[0]}`
  );
  return data.reciters;
};
const fetchSuwar = async () => {
  const { data: suwar } = await axios.get("https://mp3quran.net/api/v3/suwar");
  return suwar.suwar;
};

export async function getServerSideProps(context) {
  const queryClient = new QueryClient();
  const queryClientSuwar = new QueryClient();
  const { id } = context.params;

  await queryClient.prefetchQuery(["rewaya_reciters", id], () => fetch(id));
  await queryClientSuwar.prefetchQuery(["suwar"], fetchSuwar);

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
      rewaya_reciters_id: id,
      suwar: dehydrate(queryClientSuwar),
    },
  };
}

export default function Reciter_id({ rewaya_reciters_id }) {
  const text = useSelector((state) => state.search.search);
  const dispaych=useDispatch()
  const audioRefs = useRef([]);

  
  // remove search
  useEffect(()=>{
    dispaych(removeSearch())
  },[])

  const {
    data: rewaya_reciters,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["rewaya_reciters", rewaya_reciters_id],
    queryFn: () => fetch(rewaya_reciters_id),
  });

  const { data: suwar } = useQuery({
    queryKey: ["suwar"],
    queryFn: fetchSuwar,
  });

  if (isLoading || isError) {
    return loading(isLoading, isError);
  }

  const { name, moshaf } = rewaya_reciters[0];
  const { surah_list, server } = moshaf[0];
  const surah_list_list = surah_list?.split(",");

  let dataFilter = suwar?.filter((e) => {
    return e.name.includes(text);
  });
  
  const dataFilter_new= dataFilter?.map((e)=>e.id)
  const dataFilter_new_filter= dataFilter_new?.filter((e)=>{if(surah_list_list.includes(e.toString())){
    return e
  }})

  const handlePlay = (index) => {
    audioRefs.current.forEach((audio, i) => {
      if (i !== index && audio) {
        audio.pause();
      }
    });
  };

  return (
    <div className="bg-colorBack min-h-screen">
      <div className="container mx-auto p-5">
        <NameReciter reciter={name} />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 pt-1   gap-[20px]  ">
          {dataFilter_new_filter?.map((e, i) => {
            return (
              <AudioCom
                reciter={name}
                key={i}
                src={`${server}${
                  e.toString().length == 1 ? "00" + e.toString() : e.toString().length == 2 ? "0" + e.toString() : e.toString()
                }.mp3`}
                title={suwar ? suwar[+e - 1].name : ""}
                name={rewaya_reciters[0].moshaf[0].name}
                add={true}
                download={true}
                ref={(el) => (audioRefs.current[i] = el)}
                onPlay={() => handlePlay(i)}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
