import CardItem from "@/components/GeneralCom/CardItem";
import axios from "axios";
import Link from "next/link";
import reciter_img from "/public/quran.png";
import { dehydrate, QueryClient, useQuery } from "@tanstack/react-query";
import { loading } from "@/utils/loading";
import { useDispatch, useSelector } from "react-redux";
import { removeSearch } from "@/store/searchSlice";
import { useEffect } from "react";

const fetch = async () => {
  const { data } = await axios.get(
    "https://www.mp3quran.net/api/v3/reciters?rewaya=1"
  );
  return data.reciters;
};

export async function getStaticProps() {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(["reciters"], fetch);

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
}

export default function Reciter() {
  const text = useSelector((state) => state.search.search);
  const dispaych=useDispatch()
  
  // remove search
  useEffect(()=>{
    dispaych(removeSearch())
  },[])
  
  const {
    data: reciters,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["reciters"],
    queryFn: fetch,
  });
  
  if (isLoading || isError) {
    return loading(isLoading, isError);
  }
  
  let dataFilter = reciters?.filter((e) => {
    return e.name.includes(text);
  });

  return (
    <>
      <div className="bg-colorBack min-h-screen ">
        <div className="container mx-auto p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3   gap-[20px] pt-5 ">
            {dataFilter?.map((e, i) => {
              return (
                <Link key={i} href={`/reciters/${e.id}`}>
                  <CardItem
                    name={e.name}
                    countSuwar={e.moshaf[0].surah_total}
                    src={reciter_img}
                  />
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}
