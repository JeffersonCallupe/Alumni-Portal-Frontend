import { useState } from 'react';

const useGet = (apiUrl) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const token = sessionStorage.getItem("token");

  const getData = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(apiUrl, {
        method: "GET",
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        redirect: "follow",
      });

      if (!response.status===200 && response.status!==404) {
<<<<<<< HEAD
          throw new Error(`Error al obtener los datos: ${response.statusText}`);
=======
        throw new Error(`Error al obtener los datos: ${response.statusText}`);
>>>>>>> Jefferson
      }


      const data = await response.json();
      return data;

    } catch (error) {
      setError(error.message);
      console.error("Error en la solicitud GET:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return { loading, error, getData };
};

export default useGet;