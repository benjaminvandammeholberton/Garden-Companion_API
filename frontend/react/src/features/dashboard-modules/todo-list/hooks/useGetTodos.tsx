import { useEffect, useState } from "react";
import useAuth from "../../../../hooks/useAuth";
import { ToDoInterface } from "../interfaces";
import { getTodosApi } from "../utils/todosApi";

type useGetTodosReturnType = [
  ToDoInterface[],
  React.Dispatch<React.SetStateAction<ToDoInterface[]>>,
  boolean,
  string | null
];

const useGetTodos = (): useGetTodosReturnType => {
  const [user] = useAuth();
  const [isLoading, SetIsLoading] = useState(false);
  const [error, SetError] = useState<string | null>(null);
  const [todos, setTodos] = useState<ToDoInterface[]>([]);

  useEffect(() => {
    const fetchAreas = async () => {
      SetIsLoading(true);
      try {
        const todos: ToDoInterface[] = await getTodosApi();
        const sortedTodos = todos.sort((a, b) =>
          a.title.localeCompare(b.title)
        );
        setTodos(sortedTodos);
      } catch (error) {
        SetError(error as string);
        console.error(error);
      } finally {
        SetIsLoading(false);
      }
    };
    if (user) {
      fetchAreas();
    }
  }, [user]);

  return [todos, setTodos, isLoading, error];
};

export default useGetTodos;
