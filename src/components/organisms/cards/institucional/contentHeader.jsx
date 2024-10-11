import React from "react";
import Box from "@mui/material/Box";
import EditButton from "../../../atoms/buttons/editButton";
import DialogBase from "../../dialog/profileBaseDialog";
import FormHeader from "../../forms/institucional/formHeader";
import Typography from "@mui/material/Typography";
import VerInfoButton from "../../../atoms/buttons/verInfoButton";
import { useUserContext } from "../../../../contexts/userContextInstitucional";
import useModal from "../../../../hooks/useModal";

const CardContentInstitucional = ({loading, onSubmit}) => {
  const { open, handleOpen, handleClose } = useModal();
  const { userData } = useUserContext();

  const contentHeader = (
    <FormHeader 
      onSubmit={onSubmit} 
      onCancel={handleClose} 
      loading={loading} 
    />
  );

  return (
    <div className="flex flex-row justify-between">
      <div className="flex flex-col w-3/5 gap-1">
        <Typography variant="h5" align="left">
          {userData.name + " " + userData.paternalSurname + " " + userData.maternalSurname || "Nombre del estudiante"}
        </Typography>
        <Typography variant="body2" align="left">
          {userData.headline || "No especificado"}
        </Typography>
        <Typography variant="body2" align="left">
          Correo Electrónico: {userData.email || "No especificado"}
        </Typography>
        <Typography variant="body2" align="left">
          Número de contacto: {userData.contactNumber || "No especificado"}
        </Typography>
      </div>
      <div>
        <Box
          sx={{
            zIndex: 1,
            position: "relative",
            bottom: "1rem",
            left: "4rem",
          }}
        >
          <EditButton onClick={handleOpen} />
        </Box>
        <VerInfoButton texto={"Cambiar Contraseña"} />
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