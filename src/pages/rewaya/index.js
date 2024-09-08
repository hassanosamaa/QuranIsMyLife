import rewaya_img from "/public/rewaya.png";
import CardItem from "@/components/GeneralCom/CardItem";
import axios from "axios";
import Link from "next/link";
import React, { useEffect } from "react";
import { dehydrate, QueryClient, useQuery } from "@tanstack/react-query";
import { loading } from "@/utils/loading";
import { useDispatch, useSelector } from "react-redux";
import { removeSearch } from "@/store/searchSlice";


const fetch = async () => {
  const { data } = await axios.get("https://mp3quran.net/api/v3/riwayat");
  return data.riwayat;
};
export async function getStaticProps() {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(['rewaya'], fetch);

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
}


export default function Rewaya() {
  const text = useSelector((state) => state.search.search);
  const dispaych=useDispatch()
  
  // remove search
  useEffect(()=>{
    dispaych(removeSearch())
  },[])



  const { data:rewaya, isLoading, isError } = useQuery({
    queryKey: ["rewaya"],
    queryFn: fetch,
  });

  if (isLoading || isError) {
    return loading(isLoading, isError);
  }
  let dataFilter = rewaya?.filter((e) => {
    return e.name.includes(text);
  });

  return (
    <div className="bg-colorBack min-h-screen" >
      <div className="container mx-auto p-5">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 pt-5   gap-[20px]  ">
          {dataFilter?.map((e) => {
            return (
              <Link key={e.id} href={`/rewaya/${e.id}`}>
                <CardItem
                  name={e.name}
                  src={rewaya_img}
                />
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
