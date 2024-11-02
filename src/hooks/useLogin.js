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

      // Verificación del contentType
      const contentType = response.headers.get("content-type");
      let result;

      if (contentType && contentType.includes("application/json")) {
        result = await response.json(); 
      } else {
        result = await response.text(); 
      }

      if (!response.ok) {
        throw new Error(result.message || result || "Error en la autenticación");
      }

      let userData = null;

      if (result["data"] && Array.isArray(result["data"]) && result["data"][0]?.["dto"]) {
        sessionStorage.setItem("user", JSON.stringify(result["data"][0]["dto"]));
        setData(result["data"][0]["dto"]);
      } else {
        userData = result;
        setData(userData);
        updateUserData(userData);
        
        const token = result["token"];
        sessionStorage.setItem("token", token);
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
