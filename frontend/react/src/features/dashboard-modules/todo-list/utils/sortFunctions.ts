import { ToDoInterface } from "../interfaces";

export const sortByDateAscending = (toDo: ToDoInterface[]) => {
  const toDoSorted: ToDoInterface[] = [...toDo].sort((a, b) => {
    return new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
  });
  return toDoSorted;
};
export const sortByDateDescending = (toDo: ToDoInterface[]) => {
  const toDoSorted: ToDoInterface[] = [...toDo].sort((a, b) => {
    return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
  });
  return toDoSorted;
};
export const sortByNameAscending = (toDo: ToDoInterface[]) => {
  const toDoSorted: ToDoInterface[] = [...toDo].sort((a, b) => {
    return a.title.localeCompare(b.title);
  });
  return toDoSorted;
};
export const sortByNameDescending = (toDo: ToDoInterface[]) => {
  const toDoSorted: ToDoInterface[] = [...toDo].sort((a, b) => {
    return b.title.localeCompare(a.title);
  });
  return toDoSorted;
};
export const sortByStatusAscending = (toDo: ToDoInterface[]) => {
  const toDoSorted: ToDoInterface[] = [...toDo].sort((a, b) => {
    if (a.status === b.status) return 0;
    return a.status ? 1 : -1;
  });
  return toDoSorted;
};
export const sortByStatusDescending = (toDo: ToDoInterface[]) => {
  const toDoSorted: ToDoInterface[] = [...toDo].sort((a, b) => {
    if (a.status === b.status) return 0;
    return a.status ? -1 : 1;
  });
  return toDoSorted;
};
export const sortByPriorityAscending = (toDo: ToDoInterface[]) => {
  const toDoSorted: ToDoInterface[] = [...toDo].sort((a, b) => {
    if (a.priority === b.priority) return 0;
    return a.priority ? -1 : 1;
  });
  return toDoSorted;
};
export const sortByPriorityDescending = (toDo: ToDoInterface[]) => {
  const toDoSorted: ToDoInterface[] = [...toDo].sort((a, b) => {
    if (a.priority === b.priority) return 0;
    return a.priority ? 1 : -1;
  });
  return toDoSorted;
};
