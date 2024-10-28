// useUpdateData.js
import { useState } from 'react';

const useUpdateData = (updateUrl) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const updateData = async (data) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(updateUrl, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Error al actualizar los datos.');
      }
      window.location.reload();
      return await response.json();
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { loading, error, updateData };
};

export default useUpdateData;
