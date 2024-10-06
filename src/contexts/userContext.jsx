import React, { createContext, useContext, useState } from "react";

const UserContext = createContext();

export const useUserContext = () => {
  return useContext(UserContext);
};

export const UserProvider = ({ children }) => {
  const [userData, setUserData] = useState({
    id: 2,
    name: "Universidad Nacional Mayor de San Marcos",
    ruc: "20100199721",
    email: "contact@unmsm.edu.pe",
    description: "La Universidad Nacional Mayor de San Marcos es una universidad pública ubicada en Lima, Perú. Es la universidad más antigua de América",
    sector: "Educación Superior",
    phone: "+51 619 700",
    website: "https://unmsm.edu.pe",
    location: "Lima, Peru",
    
  });

  const updateUserData = (newData) => {
    setUserData((prevData) => ({ ...prevData, ...newData }));
  };

  return (
    <UserContext.Provider value={{ userData, updateUserData }}>
      {children}
    </UserContext.Provider>
  );
};
