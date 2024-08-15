// This component display a list of vegetable

import { VegetableInterface } from "../../../../interfaces/interfaces";
import vegetableIconsMaps from "../../../../maps/vegetableMaps";

interface VegetableIconsListInterface {
  vegetableUnique: VegetableInterface[];
}

const VegetableIconsList: React.FC<VegetableIconsListInterface> = ({
  vegetableUnique,
}) => {
  return (
    <div className="flex items-center gap-1">
      {vegetableUnique?.map((vegetable) => {
        if (!vegetable.removeDate) {
          const vegetableAsset = vegetableIconsMaps.find(
            (asset) => asset.name.fr === vegetable.name.toLowerCase()
          );
          if (vegetableAsset) {
            return (
              <div
                key={vegetable.vegetable_manager_id}
                className="relative group"
              >
                <img className="w-6 h-6" src={vegetableAsset.assets} alt="" />
                <div
                  className="
                    absolute 
                    right-0 
                    z-50 
                    text-xs 
                    text-center 
                    bg-gray-700 
                    text-white 
                    rounded 
                    py-1 
                    px-2 
                    opacity-0 
                    group-hover:opacity-100 
                    pointer-events-none
                    "
                >
                  {vegetable.name}
                </div>
              </div>
            );
          }
        }
      })}
    </div>
  );
};
export default VegetableIconsList;
