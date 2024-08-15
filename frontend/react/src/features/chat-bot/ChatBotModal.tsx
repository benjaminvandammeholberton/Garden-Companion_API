import ReactDOM from "react-dom";

import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import axiosInstance from "../../api/axios";
import { AxiosError } from "axios";

import { sendIcon } from "../../assets/assets-path";
import { v4 as uuidv4 } from "uuid";

import "../../index.css";

import CloseModal from "../../components/CloseModal";

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
    text: `Bonjour, comment puis-je vous aider ?`,
    dateTime: new Date(),
    sender: "bot",
  };

  const [isAuth, setIsAuth] = useState<boolean>(true);
  const navigate = useNavigate();

  useEffect(() => {
    !isAuth && navigate("/login");
  }, [isAuth, navigate]);

  // Prevent scrolling of body content when modal is open
  useEffect(() => {
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

  // Scroll to the bottom to act like a chat
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

  const sendChatBotRquest = async () => {
    if (inputValue === "") return;
    addMessage(inputValue, "user");
    setInputValue("");
    setTextareaRows(1);
    if (textareaRef.current) resetHeighTextarea(textareaRef.current);
    const fetchData = async () => {
      setIsloading(true);
      try {
        const data = { "user-input": inputValue };
        const response = await axiosInstance.post("/api/v1/assistant/", data);
        setIsloading(false);
        addMessage(response.data, "bot");
      } catch (error) {
        const typedError = error as AxiosError;
        const errorStatus = typedError.response?.status;
        if (errorStatus === 429) {
          setTimeout(() => {
            setIsloading(false);
            addMessage(
              "Vous avez atteint le nombre maximum de questions pour aujourdh'ui",
              "bot"
            );
          }, 2500);
        } else if (errorStatus === 401) {
          setIsAuth(false);
        } else {
          setIsloading(false);
          addMessage("Connexion au serveur impossible", "bot");
          console.error("Could not connect:", error);
        }
      }
    };
    await fetchData();
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
    md:border 
    overflow-hidden
    "
    >
      <CloseModal {...{ onClose }} />

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
              disabled={isLoading}
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
