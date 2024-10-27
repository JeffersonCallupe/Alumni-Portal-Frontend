import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';

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

const ActionButton = ({ texto, onClick }) => {
  return (
    <StyledButton
      variant="contained"
      onClick={onClick}
    >
      {texto}
    </StyledButton>
  );
};

export default ActionButton;
