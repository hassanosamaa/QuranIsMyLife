import AudioCom from "@/components/GeneralCom/AudioCom";
import NameReciter from "@/components/GeneralCom/NameReciter";
import { removeSearch } from "@/store/searchSlice";
import { loading } from "@/utils/loading";
import { dehydrate, QueryClient, useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const fetch = async (id) => {
  const { data } = await axios.get(
    `https://www.mp3quran.net/api/v3/reciters?rewaya=1&reciter=${id}`
  );
  return data.reciters;
};

const fetchSuwar = async () => {
  const { data: suwar } = await axios.get("https://mp3quran.net/api/v3/suwar");
  return suwar.suwar;
};

export async function getServerSideProps(context) {
  const queryClient = new QueryClient();
  const queryClient_suwar = new QueryClient();
  const { id } = context.params;

  await queryClient.prefetchQuery(["reciters_id", id], () => fetch(id));
  await queryClient_suwar.prefetchQuery(["suwar"], () => fetchSuwar);

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
      postId: id,
      suwr: dehydrate(queryClient_suwar),
    },
  };
}

export default function Reciter_id({ postId }) {
  const text = useSelector((state) => state.search.search);
  const dispaych=useDispatch()
  
  // remove search
  useEffect(()=>{
    dispaych(removeSearch())
  },[])


  const {
    data: reciters_id,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["reciters", postId],
    queryFn: () => fetch(postId),
  });
  const { data: suwar } = useQuery({
    queryKey: ["suwar"],
    queryFn: fetchSuwar,
  });

  if (isLoading || isError) {
    return loading(isLoading, isError);
  }



  const { server, surah_list, name } = reciters_id[0]?.moshaf[0];
  const surah_list_without_zero = surah_list?.split(",");

  let dataFilter = suwar?.filter((e) => {
    return e.name.includes(text);
  });
  
  const dataFilter_new= dataFilter?.map((e)=>e.id)
  const dataFilter_new_filter= dataFilter_new?.filter((e)=>{if(surah_list_without_zero.includes(e.toString())){
    return e
  }})
  

  return (
    <div className="bg-colorBack min-h-screen">
      <div className="container mx-auto ">
        <NameReciter reciter={reciters_id[0].name} />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3   gap-[20px] pt-1">
          {dataFilter_new_filter?.map((e, i) => {
            return (
              <AudioCom
                
                reciter={reciters_id[0].name}
                name={name}
                key={i}
                src={`${server}${
                  e.toString().length == 1 ? "00" + e.toString() : e.toString().length == 2 ? "0" + e.toString() : e.toString()
                }.mp3`}
                title={suwar ? `سورة ${suwar[+e - 1].name}` : ""}
                add={true}
                download={true}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
