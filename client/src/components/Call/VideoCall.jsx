import React from "react";
import { useStateProvider } from "@/context/StateContext";
import dynamic from "next/dynamic";
const Container = dynamic(() => import("./Container"), { ssr: false });

function VideoCall() {
  const [{ videoCall, socket, userInfo }] = useStateProvider();

  return <Container data={videoCall} />;
}

export default VideoCall;
