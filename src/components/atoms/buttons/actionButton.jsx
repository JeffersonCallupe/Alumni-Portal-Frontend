import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';

/**
 * Botón personalizado con variantes profesionales
 * @param {Object} props - Propiedades del botón
 * @param {string} props.variant - Variante del botón: 'primary', 'secondary', 'outline'
 */
const StyledButton = styled(Button)(({ theme, buttonvariant = 'secondary' }) => {
  const variants = {
    primary: {
      backgroundColor: '#6F191C',
      color: 'white',
      border: 'none',
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
      '&:hover': {
        backgroundColor: '#8F2428',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.15)',
        transform: 'translateY(-2px)',
      },
      '&:active': {
        transform: 'translateY(0)',
        boxShadow: '0 1px 2px rgba(0, 0, 0, 0.1)',
      },
    },
    secondary: {
      backgroundColor: 'white',
      color: '#6F191C',
      border: '2px solid #6F191C',
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
      '&:hover': {
        backgroundColor: '#6F191C',
        color: 'white',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.15)',
        transform: 'translateY(-2px)',
      },
      '&:active': {
        transform: 'translateY(0)',
        boxShadow: '0 1px 2px rgba(0, 0, 0, 0.1)',
      },
    },
    outline: {
      backgroundColor: 'transparent',
      color: '#374151',
      border: '1px solid #D1D5DB',
      boxShadow: 'none',
      '&:hover': {
        backgroundColor: '#F3F4F6',
        borderColor: '#9CA3AF',
        transform: 'translateY(-1px)',
      },
      '&:active': {
        transform: 'translateY(0)',
        backgroundColor: '#E5E7EB',
      },
    },
  };

  return {
    ...variants[buttonvariant],
    borderRadius: '8px',
    padding: '8px 20px',
    textTransform: 'none',
    fontWeight: 500,
    fontSize: '0.875rem',
    fontFamily: 'Inter, system-ui, sans-serif',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    '&:disabled': {
      opacity: 0.5,
      cursor: 'not-allowed',
    },
  };
});

/**
 * Componente de botón de acción con estilos profesionales
 * @param {Object} props - Propiedades del componente
 * @param {string} props.texto - Texto del botón
 * @param {React.ReactNode} props.startIcon - Ícono al inicio del botón
 * @param {Function} props.onClick - Función a ejecutar al hacer click
 * @param {string} props.variant - Variante del botón: 'primary', 'secondary', 'outline'
 * @param {boolean} props.disabled - Si el botón está deshabilitado
 */
const ActionButton = ({ texto, startIcon, onClick, variant = 'secondary', disabled = false }) => {
  return (
    <StyledButton
      variant="contained"
      startIcon={startIcon}
      onClick={onClick}
      buttonvariant={variant}
      disabled={disabled}
    >
      {texto}
    </StyledButton>
  );
};

export default ActionButton;
