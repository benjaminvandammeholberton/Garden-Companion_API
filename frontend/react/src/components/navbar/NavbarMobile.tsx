import ReactDOM from "react-dom";
import CloseModal from "../CloseModal";
import { useEffect } from "react";
import dashboardIcon from "../../assets/navbar/dashboard.png";
import diaryIcon from "../../assets/navbar/diary.png";
import guideIcon from "../../assets/navbar/guide.png";
import seeedsIcon from "../../assets/navbar/seeds.png";
import toolsIcon from "../../assets/navbar/tools.png";
import networkIcon from "../../assets/navbar/network.png";
import NavlinkMobile from "./NavlinkMobile";

interface NavbarMobileInterface {
  onClose: () => void;
  isOpen: boolean;
}

const NavbarMobile: React.FC<NavbarMobileInterface> = ({ onClose, isOpen }) => {
  // Prevent scrolling of body content when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("overflow-hidden");
      document.body.classList.remove("overflow-auto");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
    // Cleanup function to reset overflow style when component unmounts
    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [isOpen]);
  if (!isOpen) return null;
  return ReactDOM.createPortal(
    <div className="fixed bottom-0 right-0 w-full h-full z-50 bg-white flex justify-center items-center">
      <CloseModal onClose={onClose} />
      <div className="flex flex-col borer justify-around h-full py-10">
        <div className="">
          <NavlinkMobile
            path="me/dashboard"
            imgUrl={dashboardIcon}
            onClose={onClose}
            title="Tableau de bord"
          />
        </div>
        <div>
          <NavlinkMobile
            path="me/myspace"
            imgUrl={diaryIcon}
            onClose={onClose}
            title="Journal de culture"
          />
        </div>
        <NavlinkMobile
          path="/network"
          imgUrl={networkIcon}
          onClose={onClose}
          title="Communauté"
        />
        <NavlinkMobile
          path="me/seeds"
          imgUrl={seeedsIcon}
          onClose={onClose}
          title="Graines"
        />
        <NavlinkMobile
          path="me/tools"
          imgUrl={toolsIcon}
          onClose={onClose}
          title="Matériel"
        />
        <NavlinkMobile
          path="me/guide"
          imgUrl={guideIcon}
          onClose={onClose}
          title="Guide de culture"
        />
      </div>
    </div>,
    document.getElementById("portal")!
  );
};
export default NavbarMobile;
