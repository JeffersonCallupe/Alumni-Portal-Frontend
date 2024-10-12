import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

const DialogBase = ({ open, handleClose, title, content, modalId }) => {

  const dialogContentWithProps = React.cloneElement(content, { onCancel: handleClose});

  return (
    <Dialog open={open} onClose={handleClose} aria-labelledby={modalId} sx={{ 
      '& .MuiDialog-paper': { 
        width: {xs: '100%', md: '50%'}, 
        maxWidth: 'none',
      } 
    }}>
      <div className="bg-neutral-100">
        <DialogTitle id={modalId} sx={{padding:"1.5rem 2rem"}}>Añadir {title}</DialogTitle>
        <DialogContent sx={{padding:"1rem 2rem"}}>
          {dialogContentWithProps}
          </DialogContent>
      </div>
    </Dialog>
  );
};

export default DialogBase;