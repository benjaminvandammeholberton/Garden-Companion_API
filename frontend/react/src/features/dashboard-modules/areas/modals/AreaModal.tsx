// lib
import ReactDOM from "react-dom";

// hooks
import { useEffect, useState } from "react";

// assets
import { greenhouse } from "../../../../assets/assets-path";

// components
import Diary from "../../../diary/Diary";
import TableProduction from "../../../../components/table-production/TableProduction";

interface AreaModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AreaModal: React.FC<AreaModalProps> = ({ isOpen, onClose }) => {
  const [diaryOpen, setDiaryOpen] = useState(true);
  const [tableOpen, setTableOpen] = useState(false);

  const tableDisplay = () => {
    if (!tableOpen) {
      setDiaryOpen(false);
      setTableOpen(true);
    }
  };

  const diaryDisplay = () => {
    if (!diaryOpen) {
      setDiaryOpen(true);
      setTableOpen(false);
    }
  };

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest(".area-modal-content") && isOpen) {
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
    <div className="fixed inset-0 flex justify-center h-full ">
      <div className="absolute inset-0 bg-gray-900 opacity-50 "></div>
      <div className="area-modal-content px-5 bg-white w-3/4 h-3/4 absolute  left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2  rounded-3xl flex flex-col">
        <div
          className="absolute cursor-pointer top-5 right-5"
          onClick={onClose}
        >
          <span className="p-2 text-4xl md:text-2xl">&times;</span>
        </div>
        <div className="flex gap-3  p-5 items-center justify-center ">
          <img className="" src={greenhouse} alt="" />
          <span className="text-2xl font-thin ">Serre - Gauche</span>
        </div>

        <div className="">
          <ul className="flex justify-center gap-36 p-2 text-lg ">
            <li
              onClick={diaryDisplay}
              className={`cursor-pointer ${
                diaryOpen ? "border-b border-black" : ""
              }  px-2 h-full w-full text-center`}
            >
              Journal
            </li>
            <li
              onClick={tableDisplay}
              className={`cursor-pointer ${
                tableOpen ? "border-b border-black" : ""
              }  px-2 h-full w-full text-center`}
            >
              Tableau de production
            </li>
          </ul>
        </div>
        <div className="w-full h-full overflow-scroll px-5 mr-10">
          {diaryOpen ? <Diary /> : <TableProduction />}
        </div>
      </div>
    </div>,
    document.getElementById("portal")!
  );
};

export default AreaModal;
