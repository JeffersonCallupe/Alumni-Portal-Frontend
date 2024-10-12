import React from "react";
import Box from "@mui/material/Box";
import EditButton from "../../../atoms/buttons/editButton";
import DialogBase from "../../dialog/profileBaseDialog";
import FormHeader from "../../forms/institucional/formHeader";
import Typography from "@mui/material/Typography";
import ActionButton from "../../../atoms/buttons/actionButton";
import { useUserContext } from "../../../../contexts/userContextInstitucional";
import useModal from "../../../../hooks/useModal";

const CardContentInstitucional = ({ loading, onSubmit }) => {
  const { open, handleOpen, handleClose } = useModal();
  const { userData } = useUserContext();

  const contentHeader = (
    <FormHeader 
      onSubmit={onSubmit} 
      onCancel={handleClose} 
      loading={loading} 
    />
  );

  // Función simplificada para verificar el éxito de la descarga
  const isDownloadSuccessful = (response) => {
    if (!response.ok) {
      throw new Error('Error al descargar el CV');
    }
    return true;
  };

  // Función para descargar el CV
  const handleDownloadCV = async () => {
    const userId = userData.id; // Asegúrate de que userId esté disponible en userData
    const url = `http://178.128.147.224:8080/api/user/cv/download/${userId}`; // Endpoint con el userId

    try {
      const response = await fetch(url);

      // Verifica si la descarga fue exitosa
      if (isDownloadSuccessful(response)) {
        const blob = await response.blob(); // Obtener el archivo como blob
        const link = document.createElement('a');
        link.href = window.URL.createObjectURL(blob);
        link.download = `${userData.name}_CV.pdf`; // Asigna un nombre al archivo
        document.body.appendChild(link);
        link.click(); // Simula un clic en el enlace para iniciar la descarga
        document.body.removeChild(link); // Eliminar el enlace temporal

        // Mensaje de éxito en consola y alerta simplificada al usuario
        console.log("CV descargado con éxito");
        alert(`¡Descarga exitosa! El CV de ${userData.name} ha sido descargado.`);
      }
    } catch (error) {
      console.error("Error durante la descarga del CV:", error); // Mensaje de error en la consola
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
      <div className="flex flex-col items-end"> {/* Flex container para los botones */}
        <Box
          sx={{
            zIndex: 1,
            position: "relative",
            bottom: "1rem",
          }}
        >
          <EditButton onClick={handleOpen} />
        </Box>
        <div className="flex flex-row gap-2 items-center" style={{ marginTop: '3rem' }}>
          <div className="flex-shrink-0"> 
            <ActionButton texto={"Cambiar Contraseña"} />
          </div>
          <div className="flex-shrink-0">
            <ActionButton texto={"Descargar CV"} onClick={handleDownloadCV} /> {/* Asocia la función aquí */}
          </div>
        </div>
      </div>

      <DialogBase
        open={open}
        handleClose={handleClose}
        title="Información Personal"
        content={contentHeader}
        modalId="modal-profile"
      />
    </div>
  );
};

export default CardContentInstitucional;