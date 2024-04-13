import DirectSowingForm from "../components/dashboard-modules/plant-manager/DirectSowingForm";
import HarvestForm from "../components/dashboard-modules/plant-manager/HarvestForm";
import IndirectSowingForm from "../components/dashboard-modules/plant-manager/IndirectSowingForm";
import PlantingForm from "../components/dashboard-modules/plant-manager/PlantingForm";
import RemoveForm from "../components/dashboard-modules/plant-manager/RemoveForm";

interface RenderPlantManagerModalContentProps {
  content: string | null;
  onClose: () => void;
}

const RenderPlantManagerModalContent: React.FC<
  RenderPlantManagerModalContentProps
> = ({ content, onClose }) => {
  switch (content) {
    case "direct-sowing":
      return <DirectSowingForm />;
    case "indirect-sowing":
      return <IndirectSowingForm />;
    case "planting":
      return <PlantingForm />;
    case "harvest":
      return <HarvestForm />;
    case "remove":
      return <RemoveForm onClose={onClose} />;
    default:
      return null;
  }
};

export default RenderPlantManagerModalContent;
