import React, { useEffect, useState } from 'react';
import { Card, CardHeader, CardMedia, CardContent, CardActions, Avatar, Typography, Grid, Box } from '@mui/material';
import Button from '../../../atoms/buttons/actionButton';
import DeleteConfirmationModal from "../../dialog/deleteConfirmationDialog";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import VisibilityIcon from '@mui/icons-material/VisibilityOutlined';
import DeleteIcon from '@mui/icons-material/Delete';
import { getProfilePicture } from '../../../../hooks/manageImageUser';
import { useUserContext } from '../../../../contexts/userContext';

const ActividadCard = ({ 
  actividad,  
  multimediaApi, 
  onEdit = false, 
  onDelete = false, 
  onCancelEnrollment = false, 
  onRegister = false, 
  onSeeListParticipants = false 
}) => {
  const { id, title, description, eventType, startDate, endDate, location, enrollable, userRole } = actividad;
  const { userId, isInstitutional } = useUserContext();
  const isUser = userRole === 'USER';
  const entityId = isUser ? actividad.userId : actividad.companyId;
  const entityName = isUser
    ? `${actividad.userName} ${actividad.userPaternalSurname} ${actividad.userMaternalSurname}`
    : actividad.companyName;
  const profileApi = `${import.meta.env.VITE_API_URL}/api/image/download-${isUser ? 'user' : 'company'}`;

  const [profileImage, setProfileImage] = useState(null);
  const [multimedia, setMultimedia] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const formatDate = (date) => {
    const d = new Date(date);
    const day = String(d.getDate()).padStart(2, '0');  // Asegura que el día tenga dos dígitos
    const month = String(d.getMonth() + 1).padStart(2, '0');  // Los meses comienzan en 0, así que sumamos 1
    const year = d.getFullYear();
    return `${day}-${month}-${year}`;
  };

  useEffect(() => {
    const fetchProfilePicture = async () => {
      try {
        const imageUrl = await getProfilePicture(profileApi, entityId);
        setProfileImage(imageUrl);
      } catch (error) {
        console.error('Error al obtener la imagen de perfil:', error);
      }
    };
    fetchProfilePicture();
  }, [profileApi, entityId]);

  useEffect(() => {
    const fetchMultimedia = async () => {
      if (multimediaApi) { // Solo intenta obtener multimedia si la URL está definida
        try {
          const multimediaUrl = await getProfilePicture(multimediaApi, id);
          setMultimedia(multimediaUrl);
        } catch (error) {
          console.error('Error al obtener el contenido multimedia de la actividad:', error);
          setMultimedia(null); // Asegúrate de manejar el error correctamente
        }
      }
    };
    fetchMultimedia();
  }, [multimediaApi, id]);

  const handleEdit = () => onEdit && onEdit(actividad);
  const handleDelete = () => setIsModalOpen(true);
  const handleConfirmDelete = () => {
    setIsModalOpen(false);
    onDelete && onDelete(id);
  }
  const handleSeeListParticipants = () => onSeeListParticipants && onSeeListParticipants(id);
  const handleRegister = () => onRegister && onRegister(id, userId);
  const handleCancelEnrollment = () => onCancelEnrollment && onCancelEnrollment(id);


  return (
    <>
    <Card
      sx={{ 
        textAlign: 'left', 
        borderRadius: "8px", 
        boxShadow: "none", 
        padding: "0.75rem", 
        margin: "0.5rem 0", 
        marginBottom:"1rem"
      }}
    >
      <CardHeader
        avatar={
          <Avatar aria-label="profile-pic">
            {profileImage ? (
              <img src={profileImage} alt="Profile pic" />
            ) : (
              <AccountCircleIcon sx={{ width: '100%', height: '100%' }} />
            )}
          </Avatar>
        }
        action={
          <div style={{ display: 'flex', gap: '10px' }}>
            {onSeeListParticipants && <Button startIcon={<VisibilityIcon/>} texto={"Ver participantes"} onClick={handleSeeListParticipants}></Button>}
            {onEdit && <Button startIcon={<ModeEditIcon />} texto={"Editar"} onClick={handleEdit}></Button>}
            {onDelete && <Button startIcon={<DeleteIcon />} texto={"Eliminar"} onClick={handleDelete}></Button>}
            {onCancelEnrollment && <Button texto={"Cancelar inscripción"} onClick={handleCancelEnrollment}></Button>}
            {isInstitutional && onRegister && <Button texto={"Registrarse"} onClick={handleRegister}></Button>}
          </div>
        }
        title={`${entityName}`}
        subheader={isUser ? `Estudiante` : `Empresa`}
      />
      {multimedia && (
        <CardMedia
          component="img"
          image={multimedia}
          alt={title}
          sx={{
            width: 'auto',
            height: 'auto',
            maxWidth: '80%',
            justifySelf: 'center',
          }}
        />
        )}
      <CardContent>
      <Typography variant="h6" sx={{ fontSize: '1.2rem' }}>
        {`${title}`}
        </Typography>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, mt: 1 }}>
          <Grid container spacing={2} sx={{ marginTop: 0 }}>
            {/* Columna Izquierda */}
            <Grid item xs={12} md={6}>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                <Typography variant="body2" color="textSecondary">
                  <strong>Tipo de evento:</strong> {eventType}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  <strong>Fecha:</strong> {startDate} | {endDate}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  <strong>Ubicación:</strong> {location}
                </Typography>
                {enrollable && (
                  <Typography variant="body2" color="primary">
                    Inscripciones Abiertas
                  </Typography>
                )}
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
      message="¿Está seguro de que desea eliminar esta actividad? Esta acción no se puede deshacer."
    />
    </>
  );
};

export default ActividadCard;