import addIcon from "../../assets/dashboard-modules/seedlings/add.png";
import sortIcon from "../../assets/dashboard-modules/seedlings/sort.png";
import infoIcon from "../../assets/dashboard-modules/seedlings/info.png";
import priorityIcon from "../../assets/dashboard-modules/to-do-list/priority.png";
import deleteIcon from "../../assets/dashboard-modules/to-do-list/delete.png";

const ToDoList = () => {
  return (
    <div className=" relative w-full h-full overflow-hidden pb-3">
      <div className="absolute top-2 right-2 cursor-pointer">
        <img className="w-10 h-10" src={addIcon} alt="" />
      </div>
      <div className="absolute top-2 left-2 cursor-pointer">
        <img className="w-10 h-10" src={sortIcon} alt="" />
      </div>
      <div className="flex justify-center items-center gap-2">
        <h1 className="py-3 text-2xl font-thin text-center">Liste de tâches</h1>
        <img className="w-4 h-4 cursor-pointer" src={infoIcon} alt="" />
      </div>
      <ul className="flex flex-col gap-2 text-xl font-thin overflow-y-scroll h-5/6 p-2">
        <li className="flex gap-2 w-full justify-between items-center ">
          <div className="cursor-pointer flex gap-3 items-center">
            <div className="flex items-center gap-2">
              <input type="checkbox" />
              <img className="w-4 h-4" src={deleteIcon} alt="" />
            </div>
            <span className="text-base leading-none">
              Planter les échallotes
            </span>
          </div>
          <img className="w-4 h-4" src={priorityIcon} alt="" />
        </li>
        <li className="flex gap-2 w-full justify-between items-center ">
          <div className="cursor-pointer flex gap-3 items-center">
            <div className="flex items-center gap-2">
              <input type="checkbox" />
              <img className="w-4 h-4" src={deleteIcon} alt="" />
            </div>
            <span className="text-base leading-none">
              Récupérer du compost à la déchetterie
            </span>
          </div>
          <img className="w-4 h-4" src={priorityIcon} alt="" />
        </li>
        <li className="flex gap-2 w-full justify-between items-center ">
          <div className="cursor-pointer flex gap-3 items-center">
            <div className="flex items-center gap-2">
              <input type="checkbox" />
              <img className="w-4 h-4" src={deleteIcon} alt="" />
            </div>
            <span className="text-base leading-none">
              Fertiliser les poivrons
            </span>
          </div>
        </li>
        <li className="flex gap-2 w-full justify-between items-center ">
          <div className="cursor-pointer flex gap-3 items-center">
            <div className="flex items-center gap-2">
              <input type="checkbox" />
              <img className="w-4 h-4" src={deleteIcon} alt="" />
            </div>
            <span className="text-base leading-none">Semer les carottes</span>
          </div>
        </li>
        <li className="flex gap-2 w-full justify-between items-center ">
          <div className="cursor-pointer flex gap-3 items-center">
            <div className="flex items-center gap-2">
              <input type="checkbox" />
              <img className="w-4 h-4" src={deleteIcon} alt="" />
            </div>
            <span className="text-base leading-none">
              Planter les échallotes
            </span>
          </div>
        </li>
        <li className="flex gap-2 w-full justify-between items-center ">
          <div className="cursor-pointer flex gap-3 items-center">
            <div className="flex items-center gap-2">
              <input type="checkbox" />
              <img className="w-4 h-4" src={deleteIcon} alt="" />
            </div>
            <span className="text-base leading-none">
              Planter les échallotes
            </span>
          </div>
        </li>
      </ul>
    </div>
  );
};
export default ToDoList;
