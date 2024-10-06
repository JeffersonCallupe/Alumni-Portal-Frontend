import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

const DialogBase = ({
  open,
  handleClose,
  title,
  content,
}) => {
  return (
    <Dialog open={open} onClose={handleClose} sx={{ 
      '& .MuiDialog-paper': { 
        width: {xs: '100%', md: '50%'}, 
        maxWidth: 'none',
      } 
    }}>
      <div className="bg-neutral-100">
        <DialogTitle sx={{padding:"1.5rem 2rem"}}>Editar {title}</DialogTitle>
        <DialogContent sx={{padding:"1rem 2rem"}}>
          {content}
          </DialogContent>
      </div>
    </Dialog>
  );
};

export default DialogBase;
