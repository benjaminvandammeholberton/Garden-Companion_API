import axiosInstance from "../axios";

const testToken = async () => {
  const accessToken = localStorage.getItem("JWTGP");
  if (!accessToken) {
    return "unknownUser";
  }
  try {
    const response = await axiosInstance.post("/api/v1/auth/test-token");
    if (response.status === 200) {
      return response.data;
    }
  } catch (err) {
    throw new Error("Error when testing the token");
  }
};

export default testToken;
