import { reducerCases } from "@/context/constants";
import { useStateProvider } from "@/context/StateContext";
import { CHECK_USER_ROUTE } from "@/utils/ApiRoutes";
import { firebaseAuth } from "@/utils/FirebaseConfig";
import { data } from "autoprefixer";
import axios from "axios";
import { onAuthStateChanged } from "firebase/auth";
import Router, { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Chat from "./Chat/Chat";
import ChatList from "./Chatlist/ChatList";
import Empty from "./Empty";

function Main() {

  const router = useRouter();
  const [{ userInfo, currentChatUser }, dispatch] = useStateProvider();
  const [redirectLogin, setRedirectLogin] = useState(false);


  useEffect(() => {
    if (redirectLogin) {
      router.push("/login");
    }
  }, [redirectLogin])


  onAuthStateChanged(firebaseAuth, async (currentUser) => {
    if (!currentUser) {
      setRedirectLogin(true);
    }

    if (!userInfo && currentUser?.email) {
      const { data } = await axios.post(CHECK_USER_ROUTE, { email: currentUser.email });

      console.log(userInfo);
      if (!data.status) {
        router.push("/login");
      }

      if (data.data) {
        const { id, name, email, profilePicture: profileImage, status } = data.data;
        dispatch({
          type: reducerCases.SET_USER_INFO,
          userInfo: {
            id,
            name,
            email,
            profileImage,
            status,
          }
        });
      }

    }
  }); 

  return <>

    <div className="grid grid-cols-main h-screen max-h-screen w-screen max-w-full ">
      <ChatList />
      {
        currentChatUser ? <Chat/> : <Empty/>
      }
    </div>

  </>;
}

export default Main;
