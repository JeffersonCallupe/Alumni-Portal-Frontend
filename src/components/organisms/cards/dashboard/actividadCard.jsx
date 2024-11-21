import React, { useEffect } from 'react';
import { Card, CardHeader, CardMedia, CardContent, CardActions, Avatar, IconButton, Typography } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import FavoriteIcon from '@mui/icons-material/Favorite';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import ShareIcon from '@mui/icons-material/Share';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { getProfilePicture } from '../../../../hooks/manageImageUser';

const ActividadCard = ({ actividad, multimediaApi, onEdit, onDelete }) => {
  const { id, title, description, eventType, startDate, endDate, location, enrollable, userRole } = actividad;

  // Detectamos si es un usuario o una compañía
  const isUser = userRole === 'USER';
  const entityId = isUser ? actividad.userId : actividad.companyId;
  const entityName = isUser
    ? `${actividad.userName} ${actividad.userPaternalSurname} ${actividad.userMaternalSurname}`
    : actividad.companyName;
  const profileApi = `${import.meta.env.VITE_API_URL}/api/image/download-${isUser ? 'user' : 'company'}`;

  const [profileImage, setProfileImage] = React.useState(null);
  const [multimedia, setMultimedia] = React.useState(null);

  useEffect(() => {
    const fetchProfilePicture = async () => {
      try {
        const imageUrl = await getProfilePicture(profileApi, entityId);
        setProfileImage(imageUrl);
      } catch (error) {
        console.error('noai foto de perfil:', error);
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

  const handleDelete = async () => {
    try {
      await onDelete(id);
    } catch (error) {
      console.error("Error al eliminar la actividad:", error);
    }
  }

  return (
    <Card sx={{ 
      textAlign: 'left',
      borderRadius: "8px",
      boxShadow: "none",
      padding: "0.75rem",
      margin: "0.5rem 0"
    }}>
      <CardHeader
        avatar={
          <Avatar aria-label="profile-pic">
            {profileImage ? <img src={profileImage} alt="Profile pic" /> : <AccountCircleIcon sx={{ width: '100%', height: '100%' }}/>}
          </Avatar>
        }
        action={
          <>
            <IconButton aria-label="edit" onClick={() => onEdit(actividad)}>
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
        title={entityName} // Se muestra el nombre correcto
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
        {enrollable && <Typography variant="body2" color="primary">Enrollable</Typography>}
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

export default ActividadCard;