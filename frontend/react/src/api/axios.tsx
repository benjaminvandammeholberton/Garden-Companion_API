import axios from "axios";

const getToken = () => {
  return localStorage.getItem("JWTGP");
};

const axiosInstance = axios.create({
  baseURL: "http://192.168.1.192:8001",
  headers: {
    common: {
      Authorization: `Bearer ${getToken()}`,
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  },
});

export const updateTokenInAxiosHeaders = (token: string) => {
  axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
};

export default axiosInstance;
