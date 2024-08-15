import { useState } from "react";

// assets
import directSowingIcon from "../../../assets/actions-icons/direct-sowing.png";

// components
import FormHeader from "./components/FormHeader";
import InputAllVegetables from "./components/InputAllVegetables";
import InputUserAreas from "./components/InputAreas";
import InputDate from "./components/InputDate";
import InputNote from "./components/InputNote";
import InputVariety from "./components/InputVariety";
import SubmitButton from "./components/SubmitButton";
import { createVegetable } from "../../../api/api-services/vegetables";
import InputQuantity from "./components/InputQuantity";

interface DirectSowingFormInterface {
  onClose: () => void;
}

const DirectSowingForm: React.FC<DirectSowingFormInterface> = ({ onClose }) => {
  const [name, setName] = useState<string>("");
  const [variety, setVariety] = useState<string>("");
  const [area, setArea] = useState<string>("");
  const [date, setDate] = useState<string>("");
  const [notes, setNotes] = useState<string>("");
  const [quantity, setQuantity] = useState<string>("0");
  const [quantityUnit, setQuantityUnit] = useState<string>("");
  const [errorArea, setErrorArea] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (area === "") setErrorArea("Zone de culture invalide");
    const new_vegetable = {
      name,
      variety,
      quantity: parseInt(quantity),
      sowed: true,
      planted: false,
      sowing_date: date,
      notes: notes !== "" ? notes : null,
      area: area,
      quantity_unit: quantityUnit.toLowerCase(),
    };
    await createVegetable(new_vegetable);
    // const new_vegetable_response = await createVegetable(new_vegetable);

    // const areasToUpdate: AreaInterface = areas.find(
    //   (area: AreaInterface) => area.area_id === new_vegetable.area
    // );
    // areasToUpdate.vegetables.push(new_vegetable_response);
    // const areasToSet = areas.map((area: AreaInterface) => {
    //   if (area.area_id === new_vegetable_response.area) return areasToUpdate;
    //   return area;
    // });
    // SetAreas(areasToSet);
    onClose();
  };

  return (
    <div className="flex flex-col gap-5 overflow-y-scroll w-full mt-5">
      <FormHeader icon={directSowingIcon} name="Semer" />
      <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
        <InputAllVegetables setInput={setName} />
        <InputVariety setInput={setVariety} />
        <InputQuantity
          setInputQuantity={setQuantity}
          setInputUnit={setQuantityUnit}
        />
        <InputUserAreas
          setInput={setArea}
          inputErrorMessage={errorArea}
          setInputErrorMessage={setErrorArea}
        />
        <InputDate setInput={setDate} />
        <InputNote setInput={setNotes} />
        <SubmitButton />
      </form>
    </div>
  );
};
export default DirectSowingForm;
