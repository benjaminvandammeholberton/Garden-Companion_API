// assets
import { greenhouse, outdoor, indoor } from "../../../../assets/assets-path";
import { unknowIcon } from "../../../../assets/assets-path";
import areaMaps from "../../../../maps/areaEnvironnementsIconsMaps";

import useGetAreas from "../../../../hooks/useGetAreas";
import useCompletion from "../../../../hooks/useCompletion";
import { Dispatch, SetStateAction, useEffect } from "react";

interface InputUserAreasInterface {
  setInput: Dispatch<SetStateAction<string>>;
  inputErrorMessage: string | null;
  setInputErrorMessage: Dispatch<SetStateAction<string | null>>;
}

const InputUserAreas: React.FC<InputUserAreasInterface> = ({
  setInput,
  inputErrorMessage,
  setInputErrorMessage,
}) => {
  const [areas] = useGetAreas();
  const [
    isAreaFocus,
    setIsAreaFocus,
    areaInput,
    areaChoices,
    handleAreaClickOnChoice,
    handleAreaInputChange,
  ] = useCompletion(areas, "name", "data-area");

  useEffect(() => {
    const areaSelected = areas.find((area) => area.name === areaInput);
    if (areaSelected) {
      setInput(areaSelected.area_id);
      setInputErrorMessage(null);
    } else {
      if (areaInput.length > 0)
        setInputErrorMessage("Zone de culture invalide");
      setInput("");
    }
  });

  const areaObject = areas.find((area) => area.name === areaInput);

  const areaIcon = areaObject
    ? areaMaps.filter(
        (area) => area[areaObject.environnement] !== undefined
      )[0]?.[areaObject.environnement]
    : unknowIcon;

  return (
    <div className="flex flex-col items-center">
      <label htmlFor="" className="text-lg">
        Zone de culture **
      </label>
      <div className="relative">
        {areaInput.length > 0 && (
          <img
            className="absolute top-[9px] left-2 w-5"
            src={areaIcon}
            alt=""
          />
        )}
        <input
          value={areaInput}
          onChange={handleAreaInputChange}
          onFocus={() => {
            setIsAreaFocus(true);
          }}
          onBlur={() => {
            setIsAreaFocus(false);
          }}
          className={`
          border 
          border-zinc-400 
          outline-gray-200 
          px-2 
          w-64 
          h-10 
          pl-9
          rounded-xl
          ${isAreaFocus ? "" : "cursor-pointer"}
          ${inputErrorMessage ? "border-red-500" : ""}
          `}
        />
        {inputErrorMessage && (
          <div className="text-red-500 ml-10">{inputErrorMessage}</div>
        )}
        <div
          className={`
          choices-list 
          flex 
          flex-col 
          gap-1 
          border
          absolute 
          bg-white 
          w-64 
          h-44 
          top-12
          rounded-xl
          px-2
          ${!isAreaFocus && "hidden"}
          `}
          onFocus={() => {
            setIsAreaFocus(true);
          }}
          onBlur={() => {
            setIsAreaFocus(false);
          }}
        >
          <ul className="m-1 overflow-y-scroll">
            {areaChoices?.map((area, index) => {
              let areaIcon = "";
              area.environnement === "greenhouse"
                ? (areaIcon = greenhouse)
                : area.environnement === "indoor"
                ? (areaIcon = indoor)
                : area.environnement === "outdoor"
                ? (areaIcon = outdoor)
                : (areaIcon = "");

              return (
                <li
                  key={index}
                  data-area={area.name}
                  className="flex items-center gap-2 cursor-pointer"
                  onMouseDown={handleAreaClickOnChoice}
                >
                  <img className="w-6" src={areaIcon} alt="" />
                  <span className="text-lg">{area.name}</span>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default InputUserAreas;
