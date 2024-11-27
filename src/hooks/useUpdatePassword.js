import { useState } from "react";
import { useUserContext } from "../contexts/userContext";

const useUpdatePassword = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { isInstitutional } = useUserContext();
  const usertype = isInstitutional ? "user" : "company";
  const token = sessionStorage.getItem("token");
  
  const updatePassword = async (userId, email, password, newPassword) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/${usertype}/updatePassword/${userId}`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
      },
        body: JSON.stringify({ email, password, newPassword }),
      });

      if (!response.ok) throw new Error("Error al actualizar la contraseña");
      window.location.reload();
      alert("Contraseña actualizada con éxito");
    } catch (error) {
      setError(error.message);
      alert("Error al actualizar la contraseña: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return { updatePassword, loading, error };
};

export default useUpdatePassword;
