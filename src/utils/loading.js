import Loading from "@/components/GeneralCom/Loading";
import NoInternet from "@/components/GeneralCom/NoInternet";
import React from "react";

export function  loading(isLoading, isError) {
  if (isLoading) {
    return (
      <>
        <Loading countElements={6} />
      </>
    );
  }
  if (isError) {
    return (
      <>
        <NoInternet />
      </>
    );
  }
  return null
}
