import { useState } from "react";

type useAddReturnType = [boolean, () => void];

const useAdd = (): useAddReturnType => {
  const [addOpen, setAddopen] = useState<boolean>(false);

  const handleClickAdd = () => {
    setAddopen(!addOpen);
  };

  return [addOpen, handleClickAdd];
};

export default useAdd;
