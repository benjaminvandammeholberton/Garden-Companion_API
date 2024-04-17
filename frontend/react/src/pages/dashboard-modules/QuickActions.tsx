import { useState } from "react";

import PlantManagerModal from "../../modal/PlantManagerModal";

import directSowingIcon from "../../assets/plant-manager/direct-sowing.png";
import harvestIcon from "../../assets/plant-manager/harvest.png";
import plantingIcon from "../../assets/plant-manager/planting.png";
import removeIcon from "../../assets/plant-manager/remove.png";
import mulchIcon from "../../assets/plant-manager/mulch.png";
import wateringIcon from "../../assets/plant-manager/watering.png";
import fertilizeIcon from "../../assets/plant-manager/fertilize.png";
import weedIcon from "../../assets/plant-manager/weed.png";
import parasiteIcon from "../../assets/plant-manager/parasite.png";

interface QuickActionsProps {}

const QuickActions: React.FC<QuickActionsProps> = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [modalContent, setModalContent] = useState<string | null>(null);

  const closeModal = () => setIsModalOpen(false);
  const openModal = (content: string | null) => {
    setIsModalOpen(true);
    setModalContent(content);
  };
  return (
    <div className="w-full h-full pb-5">
      <h1 className="pt-3 text-2xl font-thin text-center">Actions</h1>
      <div className="mt-2 grid grid-cols-3 p-1 place-content-around gap-4 justify-center items-center ">
        <div className="transition ease-in-out hover:scale-110 flex flex-col items-center cursor-pointer">
          <img
            onClick={() => openModal("direct-sowing")}
            className="w-14"
            src={directSowingIcon}
            alt=""
          />
          <p className="text-sm text-gray-500">Semer</p>
        </div>
        <div className="transition ease-in-out hover:scale-110 flex flex-col items-center cursor-pointer">
          <img
            onClick={() => openModal("planting")}
            className="w-14"
            src={plantingIcon}
            alt=""
          />
          <p className="text-sm text-gray-500">Planter</p>
        </div>
        <div className="transition ease-in-out hover:scale-110 flex flex-col items-center cursor-pointer">
          <img
            onClick={() => openModal("remove")}
            className="w-14"
            src={wateringIcon}
            alt=""
          />
          <p className="text-sm text-gray-500">Arroser</p>
        </div>
        <div className="transition ease-in-out hover:scale-110 flex flex-col items-center cursor-pointer">
          <img
            onClick={() => openModal("remove")}
            className="w-14"
            src={fertilizeIcon}
            alt=""
          />
          <p className="text-sm text-gray-500">Fertiliser</p>
        </div>
        <div className="transition ease-in-out hover:scale-110 flex flex-col items-center cursor-pointer">
          <img
            onClick={() => openModal("remove")}
            className="w-14"
            src={parasiteIcon}
            alt=""
          />
          <p className="text-sm text-gray-500">Traiter</p>
        </div>
        <div className="transition ease-in-out hover:scale-110 flex flex-col items-center cursor-pointer">
          <img
            onClick={() => openModal("harvest")}
            className="w-14"
            src={harvestIcon}
            alt=""
          />
          <p className="text-sm text-gray-500">Récolter</p>
        </div>

        <div className="transition ease-in-out hover:scale-110 flex flex-col items-center cursor-pointer">
          <img
            onClick={() => openModal("remove")}
            className="w-14"
            src={removeIcon}
            alt=""
          />
          <p className="text-sm text-gray-500">Fin de culture</p>
        </div>

        <div className="transition ease-in-out hover:scale-110 flex flex-col items-center cursor-pointer">
          <img
            onClick={() => openModal("remove")}
            className="w-14"
            src={weedIcon}
            alt=""
          />
          <p className="text-sm text-gray-500">Nettoyer</p>
        </div>

        <div className="transition ease-in-out hover:scale-110 flex flex-col items-center cursor-pointer">
          <img
            onClick={() => openModal("remove")}
            className="w-14"
            src={mulchIcon}
            alt=""
          />
          <p className="text-sm text-gray-500">Pailler</p>
        </div>
      </div>
      <PlantManagerModal
        isOpen={isModalOpen}
        onClose={closeModal}
        content={modalContent}
      />
    </div>
  );
};
export default QuickActions;
