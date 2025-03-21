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
      const res = await axios.post(
        `${API_URL}/user/refresh_token`,
        {}, // empty body if none is needed
        { withCredentials: true }
      );
      console.log("Token Response:", res.data); // ✅ Log API response
      setToken(res.data.accessToken);
    } catch (error) {
      console.error("Error refreshing token:", error.response?.data || error);
      setToken(false); // Ensure app doesn't break on failure
    }
  };

  useEffect(() => {
    const firstLogin = localStorage.getItem("firstLogin");
    console.log("First Login Check:", firstLogin); // ✅ Debugging log
    if (firstLogin) {
      refreshToken();
    }
  }, []); // ✅ No unnecessary dependencies

  const state = {
    token: [token, setToken],
    productsAPI: ProductAPI(token), // ✅ Calls API inside the provider
    userAPI: UserAPI(token), // ✅ Calls API inside the provider
  };

  return <GlobalState.Provider value={state}>{children}</GlobalState.Provider>;
};
