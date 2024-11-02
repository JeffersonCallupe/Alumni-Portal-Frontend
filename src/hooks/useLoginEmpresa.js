import { useState } from "react";
import { useUserContext } from "../contexts/userContext";

const useLoginEmpresa = (apiUrl) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { updateUserData } = useUserContext();
  const [data, setData] = useState(null);

  const loginEmpresa = async (formData) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

    
      const contentType = response.headers.get("content-type");
      let result;

      if (contentType && contentType.includes("application/json")) {
        result = await response.json(); 
      } else {
        result = await response.text(); 
      }

      if (!response.ok) {
        throw new Error(result.message || result || "Error en la autenticación de empresa");
      }

      const companyData = result;

      sessionStorage.setItem("company", JSON.stringify(companyData));
      setData(companyData);
      updateUserData(companyData);

      const token = result["token"];
      sessionStorage.setItem("token", token);

    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, loginEmpresa };
};

export default useLoginEmpresa;
