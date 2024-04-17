import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import { ReactNode, useState } from "react";

import ChatBotModal from "./modal/ChatBotModal";
import Dashboard from "./pages/Dashboard";
import Footer from "./components/footer/Footer";
import Guide from "./pages/Guide";
import Header from "./components/header/Header";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Navbar from "./components/navbar/Navbar";
import NotFound from "./pages/NotFound";
import Production from "./pages/Production";
import Register from "./pages/Register";
import Seedlings from "./pages/dashboard-modules/Seedlings";
import Settings from "./pages/Settings";

import chatBotIcon from "./assets/header/chatbot.png";

import "./index.css";
import useAuth from "./hooks/useAuth";
import Network from "./pages/Network";

interface ProtectedRouteProps {
  element: ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ element }) => {
  const [user, isLoading, isAuthenticated] = useAuth();
  console.log(user);
  console.log(isLoading);
  console.log(isAuthenticated);
  if (!user) {
    return null;
  }
  return element;
};

const Layout = () => {
  const [isChatBotModalOpen, setisChatBotModalOpen] = useState<boolean>(false);

  const toggleChatBotModal = () => setisChatBotModalOpen(!isChatBotModalOpen);
  const closeChatBotModal = () => setisChatBotModalOpen(false);
  return (
    <div className="flex justify-center main-background gap-5 2xl:gap-10 lg:min-h-screen">
      <Header />
      <Navbar />
      <div className="flex flex-col items-center justify-center md:mt-48 lg:ml-20 mt-36 lg:mr-2 lg:mt-28 gap-10 h-full w-full">
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
          element: <ProtectedRoute element={<Seedlings />} />,
        },
        {
          path: "/production",
          element: <Production />,
        },
        {
          path: "/network",
          element: <ProtectedRoute element={<Network />} />,
        },
        {
          path: "/guide",
          element: <ProtectedRoute element={<Guide />} />,
        },
        {
          path: "settings",
          element: <ProtectedRoute element={<Settings />} />,
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
