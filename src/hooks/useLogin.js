import { useState } from "react";

const useLogin = (apiUrl) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  const login = async (credentials) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      });

      if (!response.ok) {
        throw new Error("Error en la autenticación");
      }

      const result = await response.json();

      sessionStorage.setItem("user", JSON.stringify(result))
      setData(result);
      console.log(result);2

    } catch (err) {
      setError(err.message);

    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, login };
};

export default useLogin;