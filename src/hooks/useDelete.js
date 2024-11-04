// useDelete.js
import { useState } from 'react';

const useDelete = (apiUrl) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const token = sessionStorage.getItem("token");

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
      if (!response.ok) throw new Error('Error al eliminar la actividad');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return { deleteData, loading, error };
};

export default useDelete;