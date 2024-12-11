import React from "react";
import "../../../../App.css";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import DialogBase from "../../dialog/DialogBase";
import EditButton from "../../../atoms/buttons/EditButton";
import AddButton from "../../../atoms/buttons/AddButton";
import Typography from "@mui/material/Typography";
import useModal from "../../../../hooks/useModal";

const InfoBaseCard = ({ title, cardContent, dialogContent, modalId,sub=false,content=false}) => {
  const { open, handleOpen, handleClose } = useModal();

  return (
    <Card
      className="profile-base-card"
      sx={{
        width: sub
        ? { xs: "65vw", md: "50vw" }
        : { xs: "70vw", md: "55vw" },
        padding: "0.75rem 0.75rem 0 0.75rem",
      }}
    >
      <CardContent>
        <div className="flex flex-row justify-between">
          <Typography variant="h5" align="left">
            {title}
          </Typography>
          <CardActions sx={{ padding: "0" }}>
            {content && <AddButton onClick={handleOpen}>Añadir</AddButton>}
            {!content && <EditButton onClick={handleOpen}>Editar</EditButton>}
          </CardActions>
        </div>
        <Card
          align="left"
          sx={{
            border: sub || content ? "none" : "1px solid #e5e5e5", // Condicional para la propiedad 'border'
            borderRadius: sub ? "0px" : "8px",          // Condicional para la propiedad 'borderRadius'
            boxShadow: "none",
            padding: sub ? "0.03remx" : "0.75rem 0.60rem 0.60rem 0.60rem",
            margin: sub ? "0.3rem 0" : "0.5rem 0",
          }}
        >
          {cardContent}
        </Card>
      </CardContent>

      <DialogBase
        open={open}
        handleClose={handleClose}
        title={sub ? false : content ? `Añadir ${title}`:`Editar ${title}`} // Condicional para la propiedad 'title'
        content={dialogContent}
        modalId={modalId}
      />
    </Card>
  );
};

export default InfoBaseCard;