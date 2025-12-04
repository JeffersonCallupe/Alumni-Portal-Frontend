import { useState } from "react";

/**
 * Custom hook para realizar peticiones POST a una API
 * @param {string} apiUrl - URL del endpoint de la API
 * @returns {Object} Objeto con loading, error y función post
 * @returns {boolean} returns.loading - Estado de carga de la petición
 * @returns {string|null} returns.error - Mensaje de error si ocurre alguno
 * @returns {Function} returns.post - Función asíncrona para enviar datos
 */
const usePost = (apiUrl) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const token = sessionStorage.getItem("token");

  /**
   * Realiza una petición POST al endpoint especificado
   * @param {Object|FormData} data - Datos a enviar
   * @param {boolean} [isFormData=false] - Indica si los datos son FormData
   * @returns {Promise<any>} Respuesta de la API (JSON o texto)
   * @throws {Error} Si la petición falla
   */
  const post = async (data, isFormData = false) => {
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
        method: "POST",
        headers: headers,
        body: requestBody,
        redirect: "follow",
      });

      if (!response.ok) {
        throw new Error(`Error al enviar los datos: ${response.statusText}`);
      }

      const contentType = response.headers.get("content-type");
      return contentType && contentType.includes("application/json")
        ? await response.json()
        : await response.text();

    } catch (error) {
      setError(error.message);
      console.error("Error en la solicitud POST:", error);
      throw error; // Agregado: lanzar el error para que pueda ser manejado por el componente
    } finally {
      setLoading(false);
    }
  };

  return { loading, error, post };
};

export default usePost;