import vegetableIconsMaps from "../../../../maps/vegetableMaps";
import useCompletion from "../../../../hooks/useCompletion";
import unknownVegetableIcon from "../../../../assets/vegetables-icons/unknown-vegetable.png";
import { Dispatch, SetStateAction, useEffect } from "react";

interface InputAllVegetablesInterface {
  setInput: Dispatch<SetStateAction<string>>;
}

const InputAllVegetables: React.FC<InputAllVegetablesInterface> = ({
  setInput,
}) => {
  const [
    isNameFocus,
    setIsNameFocus,
    nameInput,
    vegetableChoices,
    handleNameClickOnChoice,
    handleNameInputChange,
  ] = useCompletion(vegetableIconsMaps, ["name", "fr"], "data-name");

  useEffect(() => {
    setInput(nameInput);
  }, [nameInput, setInput]);
  return (
    <div className="flex flex-col items-center ">
      <label htmlFor="" className="text-lg">
        Choisissez votre plante **
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
          rounded-xl
          ${isNameFocus ? "" : "cursor-pointer"}
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
          rounded-xl
          px-2
          h-44 
          z-50
          absolute 
          bg-white 
          w-64
          top-12 
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
                  <img className="w-6" src={vegetable.assets} alt="" />
                  <span className="capitalize text-lg">
                    {vegetable.name.fr}
                  </span>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default InputAllVegetables;
