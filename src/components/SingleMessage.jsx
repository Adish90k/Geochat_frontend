import React, { useEffect, useState } from "react";
import { ChatState } from "../Context/chatContext";
import { MESSAGE_PUT } from "../Apiurls";
import axios from "axios";
import "./Message.css";
import io from "socket.io-client";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane,faArrowRight } from '@fortawesome/free-solid-svg-icons';

const ENDPOINT = "https://geochat-backend-ttni.onrender.com/";
var socket;

function SingleMessage({
  allmessegesData,
  handlenewMessagereceived,
  handlesetAllmessagesData,
}) {
  const [messages, setMessages] = useState([]);

  const [newMessage, setNewmessage] = useState();

  const loggedInUser = localStorage.getItem("user");

  const parsedLoggedInUser = JSON.parse(loggedInUser);

  const { selectedChat } = ChatState();

  const [sockets, setSocketConnected] = useState(false);

  console.log(sockets);

  const userIDL = JSON.parse(localStorage.getItem("userId"));

  useEffect(() => {
    socket = io(ENDPOINT);
    console.log(userIDL);
    socket.emit("setup", userIDL);
    socket.emit("connected", () => setSocketConnected(true));
  }, []);

  const typinghandler = (ev) => {
    setNewmessage(ev.target.value);
  };
  const getToken = () => {
    const token = localStorage.getItem("token");
    if (token) {
      const parsedTokem = JSON.parse(token);
      return `Bearer ${parsedTokem}`;
    }
    return null;
  };

  const handlesendMessage = async (ev) => {
    const token = getToken();

    try {
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: token,
        },
      };
      let newMessageinstant = {
        content: newMessage,
        sender: {
          name: parsedLoggedInUser,
        },
      };

      handlesetAllmessagesData([...allmessegesData, newMessageinstant]);
      setNewmessage("");

      const { data } = await axios.post(
        MESSAGE_PUT,
        {
          content: newMessage,
          chatId: selectedChat._id,
        },
        config
      );

      socket.emit("new message", data);
      setMessages([...messages, data]);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    socket.on("message recieved", (newMessagerecieved) => {
      if (!selectedChat || selectedChat._id !== newMessagerecieved.chat._id) {
        console.log("please select a chat");
      } else {
        handlenewMessagereceived(newMessagerecieved);
      }
    });
  });

  return (
    <div className="mainMessagediv">
      <div className="messagerenderdiv">
        {allmessegesData ? (
          allmessegesData.map((message) => {
            return (
              <p
                className={
                  message.sender.name === parsedLoggedInUser
                    ? "loggedInusermessage"
                    : "otherusermessage"
                }
                key={message._id}
              >
                {message.content}
              </p>
            );
          })
        ) : (
          <p>send a message</p>
        )}
      </div>
    <div className="message-sendbtn-inputsent-container">
      <input
        type="text"
        placeholder="Enter your message here"
        onChange={(ev) => typinghandler(ev)}
        value={newMessage}
        id="Send-message-input"
      />
      <button onClick={() => handlesendMessage()}><FontAwesomeIcon icon={faArrowRight}/></button>
      </div>
    </div>
  );
}

export default SingleMessage;
