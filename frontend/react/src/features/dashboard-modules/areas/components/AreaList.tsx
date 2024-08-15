// assets
import { greenhouse, outdoor, indoor } from "../../../../assets/assets-path";
import arrow from "../../../../assets/common/up-right-arrow.png";

// hooks
import useGetAreas from "../../../../hooks/useGetAreas";

// interfaces
import {
  AreaInterface,
  VegetableInterface,
} from "../../../../interfaces/interfaces";
import AreaListItem from "./AreaListItem";

interface AreaListProps {
  sortedBy: string;
  openModal: () => void;
}

const AreaList: React.FC<AreaListProps> = ({ sortedBy, openModal }) => {
  const environnements = ["greenhouse", "outdoor", "indoor"];
  const [areas, isLoadingAreas] = useGetAreas();

  //function to make a list of unique vegetable growing in one area
  const getListUniqueVegetables = (area: AreaInterface) => {
    return area.vegetables?.reduce(
      (acc: VegetableInterface[], vegetable: VegetableInterface) => {
        if (acc.some((v) => v.name === vegetable.name)) {
          return acc;
        }
        acc.push(vegetable);
        return acc;
      },
      []
    );
  };

  // function to get the right area icon based of the environnement
  const getAreaIcon = (env: string) => {
    let areaIcon: string | undefined;
    if (env === "indoor") areaIcon = indoor;
    if (env === "greenhouse") areaIcon = greenhouse;
    if (env === "outdoor") areaIcon = outdoor;
    return areaIcon;
  };

  return (
    <div className="overflow-y-scroll overflow-x-hidden  h-[285px] my-2 pr-2 mx-2 font-thin text-xl">
      {areas.length === 0 && (
        <div className="relative w-full top-0 flex flex-col items-end p-30 gap-10">
          <img
            src={arrow}
            alt="arrow to add"
            className="absolute top-0 right-10"
          />
          <p className="w-60 absolute top-20 font-normal right-10 text-center">
            Pour commencer, ajoutez une zone de culture
          </p>
        </div>
      )}
      {isLoadingAreas && <p>Chargement</p>}

      {sortedBy === "environnement" ? (
        <ul className=" flex flex-col gap-2">
          {environnements.map((env, index) => {
            const areasOfType = areas.filter(
              (area) => area.environnement === env
            );
            const sortedAreasOfType = areasOfType.sort((a, b) =>
              a.name.localeCompare(b.name)
            );
            return (
              <div key={index}>
                {sortedAreasOfType.map((area) => {
                  return (
                    <AreaListItem
                      key={area.area_id}
                      area={area}
                      openModal={openModal}
                      areaIcon={getAreaIcon(area.environnement)}
                      vegetableUnique={getListUniqueVegetables(area)}
                    />
                  );
                })}
              </div>
            );
          })}
        </ul>
      ) : (
        <ul className="flex flex-col">
          {areas.map((area) => {
            return (
              <AreaListItem
                key={area.area_id}
                area={area}
                openModal={openModal}
                areaIcon={getAreaIcon(area.environnement)}
                vegetableUnique={getListUniqueVegetables(area)}
              />
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default AreaList;
