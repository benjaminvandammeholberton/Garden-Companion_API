import { Dispatch, SetStateAction } from "react";

interface InputVarietyInterface {
  setInput: Dispatch<SetStateAction<string>>;
}

const InputVariety: React.FC<InputVarietyInterface> = ({ setInput }) => {
  const setVariety = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };
  return (
    <div className="flex flex-col items-center">
      <label htmlFor="">Variété ou nom distinctif **</label>
      <input
        onChange={setVariety}
        className="border border-zinc-400 outline-gray-200 px-2 w-64 h-10 rounded-xl"
      />
    </div>
  );
};

export default InputVariety;
