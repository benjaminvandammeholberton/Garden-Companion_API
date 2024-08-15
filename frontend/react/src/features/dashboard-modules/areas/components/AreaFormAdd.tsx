// assets
import { greenhouse, outdoor, indoor } from "../../../../assets/assets-path";

// hooks
import { useState } from "react";
import useAddArea from "../../../../hooks/useAddArea";
import capitalize from "../../../../utils/capitalizeStr";

interface AreaFormAddProps {
  handleClickAdd: () => void;
}

interface FormDataInterface {
  name: string;
  environnement: string;
  surface: number;
}

const AreaFormAdd: React.FC<AreaFormAddProps> = ({ handleClickAdd }) => {
  const [formData, setFormData] = useState<FormDataInterface>({
    name: "",
    environnement: "",
    surface: 0,
  });
  const [addData, isLoading] = useAddArea();

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const submitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newArea = {
      name: capitalize(formData.name),
      surface: formData.surface,
      environnement: formData.environnement,
      sowing_area: false,
    };
    await addData(newArea);
    setFormData({
      name: "",
      environnement: "",
      surface: 0,
    });
    handleClickAdd();
  };

  return (
    <form
      className="flex flex-col h-[280px] items-center justify-around"
      onSubmit={submitForm}
    >
      {isLoading && <p>Chargement</p>}
      <div className="flex flex-col justify-around gap-5">
        <div className="flex justify-around gap-5">
          <div className="flex flex-col ">
            <label htmlFor="name">Nom</label>
            <input
              autoComplete="off"
              required
              className="border border-stone-600 px-2 w-38"
              id="name"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleNameChange}
            />
          </div>
          <div className="flex flex-col items-center">
            <label htmlFor="surface">Surface</label>
            <div className="flex items-end gap-1">
              <input
                className="border border-stone-600 px-2 w-16"
                id="surface"
                type="number"
                name="surface"
                value={formData.surface}
                onChange={handleNameChange}
              />
              <span className="leading-none">
                m<sup>2</sup>
              </span>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center">
          <div>Environnement</div>
          <div className="flex gap-10">
            <div className="flex flex-col items-center">
              <img className="w-7" src={outdoor} alt="" />
              <label className="font-thin" htmlFor="type1">
                Extérieur
              </label>
              <input
                type="radio"
                name="environnement"
                id="type1"
                value="outdoor"
                onChange={handleNameChange}
                required
              />
            </div>
            <div className="flex flex-col items-center">
              <img className="w-7" src={greenhouse} alt="" />
              <label className="font-thin" htmlFor="type2">
                Serre
              </label>
              <input
                type="radio"
                name="environnement"
                id="type2"
                required
                value="greenhouse"
                onChange={handleNameChange}
              />
            </div>
            <div className="flex flex-col items-center">
              <img className="w-7" src={indoor} alt="" />
              <label className="font-thin" htmlFor="type3">
                Intérieur
              </label>
              <input
                type="radio"
                name="environnement"
                id="type3"
                required
                onChange={handleNameChange}
                value="indoor"
              />
            </div>
          </div>
        </div>
      </div>
      <button
        className="border px-4 w-36 bg-green-300 py-2 rounded-3xl"
        type="submit"
      >
        Créer
      </button>
    </form>
  );
};

export default AreaFormAdd;
