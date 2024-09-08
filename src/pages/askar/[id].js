import AudioCom from "@/components/GeneralCom/AudioCom";
import NameReciter from "@/components/GeneralCom/NameReciter";
import { loading } from "@/utils/loading";
import { dehydrate, QueryClient, useQuery } from "@tanstack/react-query";
import axios from "axios";

const fetch = async (askar_id) => {
  const { data } = await axios.get(
    `https://www.hisnmuslim.com/api/ar/${askar_id}.json`
  );
  return data;
};

const fetch_audio = async () => {
  const { data } = await axios.get(
    "https://www.hisnmuslim.com/api/ar/husn_ar.json"
  );
  return data["العربية"];
};

export async function getServerSideProps(context) {
  const queryClient = new QueryClient();
  const queryClient_suwar = new QueryClient();
  const { id } = context.params;

  await queryClient.prefetchQuery(["askar", id], () => fetch(id));
  await queryClient_suwar.prefetchQuery(["askar_audio"], () => fetch_audio);

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
      askar_id: id,
      suwar:dehydrate(queryClient_suwar)
    },
  };
}

export default function Askar_id({ askar_id }) {
  const {
    data: askar,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["askar", askar_id],
    queryFn: () => fetch(askar_id),
  });

 
  const { data: askar_audio } = useQuery({
    queryKey: ["askar_audio"],
    queryFn: fetch_audio,
  });

  if (isLoading || isError) {
    return loading(isLoading, isError);
  }


  const keys = askar ? Object.keys(askar) : [];
  const askar_data = keys.length > 0 ? askar[keys[0]] : [];
  const askar_audio_id = askar_audio?.find((e) => e.ID == askar_id);
  const { AUDIO_URL, TITLE } = askar_audio_id || {};

  return (
    <div className="bg-colorBack min-h-screen">
      <div className="container mx-auto p-4">
        <NameReciter reciter={TITLE}/>
        <div className="grid grid-cols-1    gap-[20px] pt-1  ">
          <AudioCom src={AUDIO_URL} title={TITLE} add={false} download={true} />
          {askar_data?.map((e) => {
            return <AudioCom key={e.ID} src={e.AUDIO} title={e.ARABIC_TEXT} add={false} download={true}/>;
          })}
        </div>
      </div>
    </div>
  );
}
