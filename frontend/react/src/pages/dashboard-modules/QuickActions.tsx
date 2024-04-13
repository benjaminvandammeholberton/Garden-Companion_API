import { useState } from "react";
import PlantManagerModal from "../../modal/PlantManagerModal";

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
      <h1 className="text-2xl font-thin text-center">Actions rapides</h1>
      <div className="flex flex-col h-full justify-center items-center  gap-5 lg:gap-8">
        <div className="flex gap-8">
          <div className="transition ease-in-out hover:scale-110 flex flex-col items-center cursor-pointer">
            <img
              onClick={() => openModal("direct-sowing")}
              className="w-11"
              src="./assets/plant-manager/direct-sowing.png"
              alt=""
            />
            <p className="text-sm text-gray-500">Semi en place</p>
          </div>
          <div className="transition ease-in-out hover:scale-110 flex flex-col items-center cursor-pointer">
            <img
              onClick={() => openModal("indirect-sowing")}
              className="w-11"
              src="./assets/plant-manager/indirect-sowing.png"
              alt=""
            />
            <p className="text-sm text-gray-500">Semi en pot</p>
          </div>
          <div className="transition ease-in-out hover:scale-110 flex flex-col items-center cursor-pointer">
            <img
              onClick={() => openModal("planting")}
              className="w-11"
              src="./assets/plant-manager/planting.png"
              alt=""
            />
            <p className="text-sm text-gray-500">Planter</p>
          </div>
        </div>
        <div className="flex gap-10">
          <div className="transition ease-in-out hover:scale-110 flex flex-col items-center cursor-pointer">
            <img
              onClick={() => openModal("harvest")}
              className="w-11"
              src="./assets/plant-manager/harvest.png"
              alt=""
            />
            <p className="text-sm text-gray-500">Récolter</p>
          </div>
          <div className="transition ease-in-out hover:scale-110 flex flex-col items-center cursor-pointer">
            <img
              onClick={() => openModal("remove")}
              className="w-11"
              src="./assets/plant-manager/remove.png"
              alt=""
            />
            <p className="text-sm text-gray-500">Fin de culture</p>
          </div>
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
