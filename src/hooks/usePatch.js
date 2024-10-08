import { useState } from "react";

const usePatch = (apiUrl) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const patch = async (data) => {
    setLoading(true);
    setError(null);

    const requestBody = JSON.stringify(data);
    try {
      const response = await fetch(apiUrl, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: requestBody,
      });

      if (!response.ok) {
        throw new Error("Error al enviar los datos.");
      }
      return response.json();
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { loading, error, patch };
};

export default usePatch;
