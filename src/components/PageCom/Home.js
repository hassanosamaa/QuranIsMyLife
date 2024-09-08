import React from "react";
import Card from "../GeneralCom/Card";
import Header from "./Header";

export default function Home({ data }) {
  return (
    <section className="bg-colorBack  " >
      <div className="container mx-auto p-[10px] pt-[50px]">
        <Header />
        <div className=" grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3   md:gap-x-[20px] gap-x-[10px] md:gap-y-[24px] gap-y-[12px]  py-2 ">
          {data.map((e, i) => {
            return (
              <Card
                key={i}
                url={e.url}
                src={e.src}
                title={e.name}
                classStyle={`${e.bg}  ${
                  i == 0
                    ? "sm:col-span-2"
                    : i == 3
                    ? "sm:col-span-2"
                    : i == 4
                    ? "lg:col-span-2"
                    : ""
                }`}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}
