import { createContext, useState } from "react";
import { users } from "../utils/users";
import { generateToken } from "../utils/jwt";
import { saveUser, getUser, removeUser } from "../utils/auth";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

  const [user, setUser] = useState(getUser());

  const login = (username, password) => {

    const foundUser = users.find(
      u =>
        u.username === username &&
        u.password === password
    );

    if (!foundUser) {
      return {
        success: false,
        message: "Invalid Username or Password"
      };
    }

    const jwt = generateToken(foundUser);

    const userData = {
      ...foundUser,
      ...jwt
    };

    saveUser(userData);

    setUser(userData);

    return {
      success: true
    };
  };

  const logout = () => {

    removeUser();

    setUser(null);

  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );

};