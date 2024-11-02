import { useState } from "react";
import { useUserContext } from "../contexts/userContext";

const usePost = (apiUrl) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { updateUserData } = useUserContext();
  const token = sessionStorage.getItem("token");

  const post = async (data) => {
    setLoading(true);
    setError(null);

    const requestBody = JSON.stringify(data);
    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
        body: requestBody,
        redirect: "follow",
      });

      if (!response.ok) {
        throw new Error(`Error al enviar los datos: ${response.statusText}`);
      }

      // Realizamos el GET automáticamente si el PATCH fue exitoso
      const getResponse = await fetch(apiUrl, {
        method: "GET",
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!getResponse.ok) {
        throw new Error(`Error al obtener los datos actualizados: ${getResponse.statusText}`);
      }

      const updatedData = await getResponse.json();
      updateUserData(updatedData);

    } catch (error) {
      setError(error.message);
      console.error("Error en la solicitud POST o GET:", error);
    } finally {
      setLoading(false);
    }
  };

  return { loading, error, post };
};

export default usePost;
