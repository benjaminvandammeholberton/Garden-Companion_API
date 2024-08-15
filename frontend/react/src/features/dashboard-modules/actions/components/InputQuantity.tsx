import { Dispatch, SetStateAction } from "react";

interface InputQuantityInterface {
  setInputQuantity: Dispatch<SetStateAction<string>>;
  setInputUnit: Dispatch<SetStateAction<string>>;
}

const InputQuantity: React.FC<InputQuantityInterface> = ({
  setInputQuantity,
  setInputUnit,
}) => {
  const handleChangeUnit = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputUnit(e.target.value);
  };
  const handleChangeQuantity = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputQuantity(e.target.value);
  };

  return (
    <div className="flex items-center justify-center gap-10">
      <div className="flex flex-col items-center">
        <label htmlFor="">Quantité</label>

        <input
          className="border border-zinc-400 outline-gray-200 px-2 w-16 h-10 rounded-xl"
          type="number"
          onChange={handleChangeQuantity}
        />
      </div>
      <div className="flex flex-col items-center">
        <label htmlFor="">Unité</label>
        <input
          className="border border-zinc-400 outline-gray-200 px-2 w-36 h-10 rounded-xl"
          type="text"
          placeholder="lignes, rangées, ..."
          onChange={handleChangeUnit}
        />
      </div>
    </div>
  );
};
export default InputQuantity;
