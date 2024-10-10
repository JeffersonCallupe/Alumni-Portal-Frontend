import React, { createContext, useContext, useState } from "react";

const UserContext = createContext();

export const useUserContext = () => {
  return useContext(UserContext);
};

export const UserProvider = ({ children }) => {
  const [userData, setUserData] = useState({
    id: 1,
    email: "karlo.romero@unmsm.edu.pe",
    password: "123",
    paternalSurname: "Romero",
    maternalSurname: "Cisneros",
    name: "Karlo",
    about: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita, ipsam fugit! Reprehenderit ipsa iusto cum minima rerum, cumque voluptatum dicta doloremque inventore, iste voluptatibus consequatur. Iusto voluptatibus inventore dolorem quas!",
    photoUrl: null,
    contactNumber: "910042451",
    createdAt: "2024-09-29",
    updatedAt: null,
    faculty: "INGENIERÍA DE SISTEMAS E INFORMATÍCA",
    career: "E.P. Ingenieria de Software",
    plan: "2018",
    permanence: null,
    studentCode: "19200101",
    headline: "developer",
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