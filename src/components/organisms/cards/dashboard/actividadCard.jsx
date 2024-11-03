import React from 'react';
import { Card, CardHeader, CardMedia, CardContent, CardActions, Avatar, IconButton, Typography } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import MoreVertIcon from '@mui/icons-material/MoreVert';

const ActividadCard = ({ actividad }) => {
  const { title, description, eventType, startDate, endDate, location, url, enrollable } = actividad;

  return (
    <Card>
      <CardHeader
        avatar={
          <Avatar aria-label="profile-pic">
            <img src="https://i.pinimg.com/236x/2f/97/f0/2f97f05b32547f54ef1bdf99cd207c90.jpg" alt="Profile pic" />
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={title}
        subheader={`${eventType} | ${startDate} - ${endDate}`}
      />
      <CardMedia
        component="img"
        height="194"
        image={url}
        alt={title}
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
