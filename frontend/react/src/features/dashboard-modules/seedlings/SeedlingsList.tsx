import carrot from "../../../assets/landing/icons/carrot.png";

import tomato from "../../../assets/landing/icons/tomato.png";

const SeedlingsList = () => {
  return (
    <div>
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

export default SeedlingsList;
