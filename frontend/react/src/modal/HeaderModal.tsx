import ReactDOM from "react-dom";
import RenderHeaderModalContent from "./RenderHeaderModalContent";
import { useEffect } from "react";

interface HeaderModalProps {
  isOpen: boolean;
  content: string | null;
  onClose: () => void;
}

const HeaderModal: React.FC<HeaderModalProps> = ({
  isOpen,
  content,
  onClose,
}) => {
  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (
        !target.closest(".header-modal-content") &&
        !target.closest(".header-modal-button") &&
        isOpen
      ) {
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
    <div className="header-modal-content fixed top-[76px] z-50 right-5 w-[350px] h-[80%] flex flex-col items-center border-x border-b bg-white rounded-b-3xl">
      <RenderHeaderModalContent content={content} />
    </div>,
    document.getElementById("portal")!
  );
};

export default HeaderModal;
