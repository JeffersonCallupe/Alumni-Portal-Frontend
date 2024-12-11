import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import PropTypes from 'prop-types';

// Creamos un botón personalizado usando styled
const StyledButton = styled(Button)(({ theme }) => ({
  backgroundColor: 'white',
  color: 'black',
  border: '1px solid black',
  '&:hover': {
    backgroundColor: 'black',
    color: 'white',
    border: '1px solid black',
  },
}));

const ActionButton = ({ texto, startIcon, onClick }) => {
  return (
    <StyledButton
      variant="contained"
      startIcon={startIcon}
      onClick={onClick}
    >
      {texto}
    </StyledButton>
  );
};

ActionButton.propTypes = {
  texto: PropTypes.string.isRequired,
  startIcon: PropTypes.node,
  onClick: PropTypes.func.isRequired,
};

export default ActionButton;
