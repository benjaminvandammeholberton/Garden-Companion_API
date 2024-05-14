// assets
import addIcon from "../../../../assets/common/add.png";
import backIcon from "../../../../assets/common/back.png";
import sortIcon from "../../../../assets/common/sort.png";

// components
import ToDoListFormAdd from "./ToDoListFormAdd";
import ToDoListList from "./ToDoListList";
import ToDoListFormEdit from "./ToDoListFormEdit";

// hooks
import useAdd from "../../../../hooks/useAdd";
import useEdit from "../../../../hooks/useEdit";
import useGetTodos from "../hooks/useGetTodos";
import useSort from "../../../../hooks/useSort";

const ToDoListModule = () => {
  const [isSortOpen, toggleSort, sortedBy, handleClickSort] =
    useSort("priority ascending");
  const [addOpen, handleClickAdd] = useAdd();
  const [editOpen, handleClickEdit, defaultValue] = useEdit();
  const [toDo, setToDo] = useGetTodos();

  const toggleAddEdit = () => {
    if (!editOpen) {
      handleClickAdd();
    } else {
      handleClickEdit();
    }
  };

  const sortChoices = [
    ["priorité (élevée en tête)", "priority ascending"],
    ["priorité (normale en tête)", "priority descending"],
    ["complétée (non en tête)", "status ascending"],
    ["complétée (oui en tête)", "status descending"],
    ["date de creation (récent en tête)", "date descending"],
    ["date de creation (ancien en tête)", "date ascending"],
    ["nom (a - z)", "name ascending"],
    ["nom (z - a)", "name descending"],
  ];

  return (
    <div>
      <div
        onClick={toggleAddEdit}
        className={`absolute top-2 ${
          addOpen || editOpen ? "right-4" : "right-2"
        } cursor-pointer`}
      >
        <img
          className={addOpen || editOpen ? "w-8 h-8" : "w-10 h-10"}
          src={addOpen || editOpen ? backIcon : addIcon}
          alt=""
        />
      </div>
      <div
        className={`absolute top-2 left-2 cursor-pointer ${
          addOpen || editOpen ? "hidden" : "visible"
        }`}
        onClick={toggleSort}
      >
        <img className="w-10 h-10" src={sortIcon} alt="" />
      </div>
      <div
        className={`ml-3 ${
          isSortOpen && !addOpen && !editOpen ? "visible" : "hidden"
        }`}
      >
        Trier par :
        <ul className="ml-5">
          {sortChoices.map((choice, index) => {
            return (
              <li
                key={index}
                className="cursor-pointer hover:underline"
                onClick={() => {
                  handleClickSort(choice[1]);
                }}
              >
                - {choice[0]}
              </li>
            );
          })}
        </ul>
      </div>
      {addOpen && <ToDoListFormAdd {...{ setToDo, handleClickAdd }} />}
      {editOpen && (
        <ToDoListFormEdit
          {...{ setToDo, handleClickEdit, defaultValue, toDo }}
        />
      )}
      {!addOpen && !editOpen && (
        <ToDoListList {...{ sortedBy, toDo, setToDo, handleClickEdit }} />
      )}
    </div>
  );
};
export default ToDoListModule;
