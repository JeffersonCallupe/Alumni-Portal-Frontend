import { useState } from "react";

const usePatch = (apiUrl) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const token = sessionStorage.getItem("token");

  const patch = async (data, isFormData = false) => {
    setLoading(true);
    setError(null);

    let requestBody;
    let headers = {
      'Authorization': `Bearer ${token}`,
    };

    if (isFormData) {
      requestBody = data;
    } else {
      requestBody = JSON.stringify(data);
      headers['Content-Type'] = 'application/json';
    }

    try {
      const response = await fetch(apiUrl, {
        method: "PATCH",
        headers: headers,
        body: requestBody,
        redirect: "follow",
      });

      if (!response.status !== 200) {
        throw new Error(`Error al enviar los datos: ${response.statusText}`);
      }

      const contentType = response.headers.get("content-type");
        return contentType && contentType.includes("application/json")
            ? await response.json()
            : await response.text();

    } catch (error) {
      setError(error.message);
      console.error("Error en la solicitud PATCH:", error);
    } finally {
      setLoading(false);
    }
  };

  return { loading, error, patch };
};

export default usePatch;
