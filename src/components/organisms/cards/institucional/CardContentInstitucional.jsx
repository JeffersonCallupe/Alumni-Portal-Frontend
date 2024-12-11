import React, { useState } from "react";
import Box from "@mui/material/Box";
import EditButton from "../../../atoms/buttons/EditButton";
import DialogBase from "../../dialog/dialogBase";
import FormHeader from "../../forms/institucional/FormHeader";
import Typography from "@mui/material/Typography";
import ActionButton from "../../../atoms/buttons/ActionButton";
import { useUserContext } from "../../../../contexts/userContext";
import useModal from "../../../../hooks/useModal";
import DownloadForOfflineOutlinedIcon from '@mui/icons-material/DownloadForOfflineOutlined';

const CardContentInstitucional = ({ loading, onSubmit }) => {
  const { open, handleOpen, handleClose } = useModal();
  const { userData } = useUserContext();  // Desestructuramos solo userData

  const handleDownloadCV = async () => {
    const userId = userData.id;
    const url = `${import.meta.env.VITE_API_URL}/api/user/cv/download/${userId}`;
    
    // Obtener el token desde sessionStorage
    const token = sessionStorage.getItem("token");  // Asumiendo que el token se guarda con la clave 'token'

    if (!token) {
      alert("No se pudo obtener el token. Por favor, inicie sesión nuevamente.");
      return;
    }

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
        alert(`¡Descarga exitosa! El CV de ${userData.name} ha sido descargado.`);
      } else {
        throw new Error("Error al descargar el CV");
      }
    } catch (error) {
      alert("Hubo un error al intentar descargar el CV. Por favor, inténtalo de nuevo.");
    }
  };

  return (
    <div className="flex flex-row justify-between">
      <div className="flex flex-col w-3/5 gap-1">
        <Typography variant="h5" align="left">
          {`${userData.name} ${userData.paternalSurname} ${userData.maternalSurname}` || "Nombre del estudiante"}
        </Typography>
        <Typography variant="body2" align="left">
          {userData.headline || "No especificado"}
        </Typography>
        <Typography variant="body2" align="left">
          {userData.faculty || "No especificado"}
        </Typography>
        <Typography variant="body2" align="left">
          Correo Electrónico: {userData.email || "No especificado"}
        </Typography>
        <Typography variant="body2" align="left">
          Número de contacto: {userData.contactNumber || "No especificado"}
        </Typography>
      </div>
      <div className="flex flex-col items-end">
        <Box
          sx={{
            zIndex: 1,
            position: "relative",
            bottom: "1rem",
            marginRight: "0.3rem",
          }}
        >
          <EditButton onClick={handleOpen} />
        </Box>
        <div className="flex flex-col gap-2 items-center" style={{ marginTop: "3.5rem", marginRight: "0.5rem" }}>
          <div className="flex-shrink-0">
            <ActionButton texto={"Descargar CV"} startIcon={<DownloadForOfflineOutlinedIcon />} onClick={handleDownloadCV} />
          </div>
        </div>
      </div>

      {/* Modal para editar perfil */}
      <DialogBase open={open} handleClose={handleClose} title="Información Personal" content={<FormHeader onSubmit={onSubmit} onCancel={handleClose} loading={loading} />} modalId="modal-profile" />
    </div>
  );
};

export default CardContentInstitucional;
