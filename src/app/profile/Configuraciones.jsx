import React from "react";
import { Box, Card, Typography, Divider } from "@mui/material";
import LockIcon from '@mui/icons-material/Lock';
import FormPassword from "../../components/organisms/forms/empresa/formPassword";
import HomeBase from "../../components/templates/home/HomeBase";
import { useUserContext } from "../../contexts/userContext";

function Configuraciones() {
  const { userData } = useUserContext();

  if (!userData) {
    return <div>Loading...</div>;
  }

  return (
    <HomeBase>
      <Box
        sx={{
          maxWidth: '900px',
          margin: '0 auto',
          padding: { xs: '1.5rem', md: '3rem' },
          minHeight: 'calc(100vh - 200px)',
        }}
      >
        {/* Header */}
        <Box sx={{ mb: 4 }}>
          <Typography
            variant="h4"
            sx={{
              fontWeight: 700,
              color: '#000',
              mb: 1,
              fontSize: { xs: '1.75rem', md: '2rem' },
            }}
          >
            Configuración de Cuenta
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: '#6B7280',
              fontSize: '1rem',
            }}
          >
            Administra tu seguridad y preferencias de cuenta
          </Typography>
        </Box>

        {/* Password Change Section */}
        <Card
          sx={{
            mb: 3,
            borderRadius: '12px',
            border: '1px solid #E5E7EB',
            boxShadow: 'none',
            '&:hover': {
              boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
            },
            transition: 'box-shadow 0.2s',
          }}
        >
          <Box sx={{ p: 3 }}>
            {/* Section Header */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2 }}>
              <Box
                sx={{
                  width: 40,
                  height: 40,
                  borderRadius: '8px',
                  backgroundColor: '#FEF2F2',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <LockIcon sx={{ color: '#6F191C', fontSize: 20 }} />
              </Box>
              <Box>
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 600,
                    fontSize: '1.125rem',
                    color: '#111827',
                  }}
                >
                  Cambiar Contraseña
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    color: '#6B7280',
                    fontSize: '0.875rem',
                  }}
                >
                  Actualiza tu contraseña para mantener tu cuenta segura
                </Typography>
              </Box>
            </Box>

            <Divider sx={{ my: 2 }} />

            {/* Password Form */}
            <FormPassword userId={userData.id} onCancel={() => { }} />
          </Box>
        </Card>
      </Box>
    </HomeBase>
  );
}

export default Configuraciones;
