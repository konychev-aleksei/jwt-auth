import { createContext, useState, useEffect } from "react";
import axios from "axios";
import { CircularProgress } from "@mui/material";
import inMemoryJWT from "../services/inMemoryJWT";
import config from "../config";
import style from "../app.module.scss";
import showErrorMessage from "../utils/showErrorMessage";

const ResourceClient = axios.create({
  baseURL: `${config.API_URL}/resource`,
});

export const AuthClient = axios.create({
  baseURL: `${config.API_URL}/auth`,
  withCredentials: true,
});

ResourceClient.interceptors.request.use(
  (config) => {
    const accessToken = inMemoryJWT.getToken();

    if (!accessToken) {
      return config;
    }

    config.headers["Authorization"] = "Bearer " + accessToken;
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

export const AuthContext = createContext({});

const AuthProvider = ({ children }) => {
  const [isAppReady, setIsAppReady] = useState(false);
  const [isUserLogged, setIsUserLogged] = useState(false);
  const [data, setData] = useState();

  const handleFetchProtected = () => {
    ResourceClient.get("/protected")
      .then((res) => {
        setData(res.data);
      })
      .catch(showErrorMessage);
  };

  const handleLogOut = () => {
    AuthClient.post("/logout")
      .then(() => {
        setIsUserLogged(false);
        inMemoryJWT.deleteToken();

        setData();
      })
      .catch(showErrorMessage);
  };

  const handleSignUp = (data) => {
    AuthClient.post("/sign-up", data)
      .then((res) => {
        const { accessToken, accessTokenExpiration } = res.data;

        console.log(accessToken);
        inMemoryJWT.setToken(accessToken, accessTokenExpiration);

        setIsUserLogged(true);
      })
      .catch(showErrorMessage);
  };

  const handleSignIn = (data) => {
    AuthClient.post("/sign-in", data)
      .then((res) => {
        const { accessToken, accessTokenExpiration } = res.data;
        inMemoryJWT.setToken(accessToken, accessTokenExpiration);

        setIsUserLogged(true);
      })
      .catch(showErrorMessage);
  };

  useEffect(() => {
    AuthClient.post("/refresh")
      .then((res) => {
        const { accessToken, accessTokenExpiration } = res.data;
        inMemoryJWT.setToken(accessToken, accessTokenExpiration);

        setIsAppReady(true);
        setIsUserLogged(true);
      })
      .catch(() => {
        setIsAppReady(true);
      });
  }, []);

  return (
    <AuthContext.Provider
      value={{
        data,
        handleFetchProtected,
        handleSignUp,
        handleSignIn,
        handleLogOut,
        isUserLogged,
      }}
    >
      {isAppReady ? (
        children
      ) : (
        <div className={style.center}>
          <CircularProgress />
        </div>
      )}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
