import React, { useEffect } from "react";
import { useStateProvider } from "@/context/StateContext";
import dynamic from "next/dynamic";
const Container = dynamic(() => import("./Container"), { ssr: false });

function VideoCall() {
  useEffect(() => {
    if (videoCall.type === "out-going") {
      socket.current.emit("outgoing-video-call", {
        to: videoCall.id,
        from: {
          id: userInfo.id,
          profilePicture: userInfo.profileImage,
          name: userInfo.name,
        },
        callType: videoCall.callType,
        roomId: videoCall.roomId,
      });
    }
  }, [videoCall]);

  const [{ videoCall, socket, userInfo }] = useStateProvider();

  return <Container data={videoCall} />;
}

export default VideoCall;
