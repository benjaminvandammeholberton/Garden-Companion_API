import axios from "axios";
import { useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";
import { v4 as uuidv4 } from "uuid";

import sendIcon from "../assets/modal/send.png";

import "../index.css";
import useAuth from "../hooks/useAuth";

interface ChatBotModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface ChatBotMessage {
  id: string;
  text: string;
  sender: "user" | "bot";
  dateTime: Date;
}

const ChatBotModal: React.FC<ChatBotModalProps> = ({ isOpen, onClose }) => {
  // const [user] = useAuth();
  // console.log(user);

  const modalContainerRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const placeholderMessage: ChatBotMessage = {
    id: uuidv4(),
    text: ` Bonjour, comment puis-je vous aider ?`,
    dateTime: new Date(),
    sender: "bot",
  };

  useEffect(() => {
    // Prevent scrolling of body content when modal is open
    if (isOpen) {
      document.body.classList.add("overflow-hidden");
      document.body.classList.add("md:overflow-auto");
      document.body.classList.remove("overflow-auto");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
    // Cleanup function to reset overflow style when component unmounts
    return () => {
      document.body.classList.remove("overflow-hidden");
      document.body.classList.remove("md:overflow-auto");
    };
  }, [isOpen]);

  const [inputValue, setInputValue] = useState<string>("");
  const [textareaRows, setTextareaRows] = useState<number>(1);
  const [messages, setMessages] = useState<ChatBotMessage[]>([
    placeholderMessage,
  ]);
  const [isLoading, setIsloading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const addMessage = (text: string, sender: "bot" | "user") => {
    const message: ChatBotMessage = {
      id: uuidv4(),
      text,
      dateTime: new Date(),
      sender,
    };
    setMessages((messages) => [...messages, message]);
    return message;
  };

  useEffect(() => {
    if (isOpen && modalContainerRef.current) {
      modalContainerRef.current.scrollTop =
        modalContainerRef.current.scrollHeight;
    }
  }, [messages, isOpen]);

  const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputValue(event.target.value || "");
    autoResizeTextarea(event.target);
  };

  const sendChatBotRquest = () => {
    if (inputValue === "") return;
    addMessage(inputValue, "user");
    setInputValue("");
    setTextareaRows(1);
    if (textareaRef.current) resetHeighTextarea(textareaRef.current);
    setIsloading(true);
    setTimeout(() => {
      const fetchData = async () => {
        try {
          // const accessToken = localStorage.getItem("JWTGP");
          // if (!accessToken) {
          //   return null;
          // }
          // const response = await axios.post(
          //   "http://127.0.0.1:8000/api/v1/assistant/",
          //   { "user-input": inputValue },
          //   {
          //     headers: {
          //       "Content-Type": "application/json",
          //       Authorization: `Bearer ${accessToken}`,
          //     },
          //   }
          // );
          // console.log(response.data);
          addMessage("hello", "bot");
        } catch (err) {
          setError(err as Error);
          addMessage("Serveur HS", "bot");
          console.error("Could not connect:", error);
        } finally {
          setIsloading(false);
        }
      };
      fetchData();
    }, 10000);
  };

  const handleEnterKeyPress = (
    event: React.KeyboardEvent<HTMLTextAreaElement>
  ) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      sendChatBotRquest();
    }
  };

  const autoResizeTextarea = (textarea: HTMLTextAreaElement) => {
    textarea.style.height = `${textarea.scrollHeight}px`;
    setTextareaRows(textarea.rows);
  };

  const resetHeighTextarea = (textarea: HTMLTextAreaElement) => {
    textarea.style.height = `100%`;
    setTextareaRows(textarea.rows);
  };

  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div
      className="
    fixed
    bottom-0 
    right-0 md:right-24 
    w-full md:w-[350px] 
    h-full md:h-[500px] 
    flex 
    z-50
    flex-col 
    items-center 
    bg-white 
    md:rounded-t-3xl 
    border
    overflow-hidden
    "
    >
      <div
        className=" 
      modal-content 
      w-10 
      h-10 
      bg-white 
      absolute 
      top-2 
      right-2 
      rounded-full
      "
      >
        <div
          className="w-full h-full flex items-center justify-center cursor-pointer"
          onClick={onClose}
        >
          <span className="text-4xl md:text-2xl">&times;</span>
        </div>
      </div>

      <h1 className="mt-3 text-2xl font-thin">Chatbot</h1>
      <div
        className="w-full h-full md:h-[390px] overflow-y-scroll pb-20 md:pb-1"
        ref={modalContainerRef}
      >
        <div className="flex flex-col gap-3 justify-end min-h-full">
          {messages.map((message) => {
            if (message.sender === "user") {
              return (
                <p
                  className="
                  break-words
                  
                  ml-auto 
                  mr-3 
                  border 
                  w-fit
                   max-w-[220px] 
                  rounded-3xl 
                  px-4 
                  py-2 
                  bg-green-300 
                  leading-tight
                  "
                  key={message.id}
                >
                  {message.text}
                </p>
              );
            } else {
              return (
                <p
                  className="
                  
                  break-words
                  ml-4
                  border
                  w-fit
                  max-w-[220px]
                  rounded-3xl
                  px-4
                  py-2
                  bg-blue-300
                  leading-tight
                  "
                  key={message.id}
                >
                  {message.text}
                </p>
              );
            }
          })}

          {isLoading && (
            <p
              className="
            typing-dots
            
            
            w-12
            ml-3
            border
            rounded-3xl
            px-4
            py-2
           bg-blue-300
            leading-tight
            "
            ></p>
          )}
        </div>
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 bg-white w-full  py-2">
          <div
            className="
          w-11/12 
          mb-2 
          mx-auto 
          rounded-3xl  
          border 
          bg-white 
          px-4 
          py-1 
          flex 
          items-center 
          justify-around
          "
          >
            <textarea
              ref={textareaRef}
              className="w-3/4 h-full outline-none resize-none overflow-y-hidden pt-1"
              value={inputValue}
              onChange={handleInputChange}
              onKeyDown={handleEnterKeyPress}
              placeholder="Aa"
              rows={textareaRows}
            />
            <img
              className="w-8 h-8 cursor-pointer"
              onClick={sendChatBotRquest}
              src={sendIcon}
              alt=""
            />
          </div>
        </div>
      </div>
    </div>,
    document.getElementById("portal")!
  );
};

export default ChatBotModal;
