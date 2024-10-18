import React from "react";
import "../../../../App.css";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import DialogBase from "../../dialog/profilebaseDialog";
import AddButton from "../../../atoms/buttons/addButton";
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
            <AddButton onClick={handleOpen}>Añadir</AddButton>
          </CardActions>
        </div>
        <Card
          align="left"
          sx={{
            border: "",
            borderRadius: "8px",
            boxShadow: "none",
            padding: "0.75rem 0.60rem 0.60rem 0.60rem",
            margin: "0.5rem 0"
          }}
        >
          {cardContent}
        </Card>
      </CardContent>

      <DialogBase
        open={open}
        handleClose={handleClose}
        title={`Añadir ${title}`}
        content={dialogContent}
        modalId={modalId}
      />
    </Card>
  );
};

export default InfoBaseCard;
