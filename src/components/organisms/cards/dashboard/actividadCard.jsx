import React, {useEffect} from 'react';
import { Card, CardHeader, CardMedia, CardContent, CardActions, Avatar, IconButton, Typography } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { getProfilePicture } from '../../../../hooks/manageImageUser';

const ActividadCard = ({ actividad, multimediaApi }) => {
  const { id, title, description, eventType, startDate, endDate, location, enrollable, userId, userRole, userName, userPaternalSurname, userMaternalSurname} = actividad;
  const [profileImage, setProfileImage] = React.useState(null);
  const [multimedia, setMultimedia] = React.useState(null);
  const usertype = userRole === 'USER' ? 'user' : 'company';
  const profileApi = `${import.meta.env.VITE_API_URL}/api/image/download-${usertype}`;

  useEffect(() => {
    const fetchProfilePicture = async () => {
        try {
            const imageUrl = await getProfilePicture(profileApi, userId);
            setProfileImage(imageUrl);
        } catch (error) {
            console.error('Error al obtener la imagen de perfil:', error);
        }
    };
    fetchProfilePicture();
  }, [profileApi, actividad]);

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
  }, [multimediaApi, actividad]);

  return (
    <Card sx={{ textAlign: 'left'}}>
      <CardHeader
        avatar={
          <Avatar aria-label="profile-pic">
            <img src={profileImage} alt="Profile pic" />
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={[userName, userPaternalSurname, userMaternalSurname].join(' ')}
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