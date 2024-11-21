import React from "react";
import { Card, CardHeader, CardContent, CardActions, Avatar, IconButton, Typography } from "@mui/material";
import BusinessIcon from "@mui/icons-material/Business";
import FavoriteIcon from "@mui/icons-material/Favorite";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import ShareIcon from "@mui/icons-material/Share";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useUserContext } from "../../../../contexts/userContext";

const OfertaLaboralCard = ({ oferta, onEdit, onDelete }) => {
  const { id, title, description, area, nivel, modality, minSalary, maxSalary, companyId, companyName } = oferta;
  const { profilePicture } = useUserContext();

  const handleDelete = async () => {
    try {
      await onDelete(id);
    } catch (error) {
      console.error("Error al eliminar la oferta laboral:", error);
    }
  };

  return (
    <Card
      sx={{
        textAlign: "left",
        borderRadius: "8px",
        boxShadow: "none",
        padding: "0.75rem",
        margin: "0.5rem 0",
      }}
    >
      <CardHeader
        avatar={
          <Avatar aria-label="company-logo">
            {profilePicture ? (
              <img src={profilePicture} alt="Company Logo" />
            ) : (
              <BusinessIcon sx={{ width: "100%", height: "100%" }} />
            )}
          </Avatar>
        }
        action={
          <>
            <IconButton aria-label="edit" onClick={() => onEdit(oferta)}>
              <EditIcon />
            </IconButton>
            <IconButton aria-label="delete" onClick={handleDelete}>
              <DeleteIcon />
            </IconButton>
            <IconButton aria-label="settings">
              <MoreVertIcon />
            </IconButton>
          </>
        }
        title={companyName}
        subheader={`${area} | ${nivel} | ${modality}`}
      />
      <CardContent>
        <Typography variant="h6" sx={{ marginBottom: "8px" }}>
          {title}
        </Typography>
        <Typography variant="body2" sx={{ marginBottom: "8px", color: "text.secondary" }}>
          {description}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          <strong>Salario:</strong> S/.{minSalary} - S/.{maxSalary}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
};

export default OfertaLaboralCard;
