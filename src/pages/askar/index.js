import CardItem from "@/components/GeneralCom/CardItem";
import axios from "axios";
import Link from "next/link";
import React from "react";
import askar_img from "/public/askar.png";
import { dehydrate, QueryClient, useQuery } from "@tanstack/react-query";
import { loading } from "@/utils/loading";
import { useSelector } from "react-redux";

const fetch = async () => {
  const { data } = await axios.get( "https://www.hisnmuslim.com/api/ar/husn_ar.json");
  return data["العربية"];
};
export async function getStaticProps() {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(['askar'], fetch);

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
}
export default function Askar() {
  const text = useSelector((state) => state.search.search);

  

  const { data:askar, isLoading, isError } = useQuery({
    queryKey: ["askar"],
    queryFn: fetch,
  });

  if (isLoading || isError) {
    return loading(isLoading, isError);
  }
  let dataFilter = askar.filter((e) => {
    return e.TITLE.includes(text);
  });
  
  return (
    <div className="bg-colorBack min-h-screen">
      <div className="container mx-auto p-5">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  pt-5 gap-[20px]  ">
          {dataFilter.map((e) => {
            return (
              <Link key={e.ID} href={`/askar/${e.ID}`}>
                <CardItem name={e.TITLE} src={askar_img} />
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
