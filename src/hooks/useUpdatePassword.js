import { useState } from "react";
import { useUserContext } from "../contexts/userContext";

const useUpdatePassword = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { isInstitutional } = useUserContext();
  const usertype = isInstitutional ? "user" : "company";
  const updatePassword = async (userId, email, password, newPassword) => {
    setLoading(true);
    setError(null);
    // Datos que se enviarán
    const payload = { email, password, newPassword };
    console.log("Datos enviados:", JSON.stringify(payload));
    try {
      const response = await fetch(`http://178.128.147.224:8080/api/${usertype}/updatePassword/${userId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, newPassword }),
      });

      if (!response.ok) throw new Error("Error al actualizar la contraseña");
      console.log()
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
