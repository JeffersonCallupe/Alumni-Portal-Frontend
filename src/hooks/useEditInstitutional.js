// useUpdateData.js
import { useState } from 'react';

const useUpdateData = (updateUrl) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const token = sessionStorage.getItem("token");

  const updateData = async (data) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(updateUrl, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
      },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Error al actualizar los datos.');
      }

      const updatedExperience = await response.json();
      if (!updatedExperience || !updatedExperience.id) {
      throw new Error('Datos de la experiencia laboral no válidos.');
     }
    
      return updatedExperience;  // Devuelve la experiencia actualizada      
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { loading, error, updateData };
};

export default useUpdateData;