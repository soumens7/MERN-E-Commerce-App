import React, { createContext, useEffect, useState } from "react";
import ProductAPI from "./API/ProductAPI";
import axios from "axios";
import UserAPI from "./API/UserAPI";

export const GlobalState = createContext();

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:4000";

export const DataProvider = ({ children }) => {
  const [token, setToken] = useState(false);

  const refreshToken = async () => {
    try {
      const res = await axios.get(
        // sends to backend server to check for credentials
        `${API_URL}/user/refresh_token`,
        {},
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (res.data.accessToken) {
        setToken(res.data.accessToken);
      } else {
        // Clear invalid login state if no token returned
        localStorage.removeItem("firstLogin");
        setToken(false);
      }
    } catch (error) {
      console.error("Error refreshing token:", error.response?.data || error);
      // Clear invalid login state on error
      localStorage.removeItem("firstLogin");
      setToken(false);
    }
  };

  useEffect(() => {
    const firstLogin = localStorage.getItem("firstLogin");
    if (firstLogin) {
      if (!token) refreshToken();
    }
  }, []); // ✅ Remove token from dependency to prevent infinite loop

  const state = {
    token: [token, setToken],
    productsAPI: ProductAPI(token),
    userAPI: UserAPI(token),
  };

  return <GlobalState.Provider value={state}>{children}</GlobalState.Provider>;
};
