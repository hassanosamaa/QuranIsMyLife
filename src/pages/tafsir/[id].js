import AudioCom from "@/components/GeneralCom/AudioCom";
import NameReciter from "@/components/GeneralCom/NameReciter";
import { removeSearch } from "@/store/searchSlice";
import { loading } from "@/utils/loading";
import { dehydrate, QueryClient, useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

const fetch = async (id) => {
  const { data } = await axios.get(
    `https://mp3quran.net/api/v3/tafsir?sura=${id}`
  );
  return data.tafasir;
};

export async function getServerSideProps(context) {
  const { id } = context.params;
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(["tafsir", id], () => fetch(id));

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
      tafsir_id: id,
    },
  };
}

export default function Tafsir_id({ tafsir_id }) {
  const text = useSelector((state) => state.search.search);
  const dispaych = useDispatch();
  const audioRefs = useRef([]);

  // remove search
  useEffect(() => {
    dispaych(removeSearch());
  }, []);

  const {
    data: tafsir,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["tafsir", tafsir_id],
    queryFn: () => fetch(tafsir_id),
  });

  if (isLoading || isError) {
    return loading(isLoading, isError);
  }
  const tafsir_suwar = tafsir.soar[tafsir_id];
  let dataFilter = tafsir_suwar?.filter((e) => {
    return e.name.includes(text);
  });

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
        <NameReciter reciter={tafsir.name} />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 pt-1   gap-[20px]   ">
          {dataFilter?.map((e,i) => {
            return (
              <AudioCom
                key={e.id}
                src={e.url}
                title={e.name}
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
