import windIcon from "../../assets/dashboard-modules/forecast/wind.png";
import sunRainIcon from "../../assets/dashboard-modules/forecast/sun-rain.png";
import sunCloudIcon from "../../assets/dashboard-modules/forecast/sun-cloud.png";
import sunIcon from "../../assets/dashboard-modules/forecast/sun.png";
import dropIcon from "../../assets/dashboard-modules/forecast/drop.png";

import infoIcon from "../../assets/dashboard-modules/seedlings/info.png";

const Forecast = () => {
  return (
    <div className=" relative w-full h-full overflow-hidden pb-3">
      <div className="flex justify-center items-center gap-2">
        <h1 className="py-3 text-2xl font-thin text-center">
          Prévisions météo
        </h1>
        <img className="w-4 h-4 cursor-pointer" src={infoIcon} alt="" />
      </div>
      <ul className="mt-[-10px] gap-2 flex flex-col text-xl font-thin overflow-y-scroll p-2">
        <li className="flex w-full justify-center items-center">
          <span className="w-40">Aujourd'hui</span>
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center justify-center gap-2">
              <img className="w-8 h-8" src={sunIcon} alt="" />
              <div className="flex flex-col justify-center items-center w-11 ">
                <img className="w-4 h-4" src={windIcon} alt="" />
                <span className="text-xs leading-0">35km/h</span>
              </div>
            </div>
            <span className="flex items-center text-base">5° - 15°</span>
          </div>
        </li>
        <li className="flex w-full justify-center items-center">
          <span className="w-40">Demain</span>
          <div className="flex items-center  justify-between w-full">
            <div className="flex items-center justify-center gap-2">
              <img className="w-8 h-8" src={sunRainIcon} alt="" />
              <div className="flex flex-col justify-center items-center  w-11">
                <img className="w-4 h-4" src={dropIcon} alt="" />
                <span className="text-xs leading-0">22 mm</span>
              </div>
              <div className="flex flex-col justify-center items-center w-11 ">
                <img className="w-4 h-4" src={windIcon} alt="" />
                <span className="text-xs leading-0">35km/h</span>
              </div>
            </div>
            <span className="flex items-center text-base">6° - 13°</span>
          </div>
        </li>
        <li className="flex w-full justify-center items-center">
          <span className="w-40">Mercredi</span>
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center justify-center gap-2">
              <img className="w-8 h-8" src={sunIcon} alt="" />
              <div className="flex flex-col justify-center items-center w-11 ">
                <img className="w-4 h-4" src={windIcon} alt="" />
                <span className="text-xs leading-0">35km/h</span>
              </div>
            </div>
            <span className="flex items-center text-base">6° - 16°</span>
          </div>
        </li>
        <li className="flex w-full justify-center items-center">
          <span className="w-40">Jeudi</span>
          <div className="flex items-center  justify-between w-full">
            <div className="flex items-center justify-center gap-2">
              <img className="w-8 h-8" src={sunRainIcon} alt="" />
              <div className="flex flex-col justify-center items-center  w-11">
                <img className="w-4 h-4" src={dropIcon} alt="" />
                <span className="text-xs leading-0">22 mm</span>
              </div>
            </div>
            <span className="flex items-center text-base">4° - 14°</span>
          </div>
        </li>
        <li className="flex w-full justify-center items-center">
          <span className="w-40">Vendredi</span>
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center justify-center gap-2">
              <img className="w-8 h-8" src={sunIcon} alt="" />
            </div>
            <span className="flex items-center text-base">7° - 21°</span>
          </div>
        </li>
        <li className="flex w-full justify-center items-center">
          <span className="w-40">Samedi</span>
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center justify-center gap-2">
              <img className="w-8 h-8" src={sunIcon} alt="" />
            </div>
            <span className="flex items-center text-base">9° - 24°</span>
          </div>
        </li>
        <li className="flex w-full justify-center items-center">
          <span className="w-40">Dimanche</span>
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center justify-center gap-2">
              <img className="w-8 h-8" src={sunCloudIcon} alt="" />
              <div className="flex flex-col justify-center items-center w-11 ">
                <img className="w-4 h-4" src={windIcon} alt="" />
                <span className="text-xs leading-0">15km/h</span>
              </div>
            </div>
            <span className="flex items-center text-base">8° - 22°</span>
          </div>
        </li>
      </ul>
    </div>
  );
};
export default Forecast;
