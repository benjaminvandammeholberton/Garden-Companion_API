import { useState } from "react";

type UseSortReturnType = [boolean, () => void, string, (type: string) => void];

const useSort = (type: string): UseSortReturnType => {
  const [isSortOpen, setIsSortOpen] = useState<boolean>(false);
  const [sortedBy, setSortedBy] = useState<string>(type);

  const toggleSort = () => {
    setIsSortOpen(!isSortOpen);
  };

  const handleClickSort = (type: string) => {
    setSortedBy(type);
    toggleSort();
  };

  return [isSortOpen, toggleSort, sortedBy, handleClickSort];
};

export default useSort;
