import React, { useState } from "react";
import Box from "@mui/material/Box";
import EditButton from "../../../atoms/buttons/EditButton";
import DialogBase from "../../dialog/DialogBase";
import FormHeader from "../../forms/institucional/FormHeader";
import Typography from "@mui/material/Typography";
import ActionButton from "../../../atoms/buttons/ActionButton";
import { useUserContext } from "../../../../contexts/userContext";
import useModal from "../../../../hooks/useModal";
import DownloadForOfflineOutlinedIcon from '@mui/icons-material/DownloadForOfflineOutlined';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import SchoolIcon from '@mui/icons-material/School';
import WorkIcon from '@mui/icons-material/Work';
import { useAlert } from "../../../../contexts/alertContext";

const CardContentInstitucional = ({ loading, onSubmit }) => {
  const { open, handleOpen, handleClose } = useModal();
  const { userData } = useUserContext();  // Desestructuramos solo userData
  const { showAlert } = useAlert();

  const handleDownloadCV = async () => {
    const userId = userData.id;
    const url = `${import.meta.env.VITE_API_URL}/api/user/cv/download/${userId}`;

    // Obtener el token desde sessionStorage
    const token = sessionStorage.getItem("token");  // Asumiendo que el token se guarda con la clave 'token'

    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,  // Usar el token desde sessionStorage
        },
        redirect: "follow",
      });

      if (response.ok) {
        const blob = await response.blob();
        const link = document.createElement("a");
        link.href = window.URL.createObjectURL(blob);
        link.download = `${userData.name}_CV.pdf`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        showAlert("¡Descarga exitosa! El CV ha sido descargado.", "success");
      } else {
        throw new Error("Error al descargar el CV");
      }
    } catch (error) {
      showAlert("Error al descargar el CV", "error");
    }
  };

  return (
    <div className="flex flex-col md:flex-row justify-between gap-4">
      <div className="flex flex-col flex-1 gap-3">
        {/* Nombre completo */}
        <Typography
          variant="h4"
          align="left"
          sx={{
            fontWeight: 700,
            color: '#111827',
            fontSize: { xs: '1.5rem', md: '2rem' },
          }}
        >
          {`${userData.name} ${userData.paternalSurname} ${userData.maternalSurname}` || "Nombre del estudiante"}
        </Typography>

        {/* Headline/Título profesional */}
        {userData.headline && (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <WorkIcon sx={{ fontSize: 20, color: '#6B7280' }} />
            <Typography
              variant="h6"
              align="left"
              sx={{
                fontWeight: 500,
                color: '#374151',
                fontSize: '1.125rem',
              }}
            >
              {userData.headline}
            </Typography>
          </Box>
        )}

        {/* Facultad */}
        {userData.faculty && (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <SchoolIcon sx={{ fontSize: 20, color: '#6F191C' }} />
            <Typography
              variant="body1"
              align="left"
              sx={{
                color: '#4B5563',
                fontSize: '0.9375rem',
              }}
            >
              {userData.faculty}
            </Typography>
          </Box>
        )}

        {/* Divider */}
        <Box sx={{ borderTop: '1px solid #E5E7EB', my: 1 }} />

        {/* Información de contacto */}
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <EmailIcon sx={{ fontSize: 18, color: '#6B7280' }} />
            <Typography
              variant="body2"
              align="left"
              sx={{
                color: '#6B7280',
                fontSize: '0.875rem',
              }}
            >
              {userData.email || "No especificado"}
            </Typography>
          </Box>

          {userData.contactNumber && (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <PhoneIcon sx={{ fontSize: 18, color: '#6B7280' }} />
              <Typography
                variant="body2"
                align="left"
                sx={{
                  color: '#6B7280',
                  fontSize: '0.875rem',
                }}
              >
                {userData.contactNumber}
              </Typography>
            </Box>
          )}
        </Box>
      </div>

      {/* Botones de acción */}
      <div className="flex flex-col items-end gap-3">
        <Box
          sx={{
            zIndex: 1,
            position: "relative",
          }}
        >
          <EditButton onClick={handleOpen} />
        </Box>
        <div className="flex-shrink-0">
          <ActionButton
            texto={"Descargar CV"}
            startIcon={<DownloadForOfflineOutlinedIcon />}
            onClick={handleDownloadCV}
          />
        </div>
      </div>

      {/* Modal para editar perfil */}
      <DialogBase
        open={open}
        handleClose={handleClose}
        title="Información Personal"
        content={<FormHeader onSubmit={onSubmit} onCancel={handleClose} loading={loading} />}
        modalId="modal-profile"
      />
    </div>
  );
};

export default CardContentInstitucional;
