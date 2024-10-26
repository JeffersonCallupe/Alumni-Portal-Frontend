import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

const DeleteConfirmationModal = ({
  isOpen,
  onClose,
  onConfirm,
  title = "Confirmar eliminación",
  message = "¿Está seguro que desea eliminar este elemento? Esta acción no se puede deshacer.",
  cancelButtonText = "Cancelar",
  confirmButtonText = "Eliminar"
}) => {
  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      aria-labelledby="delete-dialog-title"
      aria-describedby="delete-dialog-description"
    >
      <DialogTitle id="delete-dialog-title">
        {title}
      </DialogTitle>
      <DialogContent>
        <Typography id="delete-dialog-description">
          {message}
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button 
          onClick={onClose}
          style={{ textTransform: "none" }}
        >
          {cancelButtonText}
        </Button>
        <Button 
          onClick={onConfirm}
          color="error"
          style={{ textTransform: "none" }}
          autoFocus
        >
          {confirmButtonText}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteConfirmationModal;