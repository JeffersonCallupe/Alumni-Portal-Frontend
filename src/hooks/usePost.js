import { useState } from "react";

const usePost = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const post = async (endpoint, data) => {
    setLoading(true);
    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        throw new Error("Error al realizar el POST");
      }
      setLoading(false);
      return await response.json();
    } catch (err) {
      setError(err);
      setLoading(false);
    }
  };

  return { loading, error, post };
};

export default usePost;