import { useState } from "react";
import { useUserContext } from "../contexts/userContext";

const usePatch = (apiUrl) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { updateUserData } = useUserContext();
  const token = sessionStorage.getItem("token");

  const patch = async (data, isFormData = false) => {
    setLoading(true);
    setError(null);

    let requestBody;
    let headers = {
      'Authorization': `Bearer ${token}`,
    };

    if (isFormData) {
      requestBody = data;
      console.log(requestBody);
      for (let pair of data.entries()) {
        console.log(pair[0]+ ', ' + pair[1]); 
      }
    } else {
      requestBody = JSON.stringify(data);
      headers['Content-Type'] = 'application/json';
      console.log(requestBody);
    }

    try {
      const response = await fetch(apiUrl, {
        method: "PATCH",
        headers: headers,
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
      console.error("Error en la solicitud PATCH o GET:", error);
    } finally {
      setLoading(false);
    }
  };

  return { loading, error, patch };
};

export default usePatch;
