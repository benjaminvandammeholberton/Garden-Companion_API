import axiosInstance from "../../../api/axios";

export const getForecast = async () => {
  try {
    const response = await axiosInstance.get("/api/v1/forecast/");
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error("Can't fetch forecast from the server");
  }
};
