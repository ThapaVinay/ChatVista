import { useStateProvider } from "@/context/StateContext";
import React, { useEffect, useState } from "react";
import ChatListHeader from "./ChatListHeader";
import ContactsList from "./ContactsList";
import List from "./List";
import SearchBar from "./SearchBar";

function ChatList() {

  const [{ contactPage }] = useStateProvider();
  const [pageType, setPageType] = useState("default");

  useEffect(() => {
    if (contactPage) {
      setPageType("all-contacts");
    } else {
      setPageType("default");
    }

  }, [contactPage])

  return (
    <div className="bg-panel-header-background flex flex-col z-20 max-h-screen ">
      {
        pageType === "default" &&
        <>
          <ChatListHeader />
          <SearchBar />
          <List />
        </>
      }

      {
        pageType == "all-contacts" && <ContactsList />
      }


    </div>
  );
}

export default ChatList;
