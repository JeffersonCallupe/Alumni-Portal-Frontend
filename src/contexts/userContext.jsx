import React, { createContext, useContext, useState, useEffect } from "react";

// Creación del contexto para los usuarios
const UserContext = createContext();

// Hook para acceder al contexto de usuario
export const useUserContext = () => {
  return useContext(UserContext);
};

// Proveedor del contexto de usuario
export const UserProvider = ({ children }) => {
  // Estado inicial comentado (para referencia futura)
  /*
  const [userData, setUserData] = useState({
    id: 2,
    name: "Persona 1",
    ruc: "20100199721",
    email: "contact@unmsm.edu.pe",
    description: "La Universidad Nacional Mayor de San Marcos es una universidad pública ubicada en Lima, Perú. Es la universidad más antigua de América",
    sector: "Educación Superior",
    phone: "+51 619 700",
    website: "https://unmsm.edu.pe",
    location: "Lima, Peru",
  });
  */

  // Estado para almacenar los datos del usuario
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
        const response = await fetch("http://178.128.147.224:8080/api/company/2");

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
