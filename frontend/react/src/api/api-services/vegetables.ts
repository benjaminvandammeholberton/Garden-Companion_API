import axiosInstance from "../axios";

interface dataInterface {
  name: string;
  variety: string;
  quantity: number;
  quantity_unit?: string;
  sowed: boolean;
  planted: boolean;
  sowing_date: string;
  planting_date?: string | null;
  harvest_date?: string | null | null;
  harvest_quantity?: number | null;
  harvest_unit?: string | null;
  remove_date?: string | null;
  notes: string | null;
  area: string | null;
}

export const createVegetable = async (data: dataInterface) => {
  try {
    const response = await axiosInstance.post(
      "/api/v1/vegetable_manager/create",
      data
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error("Can't create vegetable");
  }
};

export const getAllVegetables = async () => {
  try {
    const response = await axiosInstance.get("/api/v1/vegetable_manager/");
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error("Can't fetch vegetables from the server");
  }
};
