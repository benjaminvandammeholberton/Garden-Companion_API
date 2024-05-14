// assets
import { greenhouse, outdoor, indoor } from "../../../../assets/assets-path";
import vegetableIconRegistry from "../../../../utils/vegetablesIconsRegistry";

// hooks
import useGetAreas from "../../../../hooks/useGetAreas";

// interfaces
import { VegetableInterface } from "../../../../interfaces/interfaces";

interface AreaListProps {
  sortedBy: string;
  openModal: () => void;
}

const AreaList: React.FC<AreaListProps> = ({ sortedBy, openModal }) => {
  const environnements = ["greenhouse", "outdoor", "indoor"];
  const [areas, isLoading] = useGetAreas();

  return (
    <div className="overflow-scroll h-[285px] my-2 pr-2 mx-2 font-thin text-xl">
      {isLoading && <p>Chargement</p>}
      {sortedBy === "environnement" ? (
        <ul className=" flex flex-col gap-2">
          {environnements.map((env, index) => {
            let areaIcon: string | undefined;
            if (env === "indoor") areaIcon = indoor;
            if (env === "greenhouse") areaIcon = greenhouse;
            if (env === "outdoor") areaIcon = outdoor;
            const areasOfType = areas.filter(
              (area) => area.environnement === env
            );
            // Sort areas of current type by name
            const sortedAreasOfType = areasOfType.sort((a, b) =>
              a.name.localeCompare(b.name)
            );
            return (
              <div key={index}>
                {sortedAreasOfType.map((area) => {
                  const vegetableUnique = area.vegetables?.reduce(
                    (
                      acc: VegetableInterface[],
                      vegetable: VegetableInterface
                    ) => {
                      if (acc.some((v) => v.name === vegetable.name)) {
                        return acc;
                      }
                      acc.push(vegetable);
                      return acc;
                    },
                    []
                  );
                  return (
                    <li
                      key={area.area_id}
                      onClick={openModal}
                      className="flex gap-3 w-full justify-between"
                    >
                      <div className="cursor-pointer flex items-center gap-3">
                        <img className="w-5 h-5" src={areaIcon} alt="" />
                        <span>{area.name}</span>
                      </div>
                      <div className="flex items-center">
                        {vegetableUnique?.map((vegetable) => {
                          if (!vegetable.removeDate)
                            return (
                              <img
                                key={vegetable.id}
                                className="w-5 h-5"
                                src={vegetableIconRegistry[vegetable.name]}
                                alt=""
                              />
                            );
                        })}
                      </div>
                    </li>
                  );
                })}
              </div>
            );
          })}
        </ul>
      ) : (
        <ul className="flex flex-col">
          {areas.map((area) => {
            let areaIcon: string | undefined;
            if (area.environnement === "indoor") areaIcon = indoor;
            if (area.environnement === "greenhouse") areaIcon = greenhouse;
            if (area.environnement === "outdoor") areaIcon = outdoor;
            const vegetableUnique = area.vegetables?.reduce(
              (acc: VegetableInterface[], vegetable: VegetableInterface) => {
                if (acc.some((v) => v.name === vegetable.name)) {
                  return acc;
                }
                acc.push(vegetable);
                return acc;
              },
              []
            );
            return (
              <li
                key={area.area_id}
                onClick={openModal}
                className="flex gap-3 w-full justify-between"
              >
                <div className="cursor-pointer flex gap-3">
                  <img className="w-5 h-5" src={areaIcon} alt="" />
                  <span>{area.name}</span>
                </div>
                <div className="flex items-center">
                  {vegetableUnique?.map((vegetable) => {
                    if (!vegetable.removeDate)
                      return (
                        <img
                          key={vegetable.id}
                          className="w-5 h-5"
                          src={vegetableIconRegistry[vegetable.name]}
                          alt=""
                        />
                      );
                  })}
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default AreaList;
