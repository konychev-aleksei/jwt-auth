import { createContext, useState, useEffect } from "react";
import axios from "axios";
import inMemoryJWT from "../services/inMemoryJWT";
import config from "../config";
import style from "../app.module.scss";
import showErrorMessage from "../utils/showErrorMessage";

export const AuthContext = createContext({});

const AuthProvider = ({ children }) => {
  const [data, setData] = useState();

  const handleFetchProtected = () => {};

  const handleLogOut = () => {};

  const handleSignUp = (data) => {};

  const handleSignIn = (data) => {};

  return (
    <AuthContext.Provider
      value={{
        data,
        handleFetchProtected,
        handleSignUp,
        handleSignIn,
        handleLogOut,
      }}
    >
      {isAppReady ? (
        children
      ) : (
        <div className={style.centered}>
          <CircularProgress />
        </div>
      )}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
