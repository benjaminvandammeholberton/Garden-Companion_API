import {
  windIcon,
  sunRainIcon,
  sunCloudIcon,
  sunIcon,
  dropIcon,
} from "../../../assets/assets-path";

const Forecast = () => {
  return (
    <div>
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
