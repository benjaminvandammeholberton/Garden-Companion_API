import { useState } from "react";

import HeaderModal from "../../modal/HeaderModal";

import burgerMenuIcon from "../../assets/header/burger-menu.png";
import chatIcon from "../../assets/header/chat.png";
import logoutIcon from "../../assets/header/logout.png";
import notificationsIcon from "../../assets/header/notification.png";
import userIcon from "../../assets/header/user.png";

const Header = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [modalContent, setModalContent] = useState<string | null>(null);

  const toggleModal = (content: string | null) => {
    if (content === modalContent) {
      setIsModalOpen(false);
      setModalContent(null);
    } else {
      setIsModalOpen(true);
      setModalContent(content);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalContent(null);
  };

  const today = new Date();
  const options: Intl.DateTimeFormatOptions = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  return (
    <div className="w-full fixed z-50 bg-white border-b">
      <div className="lg:hidden flex flex-col items-center w-full gap-2 lg:pb-2">
        <div className="flex gap-5 items-center"></div>
        <div className="text-center">
          <h1 className="text-2xl lg:text-3xl font-thin ">
            Garden Companion <span className="text-sm lg:text-xl ">Beta</span>
          </h1>
          <span className="font-thin lg:text-lg">
            {today.toLocaleDateString("fr-FR", options)}
          </span>
        </div>
        <div className="flex items-center w-full justify-center gap-10 border-y py-1">
          <img className="w-8 h-10 xl:hidden" src={burgerMenuIcon} alt="" />
          <img
            className="w-8 h-8 cursor-pointer "
            src={notificationsIcon}
            alt=""
          />
          <img className="w-9 h-9" src={chatIcon} alt="" />
          <img className="w-9 h-9" src={userIcon} alt="" />

          <img className="w-8 h-8" src={logoutIcon} alt="" />
        </div>
      </div>

      <div className="hidden bg-white opacity-95 lg:flex items-center justify-between w-full border-b px-10 py-2">
        <div className="flex flex-col items-center">
          <h1 className="text-2xl lg:text-3xl font-thin ">
            Garden Companion <span className="text-sm lg:text-xl ">Beta</span>
          </h1>
          <span className="font-thin lg:text-md">
            {today.toLocaleDateString("fr-FR", options)}
          </span>
        </div>
        <div className="flex gap-5 items-center">
          <img
            className="header-modal-button w-8 h-8 hidden lg:block cursor-pointer"
            src={notificationsIcon}
            alt=""
            onClick={() => toggleModal("notifications")}
          />
          <img
            className="header-modal-button w-9 h-9 cursor-pointer"
            src={chatIcon}
            alt=""
            onClick={() => toggleModal("chat")}
          />
          <img
            className="header-modal-button w-9 h-9 cursor-pointer"
            src={userIcon}
            alt=""
            onClick={() => toggleModal("settings")}
          />

          <img className="w-8 h-10 xl:hidden" src={burgerMenuIcon} alt="" />
          <img className="w-8 h-8" src={logoutIcon} alt="" />
        </div>
      </div>
      <HeaderModal
        isOpen={isModalOpen}
        content={modalContent}
        onClose={closeModal}
      />
    </div>
  );
};
export default Header;
