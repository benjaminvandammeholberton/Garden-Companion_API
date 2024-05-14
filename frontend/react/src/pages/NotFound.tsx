import "../index.css";
import number4 from "../assets/not-found/number4.png";
import number0 from "../assets/not-found/number0.png";

const NotFound = () => {
  return (
    <div className="h-screen w-screen main-background flex flex-col items-center justify-center gap-8">
      <div className="flex items-center justify-center">
        <img src={number4} alt="" />
        <img src={number0} alt="" />
        <img src={number4} alt="" />
      </div>
      <p className="text-4xl">Page introuvable</p>
      <button className="font-thin px-10 py-5 text-xl bg-black rounded-full text-white">
        Retour
      </button>
    </div>
  );
};

export default NotFound;
