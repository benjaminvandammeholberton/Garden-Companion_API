import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import { useState } from "react";

import Footer from "./components/footer/Footer";
import Header from "./components/header/Header";
import Navbar from "./components/navbar/Navbar";
import Dashboard from "./pages/Dashboard";
import Guide from "./pages/Guide";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import Production from "./pages/Production";
import Register from "./pages/Register";
import Seedlings from "./pages/Seedlings";
import Settings from "./pages/Settings";
import ChatBotModal from "./modal/ChatBotModal";
import "./index.css";

const Layout = () => {
  const [isChatBotModalOpen, setisChatBotModalOpen] = useState<boolean>(false);

  const toggleChatBotModal = () => setisChatBotModalOpen(!isChatBotModalOpen);
  const closeChatBotModal = () => setisChatBotModalOpen(false);
  return (
    <div className="flex justify-center main-background gap-5 2xl:gap-10 md:min-h-screen">
      <Header />
      <Navbar />
      <div className="flex flex-col items-center justify-center ml-20 mt-36 lg:mr-2 lg:mt-28 gap-10 md:min-h-screen w-full">
        <div className="relative  md:h-full">
          <Outlet />
        </div>
        <Footer />
      </div>
      <div
        onClick={toggleChatBotModal}
        className="fixed bottom-5 right-5 top w-16 h-16 rounded-full bg-white cursor-pointer"
      >
        <img className="w-16 h-16" src="./assets/header/chatbot.png" alt="" />
      </div>
      <ChatBotModal isOpen={isChatBotModalOpen} onClose={closeChatBotModal} />
    </div>
  );
};

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Landing />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/register",
      element: <Register />,
    },
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/dashboard",
          element: <Dashboard />,
        },
        {
          path: "/seedlings",
          element: <Seedlings />,
        },
        {
          path: "/production",
          element: <Production />,
        },
        {
          path: "/guide",
          element: <Guide />,
        },
        {
          path: "settings",
          element: <Settings />,
        },
      ],
    },
    {
      path: "*",
      element: <NotFound />,
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
