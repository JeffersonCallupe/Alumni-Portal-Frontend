import React, { useEffect, useState } from 'react';
import { Card, CardHeader, CardMedia, CardContent, CardActions, Avatar, Typography, Box, IconButton, Menu, MenuItem } from '@mui/material';
import Button from '../../../atoms/buttons/ActionButton';
import DeleteConfirmationModal from "../../dialog/DeleteConfirmationModal";
import ParticipantsDialog from '../../dialog/ParticipantsDialog';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import VisibilityIcon from '@mui/icons-material/VisibilityOutlined';
import DeleteIcon from '@mui/icons-material/Delete';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { getProfilePicture } from '../../../../hooks/manageImageUser';
import { useUserContext } from '../../../../contexts/userContext';
import CompanyProfileModal from '../../../molecules/modals/CompanyProfileModal';

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
  const [companyModalOpen, setCompanyModalOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const openMenu = Boolean(anchorEl);

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

  const handleEdit = () => {
    setAnchorEl(null);
    onEdit && onEdit(actividad);
  };
  const handleDelete = () => {
    setAnchorEl(null);
    setIsModalOpen(true);
  };
  const handleConfirmDelete = () => {
    setIsModalOpen(false);
    onDelete && onDelete(id);
  }
  const handleSeeListParticipants = () => {
    setAnchorEl(null);
    onSeeListParticipants && onSeeListParticipants(id);
  };
  const handleRegister = () => onRegister && onRegister(id, userId);
  const handleCancelEnrollment = () => onCancelEnrollment && onCancelEnrollment(id);
  const handleMenuOpen = (event) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);


  return (
    <>
      <Card
        sx={{
          textAlign: 'left',
          borderRadius: "8px",
          boxShadow: "none",
          padding: "0.75rem",
          margin: "0.5rem 0",
          marginBottom: "1rem"
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
            <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
              {/* Botones de acción primaria (Registrarse, Cancelar) */}
              {onCancelEnrollment && <Button texto={"Cancelar inscripción"} onClick={handleCancelEnrollment}></Button>}
              {isInstitutional && onRegister && <Button texto={"Registrarse"} onClick={handleRegister}></Button>}

              {/* Menú de tres puntos para acciones secundarias */}
              {(onSeeListParticipants || onEdit || onDelete) && (
                <>
                  <IconButton
                    aria-label="more options"
                    aria-controls={openMenu ? 'activity-menu' : undefined}
                    aria-haspopup="true"
                    onClick={handleMenuOpen}
                    sx={{
                      padding: '8px',
                      '&:hover': {
                        backgroundColor: 'rgba(0, 0, 0, 0.04)'
                      }
                    }}
                  >
                    <MoreVertIcon />
                  </IconButton>
                  <Menu
                    id="activity-menu"
                    anchorEl={anchorEl}
                    open={openMenu}
                    onClose={handleMenuClose}
                    anchorOrigin={{
                      vertical: 'bottom',
                      horizontal: 'right',
                    }}
                    transformOrigin={{
                      vertical: 'top',
                      horizontal: 'right',
                    }}
                    PaperProps={{
                      sx: {
                        boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
                        borderRadius: '8px',
                        minWidth: '180px'
                      }
                    }}
                  >
                    {onSeeListParticipants && (
                      <MenuItem
                        onClick={handleSeeListParticipants}
                        sx={{
                          fontSize: '0.875rem',
                          padding: '10px 16px',
                          gap: 1.5
                        }}
                      >
                        <VisibilityIcon fontSize="small" />
                        Ver participantes
                      </MenuItem>
                    )}
                    {onEdit && (
                      <MenuItem
                        onClick={handleEdit}
                        sx={{
                          fontSize: '0.875rem',
                          padding: '10px 16px',
                          gap: 1.5
                        }}
                      >
                        <ModeEditIcon fontSize="small" />
                        Editar
                      </MenuItem>
                    )}
                    {onDelete && (
                      <MenuItem
                        onClick={handleDelete}
                        sx={{
                          fontSize: '0.875rem',
                          padding: '10px 16px',
                          gap: 1.5,
                          color: '#EF4444'
                        }}
                      >
                        <DeleteIcon fontSize="small" />
                        Eliminar
                      </MenuItem>
                    )}
                  </Menu>
                </>
              )}
            </div>
          }
          title={
            <Typography
              variant="subtitle1"
              sx={{
                fontWeight: 600,
                ...(actividad.companyId && {
                  cursor: 'pointer',
                  '&:hover': {
                    color: '#3B82F6',
                    textDecoration: 'underline',
                  },
                }),
              }}
              onClick={() => actividad.companyId && setCompanyModalOpen(true)}
            >
              {entityName}
            </Typography>
          }
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
          {/* Título y tipo de evento en la misma línea */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, marginBottom: '1rem', flexWrap: 'wrap' }}>
            <Typography
              variant="h5"
              sx={{
                fontSize: '1.25rem',
                fontWeight: 600,
                color: 'text.primary',
              }}
            >
              {title}
            </Typography>
            <Typography
              component="span"
              sx={{
                display: 'inline-block',
                backgroundColor: '#6F191C',
                color: 'white',
                padding: '2px 10px',
                borderRadius: '12px',
                fontSize: '0.7rem',
                fontWeight: 500,
                textTransform: 'uppercase',
                letterSpacing: '0.3px'
              }}
            >
              {eventType}
            </Typography>
          </Box>

          {/* Descripción */}
          <Typography
            variant="body2"
            sx={{
              color: 'text.secondary',
              marginBottom: '1rem',
              lineHeight: 1.6
            }}
          >
            {description}
          </Typography>

          {/* Divider sutil */}
          <Box sx={{
            borderTop: '1px solid #E0E0E0',
            marginY: '1rem'
          }} />

          {/* Información de fechas y ubicación en formato compacto */}
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.75 }}>
            {/* Fechas en una sola fila */}
            <Box sx={{ display: 'flex', gap: 3, flexWrap: 'wrap' }}>
              <Box sx={{ display: 'flex', gap: 0.5 }}>
                <Typography
                  variant="body2"
                  sx={{
                    fontWeight: 600,
                    color: 'text.primary',
                  }}
                >
                  Inicio:
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {formatDate(startDate)}
                </Typography>
              </Box>

              <Box sx={{ display: 'flex', gap: 0.5 }}>
                <Typography
                  variant="body2"
                  sx={{
                    fontWeight: 600,
                    color: 'text.primary',
                  }}
                >
                  Fin:
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {formatDate(endDate)}
                </Typography>
              </Box>
            </Box>

            {/* Ubicación */}
            <Box sx={{ display: 'flex', gap: 0.5 }}>
              <Typography
                variant="body2"
                sx={{
                  fontWeight: 600,
                  color: 'text.primary',
                }}
              >
                Ubicación:
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {location}
              </Typography>
            </Box>

            {/* Badge de inscripciones abiertas - más pequeño */}
            {enrollable && (
              <Box sx={{ marginTop: '0.5rem' }}>
                <Typography
                  component="span"
                  sx={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 0.5,
                    backgroundColor: '#10B981',
                    color: 'white',
                    padding: '3px 10px',
                    borderRadius: '12px',
                    fontSize: '0.7rem',
                    fontWeight: 600,
                    boxShadow: '0 1px 3px rgba(16, 185, 129, 0.3)'
                  }}
                >
                  <span>✓</span>
                  <span>Inscripciones Abiertas</span>
                </Typography>
              </Box>
            )}
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

      {/* Modal de perfil de empresa - solo para actividades de empresas */}
      {actividad.companyId && (
        <CompanyProfileModal
          open={companyModalOpen}
          onClose={() => setCompanyModalOpen(false)}
          companyId={actividad.companyId}
        />
      )}
    </>
  );
};

export default ActividadCard;