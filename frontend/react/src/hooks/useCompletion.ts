import { useEffect, useState } from "react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type DataRecord = Record<string, any>;

const useCompletion = (
  data: DataRecord[],
  completeBy: string | string[],
  attribute: string
): [
  boolean,
  React.Dispatch<React.SetStateAction<boolean>>,
  string,
  DataRecord[],
  (e: React.MouseEvent<HTMLLIElement, MouseEvent>) => void,
  (e: React.ChangeEvent<HTMLInputElement>) => void
] => {
  // sort the received data by name
  const dataSorted = data.sort((a, b) =>
    getValue(a, completeBy).localeCompare(getValue(b, completeBy))
  );

  const [isFocus, setIsFocus] = useState<boolean>(false);
  const [input, setInput] = useState<string>("");
  const [choicesFiltered, setChoicesFiltered] =
    useState<DataRecord[]>(dataSorted);

  useEffect(() => {
    setChoicesFiltered(dataSorted);
  }, [dataSorted]);

  const handleClickOnChoice = (
    e: React.MouseEvent<HTMLLIElement, MouseEvent>
  ) => {
    const name = e.currentTarget.getAttribute(attribute);
    if (name) {
      const nameCapitalize = name?.charAt(0).toUpperCase() + name?.slice(1);
      setInput(nameCapitalize);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
    const dataFiltered = data.filter((item) =>
      getValue(item, completeBy)
        .toLocaleLowerCase()
        .startsWith(e.target.value.toLocaleLowerCase())
    );
    setChoicesFiltered(dataFiltered);
  };
  return [
    isFocus,
    setIsFocus,
    input,
    choicesFiltered,
    handleClickOnChoice,
    handleInputChange,
  ];
};

// Function to access nested keys
const getValue = (
  obj: DataRecord,
  path: string | string[]
): string | DataRecord => {
  if (Array.isArray(path)) {
    let value = obj;
    for (const key of path) {
      value = value[key] || "";
    }
    return value;
  }
  return obj[path] || "";
};

export default useCompletion;
