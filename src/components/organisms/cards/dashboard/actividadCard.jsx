import React, { useEffect, useState } from 'react';
import { Card, CardHeader, CardMedia, CardContent, CardActions, Avatar, Typography } from '@mui/material';
import Button from '../../../atoms/buttons/actionButton';

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
  const { userId } = useUserContext();
  const isUser = userRole === 'USER';
  const entityId = isUser ? actividad.userId : actividad.companyId;
  const entityName = isUser
    ? `${actividad.userName} ${actividad.userPaternalSurname} ${actividad.userMaternalSurname}`
    : actividad.companyName;
  const profileApi = `${import.meta.env.VITE_API_URL}/api/image/download-${isUser ? 'user' : 'company'}`;

  const [profileImage, setProfileImage] = useState(null);
  const [multimedia, setMultimedia] = useState(null);
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
  const handleDelete = () => onDelete && onDelete(id);
  const handleSeeListParticipants = () => onSeeListParticipants && onSeeListParticipants(id);
  const handleRegister = () => onRegister && onRegister(id, userId);
  const handleCancelEnrollment = () => onCancelEnrollment && onCancelEnrollment(id);

  return (
    <Card
      sx={{ 
        textAlign: 'left', 
        borderRadius: "8px", 
        boxShadow: "none", 
        padding: "0.75rem", 
        margin: "0.5rem 0" 
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
            {onEdit && <Button startIcon={<ModeEditIcon />} texto={"Editar"} onClick={handleEdit}></Button>}
            {onDelete && <Button startIcon={<DeleteIcon />} texto={"Eliminar"} onClick={handleDelete}></Button>}
            {onCancelEnrollment && <Button texto={"Cancelar inscripción"} onClick={handleCancelEnrollment}></Button>}
          </div>
        }
        title={`${title} (${eventType})`}
        subheader={`${entityName}`}
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
      <Typography variant="body2" sx={{ color: 'text.primary' }}>
        {`Inicio: ${formatDate(startDate)} | Fin: ${formatDate(endDate)}`}
      </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          {description}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          {location}
        </Typography>
        {enrollable && (
          <Typography variant="body2" color="primary">
            Enrollable
          </Typography>
        )}
      </CardContent>
      <CardActions disableSpacing>
        <div style={{ display: 'flex', justifyContent: 'flex-end', width: '100%' }}>
          {onSeeListParticipants && <Button startIcon={<VisibilityIcon/>} texto={"Ver participantes"} onClick={handleSeeListParticipants}></Button>}
          {onRegister && <Button texto={"Registrarse"} onClick={handleRegister}></Button>}
        </div>
      </CardActions>
      
    </Card>
  );
};

export default ActividadCard;