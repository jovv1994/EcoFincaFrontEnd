import React, { createContext, useContext, useEffect, useState } from "react";
import cookie from "js-cookie";
import translateMessage from "../constants/messages";
import User from "@/api/user";
import PropTypes from "prop-types";

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const auth = useAuthProvider();
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
}

AuthProvider.propTypes = {
  children: PropTypes.shape(),
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

function useAuthProvider() {
  const [user, setUser] = useState(null);

  const handleUser = (user) => {
    if (user) {
      // si tengo sesión activa
      setUser(user);
      cookie.set("auth", true, {
        expires: 1, // dia
      });

      return user;
    } else {
      // no tengo sesión activa
      setUser(false);
      cookie.remove("auth");
      return false;
    }
  };

  async function register(data) {
    try {
      const response = await User.register(data);
      console.log("response", response);
      handleUser(response.data);

      let idToken = response.data.token;
      console.log("Token: ", idToken);
      localStorage.setItem("id_token", idToken);

      return response;
    } catch (error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        alert(error.response.data.message);
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
        return Promise.reject(error.response);
        // return error.response;
      } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
        console.log(error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log("Error", error.message);
      }
      console.log(error.config);
    }
  }

  async function login(data) {
    try {
      const response = await User.login(data);
      handleUser(response.data.user);
      let idToken = response.data.token;
      console.log("Token: ", idToken);
      localStorage.setItem("id_token", idToken);
      return response;
    } catch (error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        alert(translateMessage(error.response.data.message));
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
        return error.response;
      } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
        console.log(error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log("Error", error.message);
      }
      console.log(error.config);
    }
  }

  async function logout() {
    try {
      const response = await User.logout();
      handleUser(false);
      return response;
    } catch (error) {
      console.log("error", error);
    }
  }

  const sendPasswordResetEmail = async (email) => {
    await User.sendPasswordResetEmail({ email });
  };

  const confirmPasswordReset = async (id, password) => {
    await User.confirmPasswordReset({
      id,
      password,
    });
  };

  async function getAuthenticatedUser() {
    try {
      const response = await User.getAuthenticatedUser();
      console.log("response user", response);
      handleUser(response.data);
      return response;
    } catch (error) {
      handleUser(false);
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
        return error.response;
      } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
        console.log(error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log("Error", error.message);
      }
      console.log(error.config);
    }
  }

  useEffect(() => {
    try {
      getAuthenticatedUser();
    } catch (error) {
      console.log("NO USER");
    }
  }, []); //eslint-disable-line react-hooks/exhaustive-deps

  return {
    user,
    register,
    login,
    logout,
    sendPasswordResetEmail,
    confirmPasswordReset,
  };
}
