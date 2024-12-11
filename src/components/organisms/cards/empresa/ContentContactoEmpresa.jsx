import React from "react";
import Typography from "@mui/material/Typography";
import { useUserContext } from "../../../../contexts/userContext";

const ContentContactoEmpresa = () => {
  const { userData } = useUserContext();
  return (
    <div className="flex flex-col">
      <Typography variant="body2">
        Correo Electrónico: {userData.email || "No especificado"}
      </Typography>
      <br></br>
      <Typography variant="body2">
        Teléfono: {userData.phone || "No especificado"}
      </Typography>
      <br></br>
      <Typography variant="body2" sx={{ mb: 1 }}>
        Sitio Web:
        <a href={userData.website || "#"} 
            target="_blank" 
            rel="noopener noreferrer" 
            style={{ color: "darkblue"}}>
            {" "+userData.website || "No especificado"}
        </a>
    </Typography>
    </div>
  );
};

export default ContentContactoEmpresa;