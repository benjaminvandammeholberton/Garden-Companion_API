import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

interface User {
  user_id: string;
  username: string;
  email: string;
  first_name?: string;
  last_name?: string;
  disabled?: boolean;
  chat_bot_day_requests: number;
  chat_bot_total_requests: number;
  last_request_datetime?: string;
}

const useAuth = (): [User | null, boolean, boolean] => {
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      const userData = await Auth();
      if (!userData) {
        navigate("/login");
      }
      if (userData) {
        setUser(userData);
        setIsAuthenticated(true);
      }
      setIsLoading(false);
    };
    checkAuth();
  }, [navigate]);

  return [user, isLoading, isAuthenticated];
};

const Auth = async () => {
  const accessToken = localStorage.getItem("JWTGP");
  if (!accessToken) {
    return null;
  }
  try {
    const response = await axios.post(
      "http://127.0.0.1:8000/api/v1/auth/test-token",
      null,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    if (response.status === 200) {
      return response.data; // Assuming user details are returned from the server
    }
  } catch (err) {
    console.log("Can't reach the server:", err);
    return null;
  }
};

export default useAuth;
