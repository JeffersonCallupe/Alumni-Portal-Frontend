import React, { createContext, useContext, useState, useEffect } from "react";
import { getProfilePicture } from "../hooks/manageImageUser";
import DefaultProfile from "../assets/logoPerfil.png";

// Creación del contexto para los usuarios
const UserContext = createContext();

// Hook para acceder al contexto de usuario
export const useUserContext = () => {
  return useContext(UserContext);
};

// Proveedor del contexto de usuario
export const UserProvider = ({ children }) => {
  const [userData, setUserData] = useState(null);
  const [isInstitutional, setIsInstitutional] = useState(false);
  const [profilePicture, setProfilePicture] = useState(DefaultProfile);

  // Cargar datos del usuario desde sessionStorage al iniciar
  useEffect(() => {
    const storedUserData = sessionStorage.getItem("user");
    if (storedUserData) {
      const parsedData = JSON.parse(storedUserData);
      setUserData(parsedData);
      setIsInstitutional(!!parsedData.studentCode);
      loadProfilePicture(parsedData);
    }
  }, []);

  // Función para actualizar los datos del usuario
  const updateUserData = (newData) => {
    setIsInstitutional(!!newData.studentCode);
    setUserData((prevData) => {
      const updatedData = { ...prevData, ...newData };
      sessionStorage.setItem("user", JSON.stringify(updatedData));
      return updatedData;
    });
  };

  // Función para cargar la foto de perfil
  const loadProfilePicture = async (user) => {
    try {
      if (user.photoUrl) {
        const apiUrl = user.studentCode
          ? `${import.meta.env.VITE_API_URL}/api/image/download-user`
          : `${import.meta.env.VITE_API_URL}/api/image/download-company`;

        const id = user.id;
        const imageUrl = await getProfilePicture(apiUrl, id);
        if (imageUrl) {
          setProfilePicture(imageUrl);
        } else {
          setProfilePicture(DefaultProfile);
        }
      } else {
        setProfilePicture(DefaultProfile);
      }
    } catch (error) {
      console.error("Error al cargar la imagen de perfil:", error);
      setProfilePicture(DefaultProfile);
    }
  };

  // Función para cerrar sesión
  const logout = () => {
    sessionStorage.removeItem("user");
    sessionStorage.removeItem("token");
    setUserData(null);
    setProfilePicture(DefaultProfile);
  };

  return (
    <UserContext.Provider value={{ userData, updateUserData, loadProfilePicture, isInstitutional, logout, profilePicture }}>
      {children}
    </UserContext.Provider>
  );
};