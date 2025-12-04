// useDelete.js
import { useState } from 'react';

/**
 * Custom hook para realizar peticiones DELETE a una API
 * @param {string} apiUrl - URL base del endpoint de la API
 * @returns {Object} Objeto con deleteData, loading y error
 * @returns {Function} returns.deleteData - Función asíncrona para eliminar datos
 * @returns {boolean} returns.loading - Estado de carga de la petición
 * @returns {string|null} returns.error - Mensaje de error si ocurre alguno
 */
const useDelete = (apiUrl) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const token = sessionStorage.getItem("token");

  /**
   * Realiza una petición DELETE al endpoint especificado
   * @param {string|number} id - ID del recurso a eliminar
   * @returns {Promise<void>}
   * @throws {Error} Si la petición falla
   */
  const deleteData = async (id) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${apiUrl}/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        redirect: "follow",
      });
      if (!response.ok) {
        throw new Error(`Error al eliminar el recurso: ${response.statusText}`);
      }
    } catch (err) {
      setError(err.message);
      console.error("Error en la solicitud DELETE:", err);
      throw err; // Agregado: lanzar el error para que pueda ser manejado por el componente
    } finally {
      setLoading(false);
    }
  };

  return { deleteData, loading, error };
};

export default useDelete;