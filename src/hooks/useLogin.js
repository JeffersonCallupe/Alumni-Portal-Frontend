import { useState } from "react";

const useLogin = (apiUrl) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  const login = async (credentials) => {
    setLoading(true);
    setError(null);

    const requestBody = JSON.stringify(credentials);
    console.log("Request Body:", requestBody);

    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: requestBody,
      });

      if (!response.ok) {
        throw new Error("Error en la autenticación");
      }

      const result = await response.json();
      const userData = result['data'][0]['dto']
      sessionStorage.setItem("user", JSON.stringify(userData))
      setData(userData);

    } catch (err) {
      setError(err.message);

    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, login };
};

export default useLogin;