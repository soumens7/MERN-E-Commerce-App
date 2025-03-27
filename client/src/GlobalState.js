import React, { createContext, useEffect, useState } from "react";
import ProductAPI from "./API/ProductAPI";
import axios from "axios";
import UserAPI from "./API/UserAPI";

export const GlobalState = createContext();

//const API_URL = process.env.REACT_APP_API_URL || "http://localhost:4000";
axios.defaults.withCredentials = true;
axios.defaults.baseURL =
  process.env.REACT_APP_API_URL || "http://localhost:4000";

export const DataProvider = ({ children }) => {
  const [token, setToken] = useState(false);

  const refreshToken = async () => {
    try {
      console.log("Attempting to refresh token...");

      const res = await axios.post(
        "/user/refresh_token",
        {},
        {
          headers: {
            "Content-Type": "application/json",
          },
          // withCredentials is now set by defaults
        }
      );

      console.log("Refresh token response:", res.data);
      if (res.data.accessToken) {
        setToken(res.data.accessToken);
      } else {
        localStorage.removeItem("firstLogin");
        setToken(false);
      }
    } catch (error) {
      console.error("Refresh token error:", {
        message: error.message,
        response: error.response?.data,
        config: error.config,
      });
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
