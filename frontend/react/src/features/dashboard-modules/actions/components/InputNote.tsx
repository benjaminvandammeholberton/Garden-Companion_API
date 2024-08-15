import { Dispatch, SetStateAction } from "react";

interface InputNoteInterface {
  setInput: Dispatch<SetStateAction<string>>;
}

const InputNote: React.FC<InputNoteInterface> = ({ setInput }) => {
  const setNote = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
  };
  return (
    <div className="flex flex-col items-center">
      <label htmlFor="note">Notes</label>
      <textarea
        className=" resize-none border border-zinc-400 outline-gray-200 py-2 px-3 w-64 rounded-xl"
        name="note"
        id=""
        cols={30}
        rows={5}
        onChange={setNote}
      ></textarea>
    </div>
  );
};

export default InputNote;
