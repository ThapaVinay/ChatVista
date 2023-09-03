import React from "react";
import Image from "next/image";

function Empty() {
  return <div className="border-conversation-border border-l w-full bg-panel-header-background flex flex-col h-[100vh] border-b-4 border-b-icon-green items-center justify-center">
    <Image src="/whatsapp.gif" alt="whatsapp" height={300} width={300}></Image>
  </div>;
}

export default Empty;
