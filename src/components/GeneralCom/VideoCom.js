import React from "react";
import ReactPlayer from "react-player";

export default function VideoCom({ url }) {
  return (
    <div>
      <ReactPlayer url={url} controls width="100%" height="100%" />
    </div>
  );
}
