import { useStateProvider } from "@/context/StateContext";
import { reducerCases } from "@/context/constants";
import { firebaseAuth } from "@/utils/FirebaseConfig";
import { signOut } from "firebase/auth";
import { useRouter } from "next/router";
import React, { useEffect } from "react";

function logout() {
  const [{ socket, userInfo }, dispatch] = useStateProvider();
  const router = useRouter();

  useEffect(() => {
    socket.current.emit("signout", userInfo.id);
    dispatch({ type: reducerCases.SET_USER_INFO, userInfo: undefined });
    signOut(firebaseAuth);
    router.push("/login");
  }, [socket]);

  return <div className="bg-conversation-panel-background "></div>;
}

export default logout;
