import React, { createContext, useContext, useState, useEffect } from "react";

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

   // Cargar datos del usuario desde sessionStorage al iniciar
  useEffect(() => {
    const storedUserData = sessionStorage.getItem("user");
    if (storedUserData) {
      const parsedData = JSON.parse(storedUserData);
      setUserData(parsedData);
      if (parsedData.studentCode) {
        setIsInstitutional(true);
      }
    }
  }, []);
  // Función para actualizar los datos del usuario
  const updateUserData = (newData) => {
    if (newData.studentCode) {
      setIsInstitutional(true);
    } else {
      setIsInstitutional(false);
    }
    setUserData((prevData) => {
      const updatedData = { ...prevData, ...newData };
      sessionStorage.setItem("user", JSON.stringify(updatedData));
      return updatedData;
    });
  };


  return (
    <UserContext.Provider value={{ userData, updateUserData, isInstitutional }}>
      {children}
    </UserContext.Provider>
  );
};
