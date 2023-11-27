import { AuthClient } from "../context/AuthContext";

const inMemoryJWTService = () => {
  let inMemoryJWT = null;
  let refreshTimeoutId;
  const storageKey = "logout";

  window.addEventListener("storage", (event) => {
    if (event.key === storageKey) {
      inMemoryJWT = null;
    }
  });

  const refreshToken = (expiration) => {
    const timeoutTrigger = expiration - 10000;

    refreshTimeoutId = setTimeout(() => {
      AuthClient("/refresh")
        .then((res) => {
          const { accessToken, accessTokenExpiration } = res.data;
          setToken(accessToken, accessTokenExpiration);
        })
        .catch(console.error);
    }, timeoutTrigger);
  };

  const abortRefreshToken = () => {
    if (refreshTimeoutId) {
      clearTimeout(refreshTimeoutId);
    }
  };

  const getToken = () => inMemoryJWT;

  const setToken = (token, tokenExpiration) => {
    inMemoryJWT = token;
    refreshToken(tokenExpiration);
  };

  const deleteToken = () => {
    inMemoryJWT = null;
    abortRefreshToken();
    localStorage.setItem(storageKey, Date.now());
  };

  return {
    getToken,
    setToken,
    deleteToken,
  };
};

export default inMemoryJWTService();
