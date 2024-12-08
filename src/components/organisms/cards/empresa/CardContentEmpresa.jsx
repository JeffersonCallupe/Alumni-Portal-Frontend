import React, { useState } from "react"; // Agregar useState
import Box from "@mui/material/Box";
import EditButton from "../../../atoms/buttons/editButton";
import DialogBase from "../../dialog/DialogBase";
import FormHeader from "../../forms/empresa/formHeader";
import Typography from "@mui/material/Typography";
import ActionButton from "../../../atoms/buttons/ActionButton";
import FormPassword from "../../forms/empresa/formPassword"; // Importar el formulario de contraseña
import { useUserContext } from "../../../../contexts/userContext";
import useModal from "../../../../hooks/useModal";

const CardContentEmpresa = ({ loading, onSubmit }) => {
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
          {userData.name || "Nombre de la Empresa"}
        </Typography>
        <Typography variant="body2" align="left">
          Sector: {userData.sector || "No especificado"}
        </Typography>
        <Typography variant="body2" align="left">
          Locación: {userData.location || "No especificado"}
        </Typography>
        <Typography variant="body2" align="left">
          RUC: {userData.ruc || "No especificado"}
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
      </div>

      {/* Modal para editar perfil */}
      <DialogBase
        open={open}
        handleClose={handleClose}
        title="Información de la Empresa"
        content={contentHeader}
        modalId="modal-profile"
      />
      
    </div>
  );
};

export default CardContentEmpresa;
