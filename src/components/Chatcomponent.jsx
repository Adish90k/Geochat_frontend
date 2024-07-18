import React, { useState } from "react";
import { ChatState } from "../Context/chatContext";
import axios from "axios";
import { useEffect } from "react";
import "./Chat.css";

function Chatcomponent({ Ongetallmessages }) {
  const {
    selectedChat,
    setSelectedChat,
    chats,
    setChats,
    setotherUser,
    otherUsercontext,
  } = ChatState();

  const loggedInUser = localStorage.getItem("user");
  const parsedLoggedInUser = JSON.parse(loggedInUser);

  const fetchChats = async () => {
    try {
      const usertoken = localStorage.getItem("token");
      const parseduserToken = JSON.parse(usertoken);
      //   console.log(parseduserToken);
      if (usertoken) {
        const config = {
          headers: {
            Authorization: `Bearer ${parseduserToken}`,
          },
        };

        const { data } = await axios.get(
          "https://geochat-backend-ttni.onrender.com/api/chat/fetchallchats",
          config
        );
        setChats(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchChats();
  }, []);

  let bg = {
    backgroundColor: "rgb(9, 42, 95)",
    color: "white",
  };
  let bg2 = {
    backgroundColor: "transparent",
  };

  function handleChat(chat, otherUser) {
    setSelectedChat(chat);
    setotherUser(otherUser);
    Ongetallmessages(chat);
  }

  return (
    <>
      <div className="mainchatallContainer">
        <h3 id="chat-heading-main">Chats</h3>
        {chats ? (
          chats.map((chat) => {
            const otherUser = chat.users.find(
              (user) => user.name !== parsedLoggedInUser
            );

            return (
              <div
                className="chatdiv"
                onClick={() => handleChat(chat, otherUser)}
                style={selectedChat === chat ? bg : bg2}
                key={chat._id}
              >
                <p>{otherUser.name}</p>
              </div>
            );
          })
        ) : (
          <p>chats are loading</p>
        )}
      </div>
    </>
  );
}

export default Chatcomponent;
