import { Dispatch, SetStateAction, useEffect, useState } from "react";

interface InputDateInterface {
  setInput: Dispatch<SetStateAction<string>>;
}

const InputDate: React.FC<InputDateInterface> = ({ setInput }) => {
  const today = formatDate(new Date());
  const [defaultDate, setDefaultDate] = useState(today);

  useEffect(() => {
    if (defaultDate === today) setInput(today);
  });

  const setDate = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDefaultDate(e.target.value);
    setInput(e.target.value);
  };

  return (
    <div className="flex flex-col items-center">
      <label htmlFor="">Date du semis</label>
      <input
        type="date"
        className="border border-zinc-400 outline-gray-200 px-2 w-64 h-10 rounded-xl"
        onChange={setDate}
        value={defaultDate}
      />
    </div>
  );
};

function formatDate(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export default InputDate;
