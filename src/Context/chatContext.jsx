import React, { createContext, useContext, useEffect, useState } from "react";
const ChatContext = createContext();

const ChatProvider = ({ children }) => {
  const [selectedChat, setSelectedChat] = useState("");
  const [userInfo, setUser] = useState();
  const [notification, setNotification] = useState([]);
  const [chats, setChats] = useState();
  const [userIdC,setuserIdC] = useState(null);
  const [otherUsercontext,setotherUser] = useState();
 

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("token"));
    // console.log(userInfo);
    const userIDC = JSON.parse(localStorage.getItem("userId"));
    setUser(userInfo);
    setuserIdC(userIDC);
  }, []);

  return (
    <ChatContext.Provider
      value={{
        selectedChat,
        setSelectedChat,
        userInfo,
        setUser,
        notification,
        setNotification,
        chats,
        setChats,
        otherUsercontext,
        setotherUser,
        userIdC,
        setuserIdC
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export const ChatState = () => {
  return useContext(ChatContext);
};

export default ChatProvider;