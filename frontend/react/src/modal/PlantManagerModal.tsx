import { useEffect } from "react";
import ReactDOM from "react-dom";

import RenderPlantManagerModalContent from "./RenderPlantManagerModalContent";
import CloseModal from "../components/CloseModal";

interface PlantManagerModalProps {
  isOpen: boolean;
  onClose: () => void;
  actionName: string | null;
}

const PlantManagerModal: React.FC<PlantManagerModalProps> = ({
  isOpen,
  onClose,
  actionName,
}) => {
  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest(".plant-manager-modal-content") && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleOutsideClick);
    }

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [isOpen, onClose]);

  // Prevent scrolling of body content when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("overflow-hidden");
      document.body.classList.add("lg:overflow-auto");
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

  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div className="fixed inset-0 flex items-center justify-center  z-50">
      <div className="absolute inset-0 bg-gray-900 opacity-50"></div>
      <div
        className="
      plant-manager-modal-content 
      bg-white 
      fixed md:absolute 
      left-1/2 
      top-1/2 
      transform 
      -translate-x-1/2
      -translate-y-1/2
      md:rounded-3xl
      p-5
      w-full md:w-[750px]
      h-full md:h-[500px]
      "
      >
        <CloseModal {...{ onClose }} />
        <div className="flex flex-col justify-center items-center h-full">
          <RenderPlantManagerModalContent
            content={actionName}
            onClose={onClose}
          />
        </div>
      </div>
    </div>,
    document.getElementById("portal")!
  );
};

export default PlantManagerModal;
