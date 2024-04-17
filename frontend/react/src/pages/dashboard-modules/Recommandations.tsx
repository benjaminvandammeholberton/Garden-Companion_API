import infoIcon from "../../assets/dashboard-modules/seedlings/info.png";
import cauliflowerIcon from "../../assets/vegetables-icons/cauliflower.png";
import tomatoIcon from "../../assets/vegetables-icons/tomato.png";
import kaleIcon from "../../assets/vegetables-icons/kale.png";
import pepperIcon from "../../assets/vegetables-icons/pepper.png";
import chiliIcon from "../../assets/vegetables-icons/chili.png";
import cucumberIcon from "../../assets/vegetables-icons/cucumber.png";
import eggplantIcon from "../../assets/vegetables-icons/eggplant.png";
import radishIcon from "../../assets/vegetables-icons/radish.png";
import spinachIcon from "../../assets/vegetables-icons/spinach.png";
import mushroomIcon from "../../assets/vegetables-icons/mushroom.png";
import zucchiniIcon from "../../assets/vegetables-icons/zucchini.png";
import basilIcon from "../../assets/vegetables-icons/basil.png";
import potatoIcon from "../../assets/vegetables-icons/potato.png";
import garlicIcon from "../../assets/vegetables-icons/garlic.png";
import filterIcon from "../../assets/vegetables-icons/filter.png";

const Recommandations = () => {
  return (
    <div className=" relative  h-full overflow-hidden pb-3 w-full">
      <div className="flex justify-center items-center gap-2">
        <h1 className="py-3 text-2xl font-thin text-center">
          C'est le moment !
        </h1>
        <img className="w-4 h-4 cursor-pointer" src={infoIcon} alt="" />
      </div>
      <div className="absolute top-4 left-4 cursor-pointer">
        <img className="w-6 h-6" src={filterIcon} alt="" />
      </div>
      <div className="grid grid-cols-4 gap-6 mt-2 h-[270px] px-3 pb-1 overflow-scroll w-full ">
        <div className="flex flex-col items-center">
          <img className="w-10" src={cauliflowerIcon} alt="" />
          <span className="text-xs">Chou-fleur</span>
        </div>
        <div className="flex flex-col items-center">
          <img className="w-10" src={tomatoIcon} alt="" />
          <span className="text-xs">Tomate</span>
        </div>
        <div className="flex flex-col items-center">
          <img className="w-10" src={kaleIcon} alt="" />
          <span className="text-xs">Chou kale</span>
        </div>
        <div className="flex flex-col items-center">
          <img className="w-10" src={pepperIcon} alt="" />
          <span className="text-xs">Poivron</span>
        </div>
        <div className="flex flex-col items-center">
          <img className="w-10" src={chiliIcon} alt="" />
          <span className="text-xs">Piment</span>
        </div>
        <div className="flex flex-col items-center">
          <img className="w-10" src={cucumberIcon} alt="" />
          <span className="text-xs">Concombre</span>
        </div>
        <div className="flex flex-col items-center">
          <img className="w-10" src={eggplantIcon} alt="" />
          <span className="text-xs">Aubergine</span>
        </div>
        <div className="flex flex-col items-center">
          <img className="w-10" src={radishIcon} alt="" />
          <span className="text-xs">Radis</span>
        </div>
        <div className="flex flex-col items-center">
          <img className="w-10" src={cauliflowerIcon} alt="" />
          <span className="text-xs">Chou-fleur</span>
        </div>
        <div className="flex flex-col items-center">
          <img className="w-10" src={tomatoIcon} alt="" />
          <span className="text-xs">Tomate</span>
        </div>
        <div className="flex flex-col items-center">
          <img className="w-10" src={kaleIcon} alt="" />
          <span className="text-xs">Chou kale</span>
        </div>
        <div className="flex flex-col items-center">
          <img className="w-10" src={pepperIcon} alt="" />
          <span className="text-xs">Poivron</span>
        </div>
        <div className="flex flex-col items-center">
          <img className="w-10" src={chiliIcon} alt="" />
          <span className="text-xs">Piment</span>
        </div>
        <div className="flex flex-col items-center">
          <img className="w-10" src={cucumberIcon} alt="" />
          <span className="text-xs">Concombre</span>
        </div>
        <div className="flex flex-col items-center">
          <img className="w-10" src={eggplantIcon} alt="" />
          <span className="text-xs">Aubergine</span>
        </div>
        <div className="flex flex-col items-center">
          <img className="w-10" src={radishIcon} alt="" />
          <span className="text-xs">Radis</span>
        </div>
        <div className="flex flex-col items-center">
          <img className="w-10" src={basilIcon} alt="" />
          <span className="text-xs">Basilic</span>
        </div>
        <div className="flex flex-col items-center">
          <img className="w-10" src={zucchiniIcon} alt="" />
          <span className="text-xs">Courgette</span>
        </div>
        <div className="flex flex-col items-center">
          <img className="w-10" src={mushroomIcon} alt="" />
          <span className="text-xs">Champignon</span>
        </div>
        <div className="flex flex-col items-center">
          <img className="w-10" src={spinachIcon} alt="" />
          <span className="text-xs">Épinard</span>
        </div>
        <div className="flex flex-col items-center">
          <img className="w-10" src={potatoIcon} alt="" />
          <span className="text-xs">Pomme de terre</span>
        </div>
        <div className="flex flex-col items-center">
          <img className="w-10" src={garlicIcon} alt="" />
          <span className="text-xs">Ail</span>
        </div>
      </div>
    </div>
  );
};
export default Recommandations;
