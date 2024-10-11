import { useState } from "react";

const useLoginEmpresa = (apiUrl) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  const loginEmpresa = async (credentials) => {
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
        throw new Error("Error en la autenticación de empresa");
      }

      const result = await response.json();
      const companyData = result.data;

      sessionStorage.setItem("company", JSON.stringify(companyData)); 
      setData(companyData);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, loginEmpresa };
};

export default useLoginEmpresa;
