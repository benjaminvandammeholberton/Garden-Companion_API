import carrotIcon from "../../assets/vegetables-icons/carrot.png";
import lettuceIcon from "../../assets/vegetables-icons/lettuce.png";
import bokChoiIcon from "../../assets/vegetables-icons/bok-choy.png";
import directSowingIcon from "../../assets/actions-icons/direct-sowing.png";
import plantingIcon from "../../assets/actions-icons/planting.png";
import harvestIcon from "../../assets/navbar/production.png";
import placeHolderImage from "../../assets/placeholder-image.jpeg";
import placeHolderImage2 from "../../assets/placeholder-image-2.jpeg";

const Diary = () => {
  return (
    <div className="w-full flex flex-col gap-5 p-4 items-center">
      <div className="border px-4 py-2 cursor-pointer border-b-4 border-l-3 rounded-3xl">
        Actions
      </div>
      <div className="bg-blue-100 w-full border-2 rounded-3xl flex flex-col gap-4 py-4 ">
        <div className="flex items-center justify-between border-b px-4">
          <span className="cursor-pointer">Serre - Gauche</span>
          <span className="text-sm">Hier</span>
        </div>
        <div className="flex flex-col justify-center items-center gap-2">
          <div className="flex gap-2 lg:gap-5">
            <img
              className="w-6 lg:w-12 h-6 lg:h-12"
              src={directSowingIcon}
              alt=""
            />
            <img className="w-6 lg:w-12 h-6 lg:h-12" src={carrotIcon} alt="" />
          </div>
          <span>
            Semi : <span className="cursor-pointer">Carotte Nantaise </span>
          </span>
        </div>
        <div className="flex justify-around border-t">
          <span>J'aime</span>
          <span>Commenter</span>
        </div>
      </div>

      <div className="bg-blue-100 w-full border-2 rounded-3xl flex flex-col gap-4 ">
        <div className="flex items-center justify-between border-b px-4 py-2">
          <span className="cursor-pointer">Jardin - Devant</span>
          <span className="text-sm">15/03/2024</span>
        </div>
        <div className="flex flex-col justify-center items-center gap-2">
          <div className="flex gap-2 lg:gap-5">
            <img
              className="w-6 lg:w-12 h-6 lg:h-12"
              src={plantingIcon}
              alt=""
            />
            <img className="w-6 lg:w-12 h-6 lg:h-12" src={lettuceIcon} alt="" />
          </div>
          <div className="flex flex-col items-center">
            <span>
              Plantation :{" "}
              <span className="cursor-pointer">
                Laitue Merveille des 4 saisons
              </span>
            </span>
            <span>Quantité: 5 lignes</span>
          </div>
          <img className="w-3/4 rounded-3xl" src={placeHolderImage} alt="" />
        </div>

        <div className="flex justify-around border-t">
          <span>J'aime</span>
          <span>Commenter</span>
        </div>
      </div>

      <div className="bg-blue-100 w-full border-2 rounded-3xl flex flex-col gap-4 ">
        <div className="flex items-center justify-between border-b px-4 py-2">
          <span className="cursor-pointer">Jardin - Devant</span>
          <span className="text-sm">15/03/2024</span>
        </div>
        <div className="flex flex-col justify-center items-center gap-2">
          <div className="flex gap-2 lg:gap-5">
            <img className="w-6 lg:w-12 h-6 lg:h-12" src={harvestIcon} alt="" />
            <img className="w-6 lg:w-12 h-6 lg:h-12" src={bokChoiIcon} alt="" />
          </div>
          <span>
            Récolte :{" "}
            <span className="cursor-pointer">Chou chinois Pak Choï</span>
          </span>
          <span>Quantité: 2 pièces</span>
          <img className="w-3/4 rounded-3xl" src={placeHolderImage2} alt="" />
        </div>
        <div className="flex justify-around border-t">
          <span>J'aime</span>
          <span>Commenter</span>
        </div>
      </div>

      <div className="bg-blue-100 w-full border-2 rounded-3xl ">
        <div className="flex items-center justify-between border-b p-2">
          <span className="">BenJammin</span>
          <span className="text-sm">Hier à 14h30</span>
        </div>
        <div className="text-center">
          <span>Traitement contre les limaces</span>
        </div>

        <div className="flex justify-around border-t">
          <span>J'aime</span>
          <span>Commenter</span>
        </div>
      </div>
      <div className="bg-blue-100 w-full border-2 rounded-3xl ">
        <div className="flex items-center justify-between border-b p-2">
          <span className="">BenJammin</span>
          <span className="text-sm">Hier à 14h30</span>
        </div>
        <div className="text-center">
          <span>A planté des carottes sur la planche 2</span>
        </div>

        <div className="flex justify-around border-t">
          <span>J'aime</span>
          <span>Commenter</span>
        </div>
      </div>
      <div className="bg-blue-100 w-full border-2 rounded-3xl ">
        <div className="flex items-center justify-between border-b p-2">
          <span className="">BenJammin</span>
          <span className="text-sm">Hier à 14h30</span>
        </div>
        <div className="text-center">
          <span>A planté des carottes sur la planche 2</span>
        </div>

        <div className="flex justify-around border-t">
          <span>J'aime</span>
          <span>Commenter</span>
        </div>
      </div>
    </div>
  );
};

export default Diary;
