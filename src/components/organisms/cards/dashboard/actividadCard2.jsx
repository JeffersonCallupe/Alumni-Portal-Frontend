import React, { useEffect, useState } from 'react';
import { Card, CardHeader, CardMedia, CardContent, CardActions, Avatar, Typography } from '@mui/material';
import Button from '../../../atoms/buttons/actionButton';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { getProfilePicture } from '../../../../hooks/manageImageActivity';
import { useUserContext } from '../../../../contexts/userContext';

const ActividadCard2 = ({ 
  actividad, 
  enrollmentId, 
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
      try {
        const multimediaUrl = await getProfilePicture(multimediaApi, id);
        setMultimedia(multimediaUrl);
      } catch (error) {
        console.error('Error al obtener el contenido multimedia de la actividad:', error);
      }
    };
    fetchMultimedia();
  }, [multimediaApi, id]);

  const handleEdit = () => onEdit && onEdit(actividad);
  const handleDelete = () => onDelete && onDelete(id);
  const handleSeeListParticipants = () => onSeeListParticipants && onSeeListParticipants(id);
  const handleRegister = () => onRegister && onRegister(id, userId);
  const handleCancelEnrollment = () => onCancelEnrollment && onCancelEnrollment(enrollmentId);

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
          <>
            {onSeeListParticipants && <Button texto={"Ver participantes"} onClick={handleSeeListParticipants}></Button>}
            {onEdit && <Button texto={"Editar"} onClick={handleEdit}></Button>}
            {onDelete && <Button texto={"Eliminar"} onClick={handleDelete}></Button>}
            {onCancelEnrollment && <Button texto={"Cancelar inscripción"} onClick={handleCancelEnrollment}></Button>}
          </>
        }
        title={entityName}
        subheader={`${eventType} | ${startDate} - ${endDate}`}
      />
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
      <CardContent>
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
        {onRegister && <Button texto={"Registrar Inscripción"} onClick={handleRegister}></Button>}
      </CardActions>
    </Card>
  );
};

export default ActividadCard2;
