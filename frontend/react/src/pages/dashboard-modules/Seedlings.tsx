import carrot from "../../assets/landing/icons/carrot.png";
import tomato from "../../assets/landing/icons/tomato.png";
import addIcon from "../../assets/dashboard-modules/seedlings/add.png";
import sortIcon from "../../assets/dashboard-modules/seedlings/sort.png";
import infoIcon from "../../assets/dashboard-modules/seedlings/info.png";

const Seedlings = () => {
  return (
    <div className=" relative w-full h-full overflow-hidden pb-3">
      <div className="absolute top-2 right-2 cursor-pointer">
        <img className="w-10 h-10" src={addIcon} alt="" />
      </div>
      <div className="absolute top-2 left-2 cursor-pointer">
        <img className="w-10 h-10" src={sortIcon} alt="" />
      </div>
      <div className="flex justify-center items-center gap-2">
        <h1 className="py-3 text-2xl font-thin text-center">Mes semis</h1>
        <img className="w-4 h-4 cursor-pointer" src={infoIcon} alt="" />
      </div>
      <ul className="text-xl font-thin overflow-y-scroll h-5/6 p-2">
        <li className="flex gap-3 w-full justify-between">
          <div className="cursor-pointer flex gap-3">
            <img className="w-5 h-5" src={carrot} alt="" />
            <span>Carotte - Nantaise</span>
          </div>
          <span className="flex items-center">2 sem</span>
        </li>
        <li className="flex gap-3 w-full justify-between">
          <div className="cursor-pointer flex gap-3">
            <img className="w-5 h-5" src={carrot} alt="" />
            <span>Carotte - Yellowstone</span>
          </div>
          <span className="flex items-center">4 sem</span>
        </li>
        <li className="flex gap-3 w-full justify-between">
          <div className="cursor-pointer flex gap-3">
            <img className="w-5 h-5" src={carrot} alt="" />
            <span>Carotte - Nantaise</span>
          </div>
          <span className="flex items-center">6 sem</span>
        </li>
        <li className="flex gap-3 w-full justify-between">
          <div className="cursor-pointer flex gap-3">
            <img className="w-5 h-5" src={tomato} alt="" />
            <span>Tomate - Ananas</span>
          </div>
          <span className="flex items-center">2 sem</span>
        </li>
        <li className="flex gap-3 w-full justify-between">
          <div className="cursor-pointer flex gap-3">
            <img className="w-5 h-5" src={tomato} alt="" />
            <span>Tomate - Coeur de Boeuf</span>
          </div>
          <span className="flex items-center">3 sem</span>
        </li>
        <li className="flex gap-3 w-full justify-between">
          <div className="cursor-pointer flex gap-3">
            <img className="w-5 h-5" src={tomato} alt="" />
            <span>Tomate - Géante</span>
          </div>
          <span className="flex items-center">8 sem</span>
        </li>
      </ul>
    </div>
  );
};
export default Seedlings;
