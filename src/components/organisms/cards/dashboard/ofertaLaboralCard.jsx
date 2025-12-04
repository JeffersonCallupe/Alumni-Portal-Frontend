import React, { useEffect, useState } from 'react';
import { Card, CardHeader, CardContent, CardActions, Avatar, IconButton, Typography, Box, Grid } from "@mui/material";
import Button from '../../../atoms/buttons/ActionButton';
import DeleteConfirmationModal from "../../dialog/DeleteConfirmationModal";
import BusinessIcon from "@mui/icons-material/Business";
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import VisibilityIcon from '@mui/icons-material/VisibilityOutlined';
import DeleteIcon from '@mui/icons-material/Delete';
import FavoriteIcon from "@mui/icons-material/Favorite";
import EditIcon from "@mui/icons-material/Edit";
import ShareIcon from "@mui/icons-material/Share";
import { useUserContext } from "../../../../contexts/userContext";

const OfertaLaboralCard = ({ 
  oferta, 
  onEdit=false, 
  onDelete=false,
  onCancelApplication=false,
  onApplication=false,
  onSeeListPostulants=false, 
}) => {
  const { id, title, description, area, nivel, modality, minSalary, maxSalary, companyId, experience, companyName, vacancies, workload, companyEmail, companyPhone, companyRuc,createdAt } = oferta;
  const { userId, isInstitutional } = useUserContext();
  const { profilePicture } = useUserContext();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleEdit = () => onEdit && onEdit(oferta);
  const handleDelete = () => setIsModalOpen(true);
  const handleConfirmDelete = () => {
    setIsModalOpen(false);
    onDelete && onDelete(id);
  }
  const handleSeeListPostulants = () => onSeeListPostulants && onSeeListPostulants(id);
  const handleApplication = () => onApplication && onApplication(id, userId);
  const handleCancelAplication = () => onCancelApplication && onCancelApplication(id);

  return (
    <>
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
          <div style={{ display: 'flex', gap: '10px' }}>
            {onSeeListPostulants && <Button startIcon={<VisibilityIcon/>} texto={"Ver postulantes"} onClick={handleSeeListPostulants}></Button>}
            {onEdit && <Button startIcon={<ModeEditIcon />} texto={"Editar"} onClick={handleEdit}></Button>}
            {onDelete && <Button startIcon={<DeleteIcon />} texto={"Eliminar"} onClick={handleDelete}></Button>}
            {onCancelApplication && <Button texto={"Cancelar postulación"} onClick={handleCancelAplication}></Button>}
            {isInstitutional && onApplication && <Button texto={"Postular"} onClick={handleApplication}></Button>}
          </div>
        }
        title={companyName}
        subheader={`RUC: ${companyRuc}`}
      />
      <CardContent>
        <Typography variant="h6" sx={{ fontSize: '1.2rem' }}>
          {`${title} (Vacantes: ${vacancies})`}
        </Typography>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, mt: 1 }}>
          <Typography variant="body2" color="textPrimary">
          <strong>Área:</strong> {area} | <strong>Nivel:</strong> {nivel} | <strong>Modalidad:</strong> {modality}
          </Typography>
          <Grid container spacing={2} sx={{ marginTop: 0 }}>
            {/* Columna Izquierda */}
            <Grid item xs={12} md={6}>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                <Typography variant="body2" color="textSecondary">
                  <strong>Fecha de publicación:</strong> {createdAt}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  <strong>Experiencia:</strong> {experience} año(s)
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  <strong>Salario:</strong> S/.{minSalary} - S/.{maxSalary}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  <strong>Carga horaria semanal:</strong> {workload} hora(s)
                </Typography>
              </Box>
            </Grid>

            {/* Columna Derecha */}
            <Grid item xs={12} md={6}>
              <Typography variant="body2" color="textSecondary">
                <strong>Descripción:</strong>
              </Typography>
              <Typography
                variant="body2"
                sx={{ marginBottom: "8px", color: "text.secondary" }}
              >
                {description}
              </Typography>
            </Grid>
          </Grid>
        </Box>
      </CardContent>
      <CardActions disableSpacing>
        
      </CardActions>
    </Card>
    <DeleteConfirmationModal 
      isOpen={isModalOpen}
      onClose={() => setIsModalOpen(false)}
      onConfirm={handleConfirmDelete}
      title="Confirmar eliminación"
      message="¿Está seguro de que desea eliminar esta oferta laboral? Esta acción no se puede deshacer."
    />
    </>
  );
};

export default OfertaLaboralCard;
