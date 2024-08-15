import DirectSowingForm from "../features/dashboard-modules/actions/DirectSowingForm";
import HarvestForm from "../features/dashboard-modules/actions/HarvestForm";
import IndirectSowingForm from "../features/dashboard-modules/actions/IndirectSowingForm";
import PlantingForm from "../features/dashboard-modules/actions/PlantingForm";
import RemoveForm from "../features/dashboard-modules/actions/RemoveForm";

interface RenderPlantManagerModalContentProps {
  content: string | null;
  onClose: () => void;
}

const RenderPlantManagerModalContent: React.FC<
  RenderPlantManagerModalContentProps
> = ({ content, onClose }) => {
  switch (content) {
    case "direct-sowing":
      return <DirectSowingForm onClose={onClose} />;
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
