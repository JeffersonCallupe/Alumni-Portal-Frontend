import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";

const DialogBase = ({ open, handleClose, content, modalId }) => {

  const dialogContentWithProps = React.cloneElement(content, { onCancel: handleClose});

  return (
    <Dialog open={open} onClose={handleClose} aria-labelledby={modalId} sx={{ 
      '& .MuiDialog-paper': { 
        width: {xs: '100%', md: '50%'}, 
        maxWidth: 'none',
      } 
    }}>
      <div className="bg-neutral-100">
        <DialogContent sx={{padding:"1rem 2rem"}}>
          {dialogContentWithProps}
          </DialogContent>
      </div>
    </Dialog>
  );
};

export default DialogBase;