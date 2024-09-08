import reciter_img from "/public/quran.png";
import CardItem from "@/components/GeneralCom/CardItem";
import axios from "axios";
import Link from "next/link";
import React, { useEffect } from "react";
import { dehydrate, QueryClient, useQuery } from "@tanstack/react-query";
import { loading } from "@/utils/loading";
import { useDispatch, useSelector } from "react-redux";
import { removeSearch } from "@/store/searchSlice";

const fetch = async (rewaya_id) => {
  const { data } = await axios.get(
    `https://www.mp3quran.net/api/v3/reciters?rewaya=${rewaya_id}`
  );

  return data.reciters;
};

export async function getServerSideProps(context) {
  const queryClient = new QueryClient();
  const { id } = context.params;

  await queryClient.prefetchQuery(["rewaya_id", id], () => fetch(id));

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
      rewaya_id: id,
    },
  };
}

export default function Rewaya_id({ rewaya_id }) {
  const text = useSelector((state) => state.search.search);
  const dispaych=useDispatch()
  
  // remove search
  useEffect(()=>{
    dispaych(removeSearch())
  },[])

  const {
    data: rewaya,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["rewaya_id", rewaya_id],
    queryFn: () => fetch(rewaya_id),
  });

  if (isLoading || isError) {
    return loading(isLoading, isError);
  }
  let dataFilter = rewaya?.filter((e) => {
    return e.name.includes(text);
  });

  return (
    <div className="bg-colorBack min-h-screen">
      <div className="container mx-auto p-5">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 pt-5   gap-[20px]   ">
          {dataFilter?.map((e) => {
            return (
              <Link key={e.id} href={`/rewaya/reciter/${rewaya_id}_${e.id}`}>
                <CardItem
                  name={e.name}
                  countSuwar={e.moshaf[0].surah_total}
                  src={reciter_img}
                  rewaya={e.moshaf[0].name}
                />
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
