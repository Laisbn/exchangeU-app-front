import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { api } from "../service/api";

const AuthContext = createContext({});

const AuthProvider = ({ children }) => {
  const [data, setData] = useState({});

  useEffect(() => {
    async function loadStoredData() {
      const [token, user] = await AsyncStorage.multiGet([
        "@ExchangeU:token",
        "@ExchangeU:user",
      ]);

      if (token[1] && user[1]) {
        api.defaults.headers.authorization = `Bearer ${token[1]}`;

        setData({
          token: token[1],
          user: JSON.parse(user[1]),
        });
      }
    }

    loadStoredData();
  }, []);

  const signIn = useCallback(async ({ email, password }) => {
    const response = await api.post("/auth/login", {
      login: email,
      password,
    });

    const { token, user } = response.data;

    await AsyncStorage.multiSet([
      ["@ExchangeU:token", token],
      ["@ExchangeU:user", JSON.stringify(user)],
    ]);

    api.defaults.headers.authorization = `Bearer ${token}`;

    setData({
      token,
      user,
    });
  }, []);

  const signOut = useCallback(async () => {
    await AsyncStorage.multiRemove(["@ExchangeU:token", "@ExchangeU:user"]);

    setData({});
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user: data.user,
        signIn,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
}

export { AuthProvider, useAuth };
