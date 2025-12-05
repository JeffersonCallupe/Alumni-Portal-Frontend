import React from "react";
import "../../../../App.css";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import DialogBase from "../../dialog/DialogBase";
import EditButton from "../../../atoms/buttons/editButton";
import AddButton from "../../../atoms/buttons/addButton";
import Typography from "@mui/material/Typography";
import useModal from "../../../../hooks/useModal";

const InfoBaseCard = ({ title, cardContent, dialogContent, modalId, sub = false, content = false }) => {
  const { open, handleOpen, handleClose } = useModal();

  return (
    <Card
      className="profile-base-card"
      sx={{
        width: sub
          ? { xs: "65vw", md: "50vw" }
          : { xs: "70vw", md: "55vw" },
        padding: "1.5rem",
        borderRadius: '12px',
        boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
        border: '1px solid #E5E7EB',
        marginBottom: '1rem',
        '&:hover': {
          boxShadow: '0 2px 8px rgba(0,0,0,0.12)',
        },
        transition: 'box-shadow 0.2s',
      }}
    >
      <CardContent sx={{ padding: 0 }}>
        <div className="flex flex-row justify-between items-center mb-4">
          <Typography
            variant="h5"
            align="left"
            sx={{
              fontWeight: 600,
              fontSize: '1.25rem',
              color: '#111827',
            }}
          >
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
            border: sub || content ? "none" : "1px solid #F3F4F6",
            borderRadius: sub ? "0px" : "8px",
            boxShadow: "none",
            padding: sub ? "0.03rem" : "1rem",
            margin: sub ? "0.3rem 0" : "0",
            backgroundColor: sub || content ? 'transparent' : '#FAFAFA',
          }}
        >
          {cardContent}
        </Card>
      </CardContent>

      <DialogBase
        open={open}
        handleClose={handleClose}
        title={sub ? false : content ? `Añadir ${title}` : `Editar ${title}`}
        content={dialogContent}
        modalId={modalId}
      />
    </Card>
  );
};

export default InfoBaseCard;
