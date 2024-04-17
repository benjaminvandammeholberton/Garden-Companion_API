import carrot from "../../assets/landing/icons/carrot.png";
import tomato from "../../assets/landing/icons/tomato.png";
import greenhouse from "../../assets/dashboard-modules/areas/greenhouse.png";
import outdoor from "../../assets/dashboard-modules/areas/outdoor.png";
import indoor from "../../assets/dashboard-modules/areas/indoor.png";
import addIcon from "../../assets/dashboard-modules/areas/add.png";
import sortIcon from "../../assets/dashboard-modules/areas/sort.png";

const Areas = () => {
  return (
    <div className=" relative w-full h-full overflow-hidden pb-3 ">
      <div className="absolute top-2 right-2 cursor-pointer">
        <img className="w-10 h-10" src={addIcon} alt="" />
      </div>
      <div className="absolute top-2 left-2 cursor-pointer">
        <img className="w-10 h-10" src={sortIcon} alt="" />
      </div>
      <h1 className="p-3 text-2xl font-thin text-center">Zones de Culture</h1>
      <ul className="text-xl font-thin overflow-y-scroll h-5/6 mt-2 pr-2 flex flex-col gap-2">
        <div>
          <li className="flex gap-3 w-full justify-between">
            <div className="cursor-pointer flex gap-3">
              <img className="w-5 h-5" src={greenhouse} alt="" />
              <span>Serre - gauche</span>
            </div>
            <div className="flex items-center">
              <img className="w-5 h-5" src={carrot} alt="" />
              <img className="w-5 h-5" src={tomato} alt="" />
            </div>
          </li>
          <li className="flex gap-3 w-full justify-between">
            <div className="cursor-pointer flex gap-3">
              <img className="w-5 h-5" src={greenhouse} alt="" />
              <span>Serre - droite</span>
            </div>
            <div className="flex items-center">
              <img className="w-5 h-5" src={carrot} alt="" />
              <img className="w-5 h-5" src={tomato} alt="" />
            </div>
          </li>
          <li className="flex gap-3 w-full justify-between">
            <div className="cursor-pointer flex gap-3">
              <img className="w-5 h-5" src={greenhouse} alt="" />
              <span>Serre - milieu</span>
            </div>
            <div className="flex items-center">
              <img className="w-5 h-5" src={carrot} alt="" />
              <img className="w-5 h-5" src={tomato} alt="" />
            </div>
          </li>

          <li className="flex gap-3 w-full justify-between">
            <div className="cursor-pointer flex gap-3">
              <img className="w-5 h-5" src={greenhouse} alt="" />
              <span>Serre - au fond</span>
            </div>
            <div className="flex items-center">
              <img className="w-5 h-5" src={carrot} alt="" />
              <img className="w-5 h-5" src={tomato} alt="" />
            </div>
          </li>
        </div>
        <div>
          <li className="flex gap-3 w-full justify-between">
            <div className="cursor-pointer flex gap-3">
              <img className="w-5 h-5" src={outdoor} alt="" />
              <span>Jardin - 1</span>
            </div>
            <div className="flex items-center">
              <img className="w-5 h-5" src={carrot} alt="" />
              <img className="w-5 h-5" src={tomato} alt="" />
            </div>
          </li>
          <li className="flex gap-3 w-full justify-between">
            <div className="cursor-pointer flex gap-3">
              <img className="w-5 h-5" src={outdoor} alt="" />
              <span>Jardin - 2</span>
            </div>
            <div className="flex items-center">
              <img className="w-5 h-5" src={carrot} alt="" />
              <img className="w-5 h-5" src={tomato} alt="" />
            </div>
          </li>
          <li className="flex gap-3 w-full justify-between">
            <div className="cursor-pointer flex gap-3">
              <img className="w-5 h-5" src={outdoor} alt="" />
              <span>Devant - gauche</span>
            </div>
            <div className="flex items-center">
              <img className="w-5 h-5" src={carrot} alt="" />
              <img className="w-5 h-5" src={tomato} alt="" />
            </div>
          </li>
          <li className="flex gap-3 w-full justify-between">
            <div className="cursor-pointer flex gap-3">
              <img className="w-5 h-5" src={outdoor} alt="" />
              <span>Devant- droite</span>
            </div>
            <div className="flex items-center">
              <img className="w-5 h-5" src={carrot} alt="" />
              <img className="w-5 h-5" src={tomato} alt="" />
            </div>
          </li>
        </div>
        <div>
          <li className="flex gap-3 w-full justify-between">
            <div className="cursor-pointer flex gap-3">
              <img className="w-5 h-5" src={indoor} alt="" />
              <span>Cuisine</span>
            </div>
            <div className="flex items-center">
              <img className="w-5 h-5" src={carrot} alt="" />
              <img className="w-5 h-5" src={tomato} alt="" />
            </div>
          </li>

          <li className="flex gap-3 w-full justify-between">
            <div className="cursor-pointer flex gap-3">
              <img className="w-5 h-5" src={indoor} alt="" />
              <span>Garage</span>
            </div>
            <div className="flex items-center">
              <img className="w-5 h-5" src={carrot} alt="" />
              <img className="w-5 h-5" src={tomato} alt="" />
            </div>
          </li>
        </div>
      </ul>
    </div>
  );
};
export default Areas;
