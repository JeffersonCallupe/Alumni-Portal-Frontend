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

  // Función para actualizar los datos del usuario
  const updateUserData = (newData) => {
    setUserData((prevData) => ({ ...prevData, ...newData }));
  };

  // useEffect para hacer la llamada GET a la API y simular la entrada de un token
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Llamada a la API con el id 2 para simular la entrada de un token
        const response = await fetch("http://178.128.147.224:8080/api/user/4");

        if (!response.ok) {
          throw new Error("Error al obtener los datos del usuario");
        }

        const data = await response.json();

        // Almacenar los datos obtenidos en el estado
        setUserData(data);
      } catch (error) {
        console.error("Error al obtener los datos del usuario:", error);
      }
    };

    // Llamar a la función para obtener los datos del usuario al montar el componente
    fetchUserData();
  }, []);

  return (
    <UserContext.Provider value={{ userData, updateUserData }}>
      {children}
    </UserContext.Provider>
  );
};