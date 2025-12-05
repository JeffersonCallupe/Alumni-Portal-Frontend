import Alert from "../../atoms/alert/alert";
import LoginForm from "../../organisms/forms/login/loginForm";
import LoginSUMForm from "../../organisms/forms/login/loginSUMForm";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import imgFondo from "../../../assets/fondoRectorado.png";
import { React, useEffect } from "react";
import { useAlert } from "../../../contexts/alertContext";
import "../../../App.css";

function LoginBase({
  imgLogo,
  backgroundImage,
  handleRedirect,
  description,
  loginRedirectUrl,
  loading,
  onSubmit,
  isSUM,
  isEmpresa,
  validate,
}) {
  const { showAlert } = useAlert();
  useEffect(() => {
    if (handleRedirect.error) {
      console.log("Error: ", handleRedirect.error);
      showAlert("Error al iniciar sesión", "error");
    } else if (handleRedirect.userData) {
      showAlert("Inicio de sesión exitoso", "success");
      if (loginRedirectUrl) {
        handleRedirect.navigate(loginRedirectUrl);
      }
    }
  }, [handleRedirect.userData, handleRedirect.error]);

  const handleLogin = (formData) => {
    onSubmit(formData);
  };

  return (
    <div className="relative min-h-screen flex flex-col">
      <Alert />

      {/* Fondo con overlay oscuro */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${imgFondo})`,
          filter: 'brightness(0.4) blur(2px)',
        }}
      ></div>

      {/* Overlay gradiente */}
      <div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(135deg, rgba(0, 0, 0, 0.85) 0%, rgba(0, 0, 0, 0.7) 100%)',
        }}
      ></div>

      {/* Contenido principal */}
      <div className="relative min-h-screen flex items-center justify-center p-4">
        <Box
          sx={{
            display: 'flex',
            width: '100%',
            maxWidth: '950px',
            minHeight: '450px',
            backgroundColor: 'white',
            borderRadius: '16px',
            overflow: 'hidden',
            boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
          }}
        >
          {/* Imagen lateral - solo en desktop */}
          <Box
            sx={{
              display: { xs: 'none', md: 'flex' },
              width: '50%',
              backgroundImage: `url(${backgroundImage})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              position: 'relative',
              '&::before': {
                content: '""',
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(135deg, rgba(111, 25, 28, 0.3) 0%, rgba(0, 0, 0, 0.2) 100%)',
              },
            }}
          />

          {/* Formulario */}
          <Box
            sx={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              padding: { xs: '32px 24px', md: '48px 64px' },
            }}
          >
            {/* Header */}
            <Box sx={{ textAlign: 'center', marginBottom: '32px', width: '100%' }}>
              <Typography
                variant="h4"
                component="h1"
                sx={{
                  fontWeight: 700,
                  color: '#111827',
                  marginBottom: '8px',
                  fontSize: { xs: '1.5rem', md: '2rem' },
                }}
              >
                Portal Alumni UNMSM
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  color: '#6B7280',
                  fontSize: '0.875rem',
                }}
              >
                Bienvenido de vuelta
              </Typography>
            </Box>

            {/* Logo */}
            {isSUM ? (
              <Box
                sx={{
                  backgroundColor: '#6F191C',
                  padding: '16px 32px',
                  borderRadius: '8px',
                  marginBottom: '32px',
                }}
              >
                <img src={imgLogo} alt="Logo" style={{ height: '80px' }} />
              </Box>
            ) : (
              <Box sx={{ marginBottom: '32px' }}>
                <img src={imgLogo} alt="Logo" style={{ height: '80px' }} />
              </Box>
            )}

            {/* Descripción */}
            {description && (
              <Typography
                variant="h6"
                component="h2"
                align="center"
                sx={{
                  marginBottom: '24px',
                  color: '#374151',
                  fontWeight: 500,
                  fontSize: '1rem',
                }}
              >
                {description}
              </Typography>
            )}

            {/* Formulario */}
            <Box sx={{ width: '100%', maxWidth: '400px' }}>
              {!isSUM && (
                <LoginForm
                  onSubmit={handleLogin}
                  disabled={loading}
                  validate={validate}
                />
              )}
              {isSUM && (
                <LoginSUMForm
                  onSubmit={handleLogin}
                  disabled={loading}
                  validate={validate}
                />
              )}
            </Box>

            {/* Links */}
            <Box
              sx={{
                marginTop: '24px',
                display: 'flex',
                flexDirection: 'column',
                gap: '12px',
                width: '100%',
                maxWidth: '400px',
              }}
            >
              {isSUM ? (
                <>
                  <a
                    className="text-sm text-gray-600 hover:text-gray-900 hover:underline transition-colors"
                    href="/"
                  >
                    ← Regresar al módulo de acceso principal
                  </a>
                  <a
                    className="text-sm text-gray-600 hover:text-gray-900 hover:underline transition-colors"
                    href="/loginEmpresa"
                  >
                    Iniciar sesión como empresa
                  </a>
                </>
              ) : isEmpresa ? (
                <>
                  <a
                    className="text-sm text-gray-600 hover:text-gray-900 hover:underline transition-colors"
                    href="/"
                  >
                    ← Iniciar con cuenta institucional
                  </a>
                  <a
                    className="text-sm text-blue-600 hover:text-blue-800 hover:underline transition-colors font-medium"
                    href="/crearCuentaEmpresa"
                  >
                    Crear cuenta empresarial
                  </a>
                </>
              ) : (
                <>
                  <a
                    className="text-sm text-blue-600 hover:text-blue-800 hover:underline transition-colors font-medium"
                    href="/loginSUM"
                  >
                    Crear cuenta institucional
                  </a>
                  <a
                    className="text-sm text-gray-600 hover:text-gray-900 hover:underline transition-colors"
                    href="/loginEmpresa"
                  >
                    Iniciar sesión como empresa
                  </a>
                </>
              )}
            </Box>
          </Box>
        </Box>
      </div>
    </div>
  );
}

export default LoginBase;
