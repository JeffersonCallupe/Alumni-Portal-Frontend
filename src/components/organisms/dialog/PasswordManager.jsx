import React, { useState } from "react";
import DialogBase from "./dialogBase";
import ActionButton from "../../atoms/buttons/ActionButton";
import FormPassword from "../forms/empresa/FormPassword";

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

