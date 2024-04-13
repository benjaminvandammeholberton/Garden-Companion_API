import axios from "axios";
import { useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";
import { v4 as uuidv4 } from "uuid";

import "../index.css";

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
  const modalContainerRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const placeholderMessage: ChatBotMessage = {
    id: uuidv4(),
    text: "Bonjour, comment puis-je vous aider ?",
    dateTime: new Date(),
    sender: "bot",
  };

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

  console.log(messages);

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
    addMessage(inputValue, "user");
    setInputValue("");
    setTextareaRows(1);
    if (textareaRef.current) resetHeighTextarea(textareaRef.current);
    setIsloading(true);
    setTimeout(() => {
      const fetchData = async () => {
        try {
          const response = await axios.get("http://127.0.0.1:8000");
          addMessage(response.data.message, "bot");
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
    right-24 
    w-[350px] 
    h-[500px] 
    flex 
    flex-col 
    items-center 
    bg-white 
    rounded-t-3xl 
    border
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
          <span className=" text-2xl">&times;</span>
        </div>
      </div>

      <h1 className="mt-3 text-2xl font-thin">Chatbot</h1>
      <div
        className="w-full h-[390px] overflow-y-scroll pb-1"
        ref={modalContainerRef}
      >
        <div className="flex flex-col gap-3 justify-end min-h-full">
          {messages.map((message) => {
            if (message.sender === "user") {
              return (
                <p
                  className="
                  break-all 
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
                  break-all
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
            break-all
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
              src="./assets/modal/send.png"
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
