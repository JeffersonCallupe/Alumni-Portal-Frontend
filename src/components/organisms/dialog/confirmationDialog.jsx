import React from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from "@mui/material";
import Typography from "@mui/material/Typography";

const ConfirmationDialog = ({ open, onClose, onConfirm, title, content }) => {
  return (
    <Dialog 
      open={open} 
      onClose={onClose} 
      fullWidth maxWidth="sm" 
      aria-labelledby="delete-dialog-title" aria-describedby="delete-dialog-description">
      <DialogTitle id="delete-dialog-title">
        {title}
      </DialogTitle>
      <DialogContent>
        <Typography id="delete-dialog-description">
          {content}
        </Typography>
      </DialogContent>
      <DialogActions>
        <div className="flex justify-end gap-4 mt-4">
          <Button variant="outlined" type="button" onClick={onClose}>
            Cancelar
          </Button>
          <Button variant="contained" type="submit" onClick={onConfirm}>
            Confirmar
          </Button>
        </div>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmationDialog;