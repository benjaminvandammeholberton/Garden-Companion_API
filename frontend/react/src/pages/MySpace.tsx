import { useState } from "react";

import Diary from "../features/diary/Diary";
import TableProduction from "../components/table-production/TableProduction";

const MySpace = () => {
  const [diaryOpen, setDiaryOpen] = useState(true);
  const [tableOpen, setTableOpen] = useState(false);

  const tableDisplay = () => {
    if (!tableOpen) {
      setDiaryOpen(false);
      setTableOpen(true);
    }
  };

  const diaryDisplay = () => {
    if (!diaryOpen) {
      setDiaryOpen(true);
      setTableOpen(false);
    }
  };

  return (
    <div className="w-full lg:w-[900px] lg:h-full rounded-3xl p-5 mx-2 bg-white opacity-85 border flex flex-col gap-4 items-center">
      <h1 className="text-3xl font-thin">Mon potager</h1>
      <div className=" w-full">
        <ul className="flex justify-around p-2 text-lg ">
          <li
            onClick={diaryDisplay}
            className={`cursor-pointer ${
              diaryOpen ? "underline" : ""
            } border w-full h-full text-center`}
          >
            Journal
          </li>
          <li
            onClick={tableDisplay}
            className={`cursor-pointer ${
              tableOpen ? "underline" : ""
            } border w-full h-full text-center`}
          >
            Tableau de production
          </li>
        </ul>
      </div>

      {diaryOpen ? <Diary /> : <TableProduction />}
    </div>
  );
};

export default MySpace;
