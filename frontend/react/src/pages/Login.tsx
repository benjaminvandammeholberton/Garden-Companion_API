import { useState } from "react";
import { useNavigate } from "react-router-dom";

import axios from "axios";

interface LoginForm {
  email: string;
  password: string;
}

const Login = () => {
  const navigate = useNavigate();
  const [loginForm, setLoginForm] = useState<LoginForm>({
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginForm((prevState) => ({ ...prevState, [name]: value }));
  };

  const submitLoginForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/v1/auth/login",
        `grant_type=&username=${encodeURIComponent(
          loginForm.email
        )}&password=${encodeURIComponent(loginForm.password)}`,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );
      setIsLoading(false);
      const token = response.data.access_token;
      if (response.status === 200 && token) {
        localStorage.setItem("JWTGP", token);
        navigate("/dashboard");
      }
    } catch (err) {
      setIsLoading(false);
      console.error("Login failed", err);
    }
  };

  return (
    <div className="h-screen w-screen flex flex-col gap-5 items-center justify-center">
      <h1 className="text-3xl">Login</h1>
      {isLoading && <span>Chargement</span>}
      <form onSubmit={submitLoginForm}>
        <div className="flex gap-3">
          <label htmlFor="email">Email</label>
          <input
            className="border"
            type="email"
            id="name"
            name="email"
            value={loginForm.email}
            onChange={handleInput}
          />
        </div>
        <div className="flex gap-3">
          <label htmlFor="password">Password</label>
          <input
            className="border"
            name="password"
            type="password"
            id="password"
            value={loginForm.password}
            onChange={handleInput}
          />
        </div>
        <button className="border p-3 rounded-3xl" type="submit">
          Se connecter
        </button>
      </form>
    </div>
  );
};

export default Login;
