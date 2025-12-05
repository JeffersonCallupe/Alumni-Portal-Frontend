import React, { useEffect, useState } from 'react';
import { Card, CardHeader, CardContent, CardActions, Avatar, IconButton, Typography, Box, Menu, MenuItem } from "@mui/material";
import Button from '../../../atoms/buttons/actionButton';
import DeleteConfirmationModal from "../../dialog/DeleteConfirmationModal";
import BusinessIcon from "@mui/icons-material/Business";
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import VisibilityIcon from '@mui/icons-material/VisibilityOutlined';
import DeleteIcon from '@mui/icons-material/Delete';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useUserContext } from "../../../../contexts/userContext";
import CompanyProfileModal from '../../../molecules/modals/CompanyProfileModal';

const OfertaLaboralCard = ({
  oferta,
  onEdit = false,
  onDelete = false,
  onCancelApplication = false,
  onApplication = false,
  onSeeListPostulants = false,
}) => {
  const { id, title, description, area, nivel, modality, minSalary, maxSalary, companyId, experience, companyName, vacancies, workload, companyEmail, companyPhone, companyRuc, createdAt } = oferta;
  const { userId, isInstitutional } = useUserContext();
  const { profilePicture } = useUserContext();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [companyModalOpen, setCompanyModalOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const openMenu = Boolean(anchorEl);

  const handleEdit = () => {
    setAnchorEl(null);
    onEdit && onEdit(oferta);
  };
  const handleDelete = () => {
    setAnchorEl(null);
    setIsModalOpen(true);
  };
  const handleConfirmDelete = () => {
    setIsModalOpen(false);
    onDelete && onDelete(id);
  }
  const handleSeeListPostulants = () => {
    setAnchorEl(null);
    onSeeListPostulants && onSeeListPostulants(id);
  };
  const handleApplication = () => onApplication && onApplication(id, userId);
  const handleCancelAplication = () => onCancelApplication && onCancelApplication(id);
  const handleMenuOpen = (event) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);

  return (
    <>
      <Card
        sx={{
          textAlign: "left",
          borderRadius: "12px",
          boxShadow: "0 1px 3px rgba(0,0,0,0.08)",
          padding: "1.5rem",
          margin: "0 0 1.25rem 0",
          border: '1px solid #E5E7EB',
          transition: 'all 0.2s ease-in-out',
          '&:hover': {
            boxShadow: '0 4px 12px rgba(0,0,0,0.12)',
            transform: 'translateY(-2px)',
          },
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
            <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
              {/* Botones de acción primaria */}
              {onCancelApplication && <Button texto={"Cancelar postulación"} onClick={handleCancelAplication}></Button>}
              {isInstitutional && onApplication && <Button texto={"Postular"} onClick={handleApplication}></Button>}

              {/* Menú de tres puntos para acciones secundarias */}
              {(onSeeListPostulants || onEdit || onDelete) && (
                <>
                  <IconButton
                    aria-label="more options"
                    aria-controls={openMenu ? 'job-offer-menu' : undefined}
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
                    id="job-offer-menu"
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
                    {onSeeListPostulants && (
                      <MenuItem
                        onClick={handleSeeListPostulants}
                        sx={{
                          fontSize: '0.875rem',
                          padding: '10px 16px',
                          gap: 1.5
                        }}
                      >
                        <VisibilityIcon fontSize="small" />
                        Ver postulantes
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
                cursor: 'pointer',
                '&:hover': {
                  color: '#3B82F6',
                  textDecoration: 'underline',
                },
              }}
              onClick={() => setCompanyModalOpen(true)}
            >
              {companyName}
            </Typography>
          }
          subheader={`RUC: ${companyRuc}`}
        />


        <CardContent>
          {/* Título y vacantes en la misma línea */}
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
                backgroundColor: '#10B981',
                color: 'white',
                padding: '2px 10px',
                borderRadius: '12px',
                fontSize: '0.7rem',
                fontWeight: 500,
                textTransform: 'uppercase',
                letterSpacing: '0.3px'
              }}
            >
              {vacancies} {vacancies === 1 ? 'Vacante' : 'Vacantes'}
            </Typography>
          </Box>

          {/* Área, Nivel, Modalidad en una línea */}
          <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', marginBottom: '1rem' }}>
            <Box sx={{ display: 'flex', gap: 0.5 }}>
              <Typography variant="body2" sx={{ fontWeight: 600, color: 'text.primary' }}>
                Área:
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {area}
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', gap: 0.5 }}>
              <Typography variant="body2" sx={{ fontWeight: 600, color: 'text.primary' }}>
                Nivel:
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {nivel}
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', gap: 0.5 }}>
              <Typography variant="body2" sx={{ fontWeight: 600, color: 'text.primary' }}>
                Modalidad:
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {modality}
              </Typography>
            </Box>
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

          {/* Información detallada en formato compacto */}
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.75 }}>
            {/* Salario y experiencia en una fila */}
            <Box sx={{ display: 'flex', gap: 3, flexWrap: 'wrap' }}>
              <Box sx={{ display: 'flex', gap: 0.5 }}>
                <Typography variant="body2" sx={{ fontWeight: 600, color: 'text.primary' }}>
                  Salario:
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  S/. {minSalary} - S/. {maxSalary}
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', gap: 0.5 }}>
                <Typography variant="body2" sx={{ fontWeight: 600, color: 'text.primary' }}>
                  Experiencia:
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {experience} {experience === 1 ? 'año' : 'años'}
                </Typography>
              </Box>
            </Box>

            {/* Carga horaria y fecha */}
            <Box sx={{ display: 'flex', gap: 3, flexWrap: 'wrap' }}>
              <Box sx={{ display: 'flex', gap: 0.5 }}>
                <Typography variant="body2" sx={{ fontWeight: 600, color: 'text.primary' }}>
                  Carga horaria:
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {workload} horas/semana
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', gap: 0.5 }}>
                <Typography variant="body2" sx={{ fontWeight: 600, color: 'text.primary' }}>
                  Publicado:
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {createdAt}
                </Typography>
              </Box>
            </Box>
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

      {/* Modal de perfil de empresa */}
      <CompanyProfileModal
        open={companyModalOpen}
        onClose={() => setCompanyModalOpen(false)}
        companyId={companyId}
      />
    </>
  );
};

export default OfertaLaboralCard;

