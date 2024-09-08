import { dehydrate, QueryClient, useQuery } from "@tanstack/react-query";
import tafsir_img from "/public/tafsir.png";
import CardItem from "@/components/GeneralCom/CardItem";
import axios from "axios";
import Link from "next/link";
import React, { useEffect } from "react";
import { loading } from "@/utils/loading";
import { useDispatch, useSelector } from "react-redux";
import { removeSearch } from "@/store/searchSlice";


const fetch = async () => {
  const { data } = await axios.get('https://mp3quran.net/api/v3/suwar');
  return data.suwar
};

export async function getStaticProps() {

  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(['suwar'], fetch);
  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
}

export default function Tafsir() {
  const text = useSelector((state) => state.search.search);
  const dispaych=useDispatch()
  
  // remove search
  useEffect(()=>{
    dispaych(removeSearch())
  },[])

  const { data: suwar, isLoading, isError } = useQuery({
    queryKey:["suwar"],
    queryFn:fetch
  });

  if (isLoading || isError) {
    return loading(isLoading, isError);
  }
  let dataFilter = suwar?.filter((e) => {
    return e.name.includes(text);
  });
  

  return (
    <div className="bg-colorBack min-h-screen">
      <div className="container mx-auto p-5">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 pt-5   gap-[20px]  ">
          {dataFilter?.map((e) => {
            return (
              <Link key={e.id} href={`/tafsir/${e.id}`}>
                <CardItem name={`تفسير سورة  ${e.name}`} src={tafsir_img} />
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
