import { useState } from "react";
import { useUserContext } from "../contexts/userContext";

const useUpdatePassword = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const { isInstitutional } = useUserContext();
  const usertype = isInstitutional ? "user" : "company";
  const token = sessionStorage.getItem("token");

  const updatePassword = async (userId, email, password, newPassword) => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/${usertype}/updatePassword/${userId}`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ email, password, newPassword }),
      });

      if (!response.ok) {
        const errorData = await response.text();
        throw new Error(errorData || "Error al actualizar la contraseña");
      }

      setSuccess(true);
      return true;
    } catch (error) {
      setError(error.message);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const resetState = () => {
    setError(null);
    setSuccess(false);
  };

  return { updatePassword, loading, error, success, resetState };
};

export default useUpdatePassword;
