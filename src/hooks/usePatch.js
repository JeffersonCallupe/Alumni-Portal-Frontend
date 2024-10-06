import { useState } from "react";

const usePatch = (apiUrl) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const patch = async (data) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(apiUrl, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      console.log(body);

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
