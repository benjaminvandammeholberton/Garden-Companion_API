import axiosInstance from "../axios";

export const getAllAreas = async () => {
  try {
    const response = await axiosInstance.get("/api/v1/area/");
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error("Can't fetch areas from the server");
  }
};

interface dataInterface {
  name: string;
  surface: number;
  sowing_area: boolean;
}

export const createAreaApi = async (data: dataInterface) => {
  try {
    const response = await axiosInstance.post("/api/v1/area/create", data);
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error("An error occured when creating the area");
  }
};
