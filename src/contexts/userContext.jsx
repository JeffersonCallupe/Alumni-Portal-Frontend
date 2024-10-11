import React, { createContext, useContext, useState } from "react";

// Creación del contexto para los usuarios
const UserContext = createContext();

// Hook para acceder al contexto de usuario
export const useUserContext = () => {
  return useContext(UserContext);
};

// Proveedor del contexto de usuario
export const UserProvider = ({ children }) => {
  const [userData, setUserData] = useState(null);
  const [isInstitutional, setIsInstitutional] = useState(false); // Variable para guardar si es institucional

  // Función para actualizar los datos del usuario
  const updateUserData = (newData) => {
    // Si el nuevo dato contiene un studentCode, significa que es un usuario institucional
    if (newData.studentCode) {
      setIsInstitutional(true);
    } else {
      setIsInstitutional(false);
    }

    // Actualizamos los datos del usuario
    setUserData((prevData) => ({ ...prevData, ...newData }));
  };

  return (
    <UserContext.Provider value={{ userData, updateUserData, isInstitutional }}>
      {children}
    </UserContext.Provider>
  );
};
