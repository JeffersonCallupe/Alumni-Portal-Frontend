import { useState } from "react";
import { useUserContext } from "../contexts/userContext";

const useLogin = (apiUrl) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { updateUserData } = useUserContext();
  const [data, setData] = useState(null);

  const login = async (credentials) => {
    setLoading(true);
    setError(null);

    const requestBody = JSON.stringify(credentials);
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
      let userData = null;

      if (result["data"] && Array.isArray(result["data"]) && result["data"][0]?.["dto"]) {
        sessionStorage.setItem("user", JSON.stringify(result["data"][0]["dto"]));
        setData(result["data"][0]["dto"]);
      } else {
        userData = result;
        updateUserData(userData);
        setData(userData);
      }

    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, login };
};

export default useLogin;
