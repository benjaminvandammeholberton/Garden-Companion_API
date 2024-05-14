import { SubmitHandler, useForm } from "react-hook-form";
import { ToDoInterface } from "../interfaces";
import { updateToDoApi } from "../utils/todosApi";

interface ToDoListFormEditProps {
  setToDo: React.Dispatch<React.SetStateAction<ToDoInterface[]>>;
  handleClickEdit: () => void;
  defaultValue: string;
  toDo: ToDoInterface[];
}

interface FormDataInterface {
  title: string;
  priority: string;
}

const ToDoListFormEdit: React.FC<ToDoListFormEditProps> = ({
  setToDo,
  handleClickEdit,
  defaultValue,
  toDo,
}) => {
  const index = toDo.findIndex((todo) => todo.todo_id === defaultValue);
  const TodoToUpdate = toDo[index];

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormDataInterface>({
    defaultValues: {
      title: TodoToUpdate.title,
      priority: TodoToUpdate.priority ? "true" : "false",
    },
  });

  const onSubmit: SubmitHandler<FormDataInterface> = async (data) => {
    const formData = {
      priority: data.priority === "true" ? true : false,
      title: data.title,
      status: false,
    };
    try {
      const updatedTodo = await updateToDoApi(defaultValue, formData);
      setToDo((prev) =>
        prev.map((toDo) =>
          toDo.todo_id === updatedTodo.todo_id ? updatedTodo : toDo
        )
      );
      handleClickEdit();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form
      className="flex flex-col h-[280px] items-center justify-around"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="flex flex-col justify-around gap-5">
        <div className="flex justify-around gap-5">
          <div className="flex flex-col ">
            <label htmlFor="title">Modifiez l'intitulé de la tâche</label>
            <input
              {...register("title", {
                required: "Veuillez remplir ce champs.",
                maxLength: {
                  value: 50,
                  message: "Le champs doit contenir 50 caractères maximum",
                },
                minLength: {
                  value: 5,
                  message: "Le champs doit contenir au moins 5 caractères",
                },
              })}
              placeholder="ex: Planter les oignons"
              className="border border-stone-600 px-2 w-38"
              id="title"
            />
            {errors.title && (
              <span className="text-sm text-red-500">
                {errors.title.message}
              </span>
            )}
          </div>
        </div>

        <div className="flex flex-col items-center">
          <div>Priorité</div>
          <div className="flex gap-10">
            <div className="flex flex-col items-center">
              <label className="font-thin" htmlFor="basic">
                Normale
              </label>
              <input
                {...register("priority", { required: true })}
                type="radio"
                id="basic"
                value="false"
              />
            </div>
            <div className="flex flex-col items-center">
              <label className="font-thin" htmlFor="high">
                Élevée
              </label>
              <input
                {...register("priority", { required: true })}
                type="radio"
                id="basic"
                value="true"
              />
            </div>
          </div>
        </div>
      </div>

      <button
        className="border px-4 w-36 bg-blue-300 py-2 rounded-3xl"
        type="submit"
      >
        Modifier
      </button>
    </form>
  );
};

export default ToDoListFormEdit;
