import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const AppContext = createContext();

const AppContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const backendUrl = process.env.REACT_APP_BACKEND_URL;

  //  Login user
  const loginUser = async (email, password) => {
    const { data } = await axios.post(`${backendUrl}/api/auth/login`, {
      email,
      password,
    });
    setUser(data.user);
    localStorage.setItem("token", data.token);
  };

  //  Register user
  const registerUser = async (name, email, password) => {
    const { data } = await axios.post(`${backendUrl}/api/auth/register`, {
      name,
      email,
      password,
    });
    setUser(data.user);
    localStorage.setItem("token", data.token);
  };

  //  Fetch user from token
  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;
      try {
        const { data } = await axios.get(`${backendUrl}/api/auth/me`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(data.user);
      } catch (err) {
        console.error("Auth error:", err);
        localStorage.removeItem("token");
      }
    };

    fetchUser();
  }, [backendUrl]);

  const value = {
    user,
    setUser,
    loginUser,
    registerUser,
    backendUrl,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export default AppContextProvider;
