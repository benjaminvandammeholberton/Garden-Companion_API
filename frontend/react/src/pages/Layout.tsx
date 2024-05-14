import { Outlet } from "react-router-dom";
import { useState } from "react";

// Components
import ChatBotModal from "../features/chat-bot/ChatBotModal";
import Footer from "../components/footer/Footer";
import Header from "../components/header/Header";
import Navbar from "../components/navbar/Navbar";

// Assets
import chatBotIcon from "../assets/header/chatbot.png";

const Layout = () => {
  const [isChatBotModalOpen, setisChatBotModalOpen] = useState<boolean>(false);

  const toggleChatBotModal = () => setisChatBotModalOpen(!isChatBotModalOpen);
  const closeChatBotModal = () => setisChatBotModalOpen(false);
  return (
    <div className="flex justify-center main-background gap-5 2xl:gap-10 lg:min-h-screen">
      <Header />
      <Navbar />
      <div className="flex flex-col items-center justify-between md:mt-48 lg:ml-20 mt-36 lg:mr-2 lg:mt-28 gap-10 h-full w-full">
        <div className="relative md:h-full w-full lg:w-auto flex justify-center">
          <Outlet />
        </div>
        <Footer />
      </div>
      <div
        onClick={toggleChatBotModal}
        className="fixed bottom-5 right-5 top w-16 h-16 rounded-full bg-white cursor-pointer"
      >
        <img className="w-16 h-16" src={chatBotIcon} alt="" />
      </div>
      <ChatBotModal isOpen={isChatBotModalOpen} onClose={closeChatBotModal} />
    </div>
  );
};

export default Layout;
