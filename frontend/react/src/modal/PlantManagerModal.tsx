import { useEffect } from "react";

import ReactDOM from "react-dom";
import RenderPlantManagerModalContent from "./RenderPlantManagerModalContent";

interface PlantManagerModalProps {
  isOpen: boolean;
  onClose: () => void;
  content: string | null;
}

const PlantManagerModal: React.FC<PlantManagerModalProps> = ({
  isOpen,
  onClose,
  content,
}) => {
  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest(".chat-bot-modal-content") && isOpen) {
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

  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div className="fixed inset-0 flex items-center justify-center">
      <div className="absolute inset-0 bg-gray-900 opacity-50"></div>
      <div className="chat-bot-modal-content bg-white absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-3xl p-5">
        <span className="cursor-pointer" onClick={onClose}>
          &times;
        </span>
        <RenderPlantManagerModalContent content={content} onClose={onClose} />
      </div>
    </div>,
    document.getElementById("portal")!
  );
};

export default PlantManagerModal;
