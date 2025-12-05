import React from "react";
import Typography from "@mui/material/Typography";
import { useUserContext } from "../../../../contexts/userContext";

const ContentContactoEmpresa = () => {
  const { userData } = useUserContext();

  return (
    <div className="flex flex-col gap-3">
      <Typography
        variant="body2"
        sx={{
          color: '#4B5563',
          fontSize: '0.9375rem',
        }}
      >
        <strong>Correo:</strong> {userData.email || "No especificado"}
      </Typography>

      <Typography
        variant="body2"
        sx={{
          color: '#4B5563',
          fontSize: '0.9375rem',
        }}
      >
        <strong>Teléfono:</strong> {userData.phone || "No especificado"}
      </Typography>

      {userData.website && (
        <Typography
          variant="body2"
          sx={{
            color: '#4B5563',
            fontSize: '0.9375rem',
          }}
        >
          <strong>Sitio Web:</strong>{" "}
          <a
            href={userData.website}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              color: "#6F191C",
              textDecoration: 'none',
              fontWeight: 500,
            }}
          >
            {userData.website}
          </a>
        </Typography>
      )}
    </div>
  );
};

export default ContentContactoEmpresa;