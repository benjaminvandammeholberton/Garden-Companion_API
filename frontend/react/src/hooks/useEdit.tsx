import { useState } from "react";

type useEditReturnType = [boolean, () => void, string];

const useEdit = (): useEditReturnType => {
  const [editOpen, setEditopen] = useState<boolean>(false);
  const [defaultValue, SetDefaultValue] = useState<string>("");

  const handleClickEdit = (id: string = "") => {
    SetDefaultValue(id);
    setEditopen(!editOpen);
  };

  return [editOpen, handleClickEdit, defaultValue];
};

export default useEdit;
