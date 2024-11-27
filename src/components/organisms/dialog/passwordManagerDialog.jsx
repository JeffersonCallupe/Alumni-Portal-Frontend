import React, { useState } from "react";
import DialogBase from "./profileBaseDialog";
import ActionButton from "../../atoms/buttons/actionButton";
import FormPassword from "../forms/empresa/formPassword";

const PasswordManager = ({ userId }) => {
  const [openPasswordModal, setOpenPasswordModal] = useState(false);

  const handleOpenPasswordChange = () => setOpenPasswordModal(true);
  const handleClosePasswordChange = () => setOpenPasswordModal(false);

  return (
    <>
      <ActionButton texto="Cambiar Contraseña" onClick={handleOpenPasswordChange} />
      <DialogBase
        open={openPasswordModal}
        handleClose={handleClosePasswordChange}
        title="Cambiar Contraseña"
        content={<FormPassword userId={userId} onCancel={handleClosePasswordChange} />}
        modalId="modal-password"
      />
    </>
  );
};

export default PasswordManager;

