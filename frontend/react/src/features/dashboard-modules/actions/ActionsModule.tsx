import { useState } from "react";

import PlantManagerModal from "../../../modal/PlantManagerModal";

import directSowingIcon from "../../../assets/actions-icons/direct-sowing.png";
import harvestIcon from "../../../assets/actions-icons/harvest.png";
import plantingIcon from "../../../assets/actions-icons/planting.png";
import removeIcon from "../../../assets/actions-icons/remove.png";
import mulchIcon from "../../../assets/actions-icons/mulch.png";
import wateringIcon from "../../../assets/actions-icons/watering.png";
import fertilizeIcon from "../../../assets/actions-icons/fertilize.png";
import weedIcon from "../../../assets/actions-icons/weed.png";
import parasiteIcon from "../../../assets/actions-icons/parasite.png";
import cameraIcon from "../../../assets/actions-icons/camera.png";
import noteIcon from "../../../assets/actions-icons/pin.png";

interface ActionsModuleProps {}

const ActionsModule: React.FC<ActionsModuleProps> = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [modalContent, setModalContent] = useState<string | null>(null);

  const closeModal = () => setIsModalOpen(false);
  const openModal = (content: string | null) => {
    setIsModalOpen(true);
    setModalContent(content);
  };
  return (
    <div>
      <div
        className="
      grid
      grid-cols-3
      place-content-around
      gap-3
      "
      >
        <div
          onClick={() => openModal("direct-sowing")}
          className="transition ease-in-out hover:scale-110 flex flex-col items-center cursor-pointer"
        >
          <img
            onClick={() => openModal("direct-sowing")}
            className="w-10"
            src={directSowingIcon}
            alt=""
          />
          <p className="text-sm text-gray-500">Semer</p>
        </div>
        <div
          onClick={() => openModal("planting")}
          className="transition ease-in-out hover:scale-110 flex flex-col items-center cursor-pointer"
        >
          <img
            onClick={() => openModal("planting")}
            className="w-10"
            src={plantingIcon}
            alt=""
          />
          <p className="text-sm text-gray-500">Planter</p>
        </div>
        <div
          onClick={() => openModal("remove")}
          className="transition ease-in-out hover:scale-110 flex flex-col items-center cursor-pointer"
        >
          <img
            onClick={() => openModal("remove")}
            className="w-10"
            src={wateringIcon}
            alt=""
          />
          <p className="text-sm text-gray-500">Arroser</p>
        </div>
        <div
          onClick={() => openModal("remove")}
          className="transition ease-in-out hover:scale-110 flex flex-col items-center cursor-pointer"
        >
          <img
            onClick={() => openModal("remove")}
            className="w-10"
            src={fertilizeIcon}
            alt=""
          />
          <p className="text-sm text-gray-500">Fertiliser</p>
        </div>
        <div
          onClick={() => openModal("remove")}
          className="transition ease-in-out hover:scale-110 flex flex-col items-center cursor-pointer"
        >
          <img
            onClick={() => openModal("remove")}
            className="w-10"
            src={parasiteIcon}
            alt=""
          />
          <p className="text-sm text-gray-500">Traiter</p>
        </div>
        <div
          onClick={() => openModal("harvest")}
          className="transition ease-in-out hover:scale-110 flex flex-col items-center cursor-pointer"
        >
          <img
            onClick={() => openModal("harvest")}
            className="w-10"
            src={harvestIcon}
            alt=""
          />
          <p className="text-sm text-gray-500">Récolter</p>
        </div>

        <div
          onClick={() => openModal("remove")}
          className="transition ease-in-out hover:scale-110 flex flex-col items-center cursor-pointer"
        >
          <img
            onClick={() => openModal("remove")}
            className="w-10"
            src={removeIcon}
            alt=""
          />
          <p className="text-sm text-gray-500">Fin de culture</p>
        </div>

        <div
          onClick={() => openModal("remove")}
          className="transition ease-in-out hover:scale-110 flex flex-col items-center cursor-pointer"
        >
          <img
            onClick={() => openModal("remove")}
            className="w-10"
            src={weedIcon}
            alt=""
          />
          <p className="text-sm text-gray-500">Nettoyer</p>
        </div>

        <div
          onClick={() => openModal("remove")}
          className="transition ease-in-out hover:scale-110 flex flex-col items-center cursor-pointer"
        >
          <img
            onClick={() => openModal("remove")}
            className="w-10"
            src={mulchIcon}
            alt=""
          />
          <p className="text-sm text-gray-500">Pailler</p>
        </div>
      </div>
      <div className="flex justify-center gap-20 mt-5">
        <div
          onClick={() => openModal("remove")}
          className="transition ease-in-out hover:scale-110 flex flex-col items-center cursor-pointer"
        >
          <img
            onClick={() => openModal("remove")}
            className="w-10"
            src={cameraIcon}
            alt=""
          />
          <p className="text-sm text-gray-500">Photo</p>
        </div>

        <div
          onClick={() => openModal("remove")}
          className="transition ease-in-out hover:scale-110 flex flex-col items-center cursor-pointer"
        >
          <img
            onClick={() => openModal("remove")}
            className="w-10"
            src={noteIcon}
            alt=""
          />
          <p className="text-sm text-gray-500">Note</p>
        </div>
      </div>
      <PlantManagerModal
        isOpen={isModalOpen}
        onClose={closeModal}
        actionName={modalContent}
      />
    </div>
  );
};
export default ActionsModule;
