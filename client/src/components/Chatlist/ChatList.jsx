import React from "react";
import ChatListHeader from "./ChatListHeader";
import List from "./List";
import SearchBar from "./SearchBar";

function ChatList() {
  return (
    <div className="bg-panel-header-background flex flex-col z-20 max-h-screen ">
      <>
        <ChatListHeader />
        <SearchBar />
        <List />
      </>
    </div>
  );
}

export default ChatList;
