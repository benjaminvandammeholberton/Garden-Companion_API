import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import testToken from "../api/api-services/auth";

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
      try {
        const userData = await testToken();
        if (userData === "unknownUser") {
          navigate("/");
        } else if (userData) {
          setUser(userData);
          setIsAuthenticated(true);
        }
      } catch (error) {
        console.error(error);
        navigate("/login");
      } finally {
        setIsLoading(false);
      }
    };
    checkAuth();
  }, [navigate]);

  return [user, isLoading, isAuthenticated];
};

export default useAuth;
