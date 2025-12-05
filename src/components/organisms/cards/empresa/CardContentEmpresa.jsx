import React from "react";
import Box from "@mui/material/Box";
import EditButton from "../../../atoms/buttons/editButton";
import DialogBase from "../../dialog/DialogBase";
import FormHeader from "../../forms/empresa/formHeader";
import Typography from "@mui/material/Typography";
import { useUserContext } from "../../../../contexts/userContext";
import useModal from "../../../../hooks/useModal";
import useCompanyFollowerStats from "../../../../hooks/useCompanyFollowerStats";
import FollowersModal from "../../dialog/FollowersModal";
import { useState, useEffect } from "react";
import BusinessIcon from '@mui/icons-material/Business';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import BadgeIcon from '@mui/icons-material/Badge';

/**
 * Componente que muestra el contenido de la tarjeta de perfil de empresa
 * @param {Object} props - Propiedades del componente
 * @param {boolean} props.loading - Estado de carga
 * @param {Function} props.onSubmit - Función a ejecutar al enviar el formulario
 */
const CardContentEmpresa = ({ loading, onSubmit }) => {
  const { open, handleOpen, handleClose } = useModal();
  const { userData } = useUserContext();
  const { stats, followers, loading: followLoading, fetchFollowersCount, fetchFollowers } = useCompanyFollowerStats();
  const [followersModalOpen, setFollowersModalOpen] = useState(false);

  useEffect(() => {
    if (userData?.id) {
      fetchFollowersCount(userData.id);
    }
  }, [userData, fetchFollowersCount]);

  const handleFollowersClick = async () => {
    if (userData?.id) {
      await fetchFollowers(userData.id);
      setFollowersModalOpen(true);
    }
  };

  const contentHeader = (
    <FormHeader
      onSubmit={onSubmit}
      onCancel={handleClose}
      loading={loading}
    />
  );

  return (
    <div className="flex flex-col md:flex-row justify-between gap-4">
      <div className="flex flex-col flex-1 gap-3">
        {/* Nombre de la empresa */}
        <Typography
          variant="h4"
          align="left"
          sx={{
            fontWeight: 700,
            color: '#111827',
            fontSize: { xs: '1.5rem', md: '2rem' },
          }}
        >
          {userData.name || "Nombre de la Empresa"}
        </Typography>

        {/* Sector */}
        {userData.sector && (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <BusinessIcon sx={{ fontSize: 20, color: '#6F191C' }} />
            <Typography
              variant="body1"
              align="left"
              sx={{
                color: '#4B5563',
                fontSize: '0.9375rem',
              }}
            >
              {userData.sector}
            </Typography>
          </Box>
        )}

        {/* Locación */}
        {userData.location && (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <LocationOnIcon sx={{ fontSize: 20, color: '#6B7280' }} />
            <Typography
              variant="body1"
              align="left"
              sx={{
                color: '#4B5563',
                fontSize: '0.9375rem',
              }}
            >
              {userData.location}
            </Typography>
          </Box>
        )}

        {/* RUC */}
        {userData.ruc && (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <BadgeIcon sx={{ fontSize: 20, color: '#6B7280' }} />
            <Typography
              variant="body2"
              align="left"
              sx={{
                color: '#6B7280',
                fontSize: '0.875rem',
              }}
            >
              RUC: {userData.ruc}
            </Typography>
          </Box>
        )}

        {/* Followers Stats - Social Media Style */}
        <Box
          onClick={handleFollowersClick}
          sx={{
            cursor: 'pointer',
            padding: '0.5rem 0',
            marginTop: '0.75rem',
            transition: 'opacity 0.2s',
            '&:hover': {
              opacity: 0.7,
            }
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 700,
                color: '#111827',
                fontSize: '1rem',
              }}
            >
              {stats.followersCount}
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color: '#6B7280',
                fontSize: '0.875rem',
                fontWeight: 400,
              }}
            >
              Seguidores
            </Typography>
          </Box>
        </Box>
      </div>

      {/* Botón de edición */}
      <div className="flex flex-col items-end">
        <Box
          sx={{
            zIndex: 1,
            position: "relative",
            bottom: { xs: 0, md: "1rem" },
            marginRight: { xs: 0, md: "0.3rem" },
          }}
        >
          <EditButton onClick={handleOpen} />
        </Box>
      </div>

      {/* Modal para editar perfil */}
      <DialogBase
        open={open}
        handleClose={handleClose}
        title="Información de la Empresa"
        content={contentHeader}
        modalId="modal-profile"
      />

      {/* Followers Modal */}
      <FollowersModal
        open={followersModalOpen}
        onClose={() => setFollowersModalOpen(false)}
        followers={followers}
        loading={followLoading}
      />
    </div>
  );
};

export default CardContentEmpresa;
