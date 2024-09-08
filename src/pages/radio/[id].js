import AudioCom from "@/components/GeneralCom/AudioCom";
import { loading } from "@/utils/loading";
import { dehydrate, QueryClient, useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";

const fetch=async()=>{
  const { data } = await axios.get("https://mp3quran.net/api/v3/radios");
  return  data.radios
}
export async function getServerSideProps(context) {
  const { id } = context.params;
  const queryClient=new QueryClient()
  await queryClient.prefetchQuery(["radio"],fetch)

  return{
    props:{
      dehydratedState: dehydrate(queryClient),
      radio_id: id,

    }
  }
}
export default function Radio_id({ radio_id }) {
  const {
    data: radio,
    isLoading,
    isError,
  } = useQuery({ queryKey: ["radio"], queryFn: fetch });

  if (isLoading || isError) {
    return loading(isLoading, isError);
  }
  const radio_filter = radio?.find((e) => e.id == radio_id);
  const { url, name } = radio_filter;

  
  return (
    <div className="bg-colorBack min-h-screen">
      <div className="container mx-auto p-5">
        <div className="grid grid-cols-1  pt-5  gap-[20px] ">
          <AudioCom src={url} title={name} add={true} download={false}  />
        </div>
      </div>
    </div>
  );
}
