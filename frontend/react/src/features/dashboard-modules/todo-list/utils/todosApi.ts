import axiosInstance from "../../../../api/axios";

export const getTodosApi = async () => {
  try {
    const response = await axiosInstance.get("/api/v1/todo/");
    return response.data;
  } catch (error) {
    throw new Error("can't fetch todos");
  }
};

export interface CreateToDoInterface {
  priority: boolean;
  status: boolean;
  title: string;
}

export const createToDoApi = async (data: CreateToDoInterface) => {
  try {
    const response = await axiosInstance.post("/api/v1/todo/create/", data);
    return response.data;
  } catch (error) {
    throw new Error("Can't create todo");
  }
};

export interface UpdateToDoInterface {
  priority?: boolean;
  status?: boolean;
  title?: string;
}

export const updateToDoApi = async (id: string, data: UpdateToDoInterface) => {
  try {
    const response = await axiosInstance.put(`/api/v1/todo/${id}`, data);
    return response.data;
  } catch (error) {
    throw new Error("Can't update todo");
  }
};

export const deleteToDoApi = async (id: string) => {
  try {
    await axiosInstance.delete(`/api/v1/todo/${id}`);
  } catch (error) {
    throw new Error("Can't delete todo");
  }
};
