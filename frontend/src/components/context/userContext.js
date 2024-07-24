// UserContext.js
import React, { createContext, useState, useContext } from "react";

// יצירת ההקשר
const UserContext = createContext();

// ספק ההקשר
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

// הוק מותאם אישית לשימוש בהקשר
export const useUserContext = () => {
  return useContext(UserContext);
};
