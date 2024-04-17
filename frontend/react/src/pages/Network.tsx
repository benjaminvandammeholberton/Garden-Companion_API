import carrotIcon from "../assets/vegetables-icons/carrot.png";

const Network = () => {
  return (
    <div className="lg:w-[900px] lg:h-full rounded-3xl p-5 bg-white opacity-85 border flex flex-col items-center">
      <h1 className="text-2xl font-thin">Journal</h1>
      <div className="w-full flex flex-col gap-5 p-4">
        <div className="bg-blue-100 w-full border-2 rounded-3xl flex flex-col gap-4 ">
          <div className="flex items-center justify-between border-b p-2">
            <span className="">BenJammin</span>
            <span className="text-sm">Hier</span>
          </div>
          <div className="flex flex-col justify-center items-center gap-2">
            <img className="w-8 h-8" src={carrotIcon} alt="" />
            <span>
              <span className="cursor-pointer">Planche 2</span> - Semis de{" "}
              <span className="cursor-pointer">carottes</span>
            </span>
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
    </div>
  );
};

export default Network;
