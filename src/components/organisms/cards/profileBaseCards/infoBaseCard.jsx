import React from "react";
import "../../../../App.css";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import DialogBase from "../../dialog/profileBaseDialog";
import EditButton from "../../../atoms/buttons/editButton";
import Typography from "@mui/material/Typography";
import useModal from "../../../../hooks/useModal";

const InfoBaseCard = ({ title, cardContent, dialogContent, modalId}) => {
  const { open, handleOpen, handleClose } = useModal();

  return (
    <Card
      className="profile-base-card"
      sx={{
        width: { xs: "70vw", md: "55vw" },
        padding: "0.75rem 0.75rem 0 0.75rem",
      }}
    >
      <CardContent>
        <div className="flex flex-row justify-between">
          <Typography variant="h5" align="left">
            {title}
          </Typography>
          <CardActions sx={{ padding: "0" }}>
            <EditButton onClick={handleOpen}>Editar</EditButton>
          </CardActions>
        </div>
        <Card
          align="left"
          sx={{
            border: "1px solid #e5e5e5",
            borderRadius: "8px",
            boxShadow: "none",
            padding: "0.5rem",
          }}
        >
          {cardContent}
        </Card>
      </CardContent>

      <DialogBase
        open={open}
        handleClose={handleClose}
        title={title}
        content={dialogContent}
        modalId={modalId}
      />
    </Card>
  );
};

export default InfoBaseCard;
