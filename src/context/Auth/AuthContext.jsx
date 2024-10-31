import { createContext, useState, useContext } from "react";
import { authGoogle } from "../../API/AuthGoogle";
const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);
export const AuthContextProvider = ({ children }) => {
  const [auth, setAuth] = useState(null);
  const getAuth = async() => {
    const getAuth = await authGoogle();
    setAuth(getAuth);
  }
  return (
    <AuthContext.Provider value={{ auth, getAuth }}>
      {children}
    </AuthContext.Provider>
  );
};
