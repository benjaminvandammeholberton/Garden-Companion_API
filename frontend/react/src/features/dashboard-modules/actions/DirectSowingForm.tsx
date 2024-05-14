import directSowingIcon from "../../../assets/actions-icons/direct-sowing.png";
import ActionFormHeader from "./ActionFormHeader";

import vegetableIconsMaps from "../../../maps/vegetableMaps";
import useCompletion from "../../../hooks/useCompletion";

import areasData from "../../../dumb-data/areasData";

// assets
import { greenhouse, outdoor, indoor } from "../../../assets/assets-path";
import { unknowIcon } from "../../../assets/assets-path";
import areaMaps from "../../../maps/areaEnvironnementsIconsMaps";

import unknownVegetableIcon from "../../../assets/vegetables-icons/unknown-vegetable.png";

const DirectSowingForm = () => {
  const [
    isNameFocus,
    setIsNameFocus,
    nameInput,
    vegetableChoices,
    handleNameClickOnChoice,
    handleNameInputChange,
  ] = useCompletion(vegetableIconsMaps, ["name", "fr"], "data-name");
  const [
    isAreaFocus,
    setIsAreaFocus,
    areaInput,
    areaChoices,
    handleAreaClickOnChoice,
    handleAreaInputChange,
  ] = useCompletion(areasData, "name", "data-area");

  const areaObject = areasData.find((area) => area.name === areaInput);
  const areaIcon = areaObject
    ? areaMaps.filter(
        (area) => area[areaObject.environnement] !== undefined
      )[0]?.[areaObject.environnement]
    : unknowIcon;

  return (
    <div className="flex flex-col gap-5 overflow-y-scroll w-full mt-5">
      <ActionFormHeader icon={directSowingIcon} name="Semer" />
      <form className="flex flex-col gap-5 ">
        <div className="flex flex-col items-center ">
          <label htmlFor="" className="text-lg">
            Choisissez votre plante
          </label>
          <div className="relative">
            <input
              value={nameInput}
              onChange={handleNameInputChange}
              onFocus={() => {
                setIsNameFocus(true);
              }}
              onBlur={() => {
                setIsNameFocus(false);
              }}
              className={`
              border 
              border-zinc-400 
              outline-gray-200 
              px-2 
              w-64 
              h-10 
              pl-9
              ${isNameFocus ? "rounded-t-xl " : "rounded-xl cursor-pointer"}
              `}
            />
            {nameInput.length > 0 && (
              <img
                className="absolute top-2 left-2 w-6"
                src={
                  (
                    vegetableIconsMaps.filter((vegetable) => {
                      return vegetable.name.fr === nameInput.toLowerCase();
                    })[0] || {}
                  ).assets || unknownVegetableIcon
                }
                alt=""
              />
            )}

            <div
              className={`
              choices-list 
              flex 
              flex-col 
              gap-1 
              border
              h-32 
              z-50
              absolute 
              bg-white 
              w-64 
              top-9 
              ${!isNameFocus && "hidden"}
              `}
              onFocus={() => {
                setIsNameFocus(true);
              }}
              onBlur={() => {
                setIsNameFocus(false);
              }}
            >
              <ul className="m-1 overflow-y-scroll">
                {vegetableChoices.map((vegetable, index) => {
                  return (
                    <li
                      key={index}
                      data-name={vegetable.name.fr}
                      className="flex items-center gap-2 cursor-pointer"
                      onMouseDown={handleNameClickOnChoice}
                    >
                      <img className="w-5" src={vegetable.assets} alt="" />
                      <span className="capitalize">{vegetable.name.fr}</span>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center">
          <label htmlFor="">Variété</label>
          <input className="border border-zinc-400 outline-gray-200 px-2 w-64 h-10 rounded-xl" />
        </div>
        <div className="flex flex-col items-center">
          <label htmlFor="" className="text-lg">
            Zone de culture
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
              ${isAreaFocus ? "rounded-t-xl " : "rounded-xl cursor-pointer"}
              `}
            />
            <div
              className={`
              choices-list 
              flex 
              flex-col 
              gap-1 
              border h-32 
               absolute 
              bg-white 
              w-64 
              top-9 
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
                {areaChoices.map((area, index) => {
                  return (
                    <li
                      key={index}
                      data-area={area.name}
                      className="flex items-center gap-2 cursor-pointer"
                      onMouseDown={handleAreaClickOnChoice}
                    >
                      <img
                        className="w-5"
                        src={
                          area.environnement === "greenhouse"
                            ? greenhouse
                            : area.environnement === "indoor"
                            ? indoor
                            : area.environnement === "outdoor"
                            ? outdoor
                            : ""
                        }
                        alt=""
                      />
                      <span>{area.name}</span>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center">
          <label htmlFor="">Date</label>
          <input
            type="date"
            className="border border-zinc-400 outline-gray-200 px-2 w-64 h-10 rounded-xl"
          />
        </div>
        <div className="flex flex-col items-center">
          <label htmlFor="note">Notes</label>
          <textarea
            className=" resize-none border border-zinc-400 outline-gray-200 py-2 px-3 w-64 rounded-xl"
            name="note"
            id=""
            cols={30}
            rows={5}
          ></textarea>
        </div>
        <button className="border px-2 w-32 h-10 mx-auto rounded-xl bg-green-300">
          Valider
        </button>
      </form>
    </div>
  );
};
export default DirectSowingForm;
