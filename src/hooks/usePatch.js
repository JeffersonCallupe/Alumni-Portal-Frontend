import { useState } from "react";

/**
 * Custom hook para realizar peticiones PATCH a una API
 * @param {string} apiUrl - URL del endpoint de la API
 * @returns {Object} Objeto con loading, error y función patch
 * @returns {boolean} returns.loading - Estado de carga de la petición
 * @returns {string|null} returns.error - Mensaje de error si ocurre alguno
 * @returns {Function} returns.patch - Función asíncrona para actualizar datos
 */
const usePatch = (apiUrl) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const token = sessionStorage.getItem("token");

  /**
   * Realiza una petición PATCH al endpoint especificado
   * @param {Object|FormData} data - Datos a actualizar
   * @param {boolean} [isFormData=false] - Indica si los datos son FormData
   * @returns {Promise<any>} Respuesta de la API (JSON o texto)
   * @throws {Error} Si la petición falla
   */
  const patch = async (data, isFormData = false) => {
    setLoading(true);
    setError(null);

    let requestBody;
    let headers = {
      'Authorization': `Bearer ${token}`,
    };

    if (isFormData) {
      requestBody = data;
    } else {
      requestBody = JSON.stringify(data);
      headers['Content-Type'] = 'application/json';
    }

    try {
      const response = await fetch(apiUrl, {
        method: "PATCH",
        headers: headers,
        body: requestBody,
        redirect: "follow",
      });

      // Cambiado a response.ok para consistencia con otros hooks
      if (!response.ok) {
        throw new Error(`Error al actualizar los datos: ${response.statusText}`);
      }

      const contentType = response.headers.get("content-type");
      return contentType && contentType.includes("application/json")
        ? await response.json()
        : await response.text();

    } catch (error) {
      setError(error.message);
      console.error("Error en la solicitud PATCH:", error);
      throw error; // Agregado: lanzar el error para que pueda ser manejado por el componente
    } finally {
      setLoading(false);
    }
  };

  return { loading, error, patch };
};

export default usePatch;
