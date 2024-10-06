import * as React from "react";
import Typography from "@mui/material/Typography";
import { useUserContext } from "../../../../contexts/userContext";

const ContentContactoEmpresa = () => {
  const { userData } = useUserContext();
  return (
    <div className="flex flex-col">
      <Typography variant="body2">
        Correo Electrónico: {userData.email || "No especificado"}
      </Typography>
      <Typography variant="body2">
        Teléfono: {userData.phone || "No especificado"}
      </Typography>
      <Typography variant="body2">
        Sitio Web: {userData.website || "No especificado"}
      </Typography>
    </div>
  );
};

export default ContentContactoEmpresa;