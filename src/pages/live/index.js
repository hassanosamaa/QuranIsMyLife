import { dehydrate, QueryClient, useQuery } from "@tanstack/react-query";
import live_img from "/public/live.png";
import CardItem from "@/components/GeneralCom/CardItem";
import axios from "axios";
import Link from "next/link";
import React from "react";
import { loading } from "@/utils/loading";

const fetch = async () => {
  const { data } = await axios.get("https://mp3quran.net/api/v3/live-tv");
  return data["livetv"];
};

export async function getStaticProps() {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(["live"], fetch);
  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
}
export default function Live() {
  const {
    data: liveTv,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["live"],
    queryFn: fetch,
  });

  if (isLoading || isError) {
    return loading(isLoading, isError);
  }

  return (
    <div className="bg-colorBack min-h-screen">
      <div className="container mx-auto p-5">
        <div className="grid grid-cols-1 md:grid-cols-2  pt-5 gap-[20px]  ">
          {liveTv.map((e) => {
            return (
              <Link key={e.id} href={`/live/${e.id}`}>
                <CardItem name={e.name} src={live_img} />
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
