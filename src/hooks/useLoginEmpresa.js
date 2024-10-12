import { useState } from "react";

const useLoginEmpresa = (apiUrl) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

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
                // Si no es JSON, lee el texto directamente
                result = await response.text();
            }

            if (!response.ok) { 
                throw new Error(result.message || result || "Error en la solicitud");
            }

            setData(result); 
        } catch (err) {
            setError(err.message); 
        } finally {
            setLoading(false);
        }
    };

    return { data, loading, error, loginEmpresa };
};

export default useLoginEmpresa;
