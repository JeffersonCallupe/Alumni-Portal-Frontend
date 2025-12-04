import { useState } from 'react';

/**
 * Custom hook para realizar peticiones GET a una API
 * @param {string} apiUrl - URL del endpoint de la API
 * @returns {Object} Objeto con loading, error y función getData
 * @returns {boolean} returns.loading - Estado de carga de la petición
 * @returns {string|null} returns.error - Mensaje de error si ocurre alguno
 * @returns {Function} returns.getData - Función asíncrona para obtener datos
 */
const useGet = (apiUrl) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const token = sessionStorage.getItem("token");

  /**
   * Realiza una petición GET al endpoint especificado
   * @returns {Promise<any>} Datos obtenidos de la API
   * @throws {Error} Si la petición falla
   */
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

      // Corregido: usar response.ok en lugar de !response.status===200
      if (!response.ok && response.status !== 404) {
        throw new Error(`Error al obtener los datos: ${response.statusText}`);
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