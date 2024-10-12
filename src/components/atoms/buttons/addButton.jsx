import Button from "@mui/material/Button";
import AddCircleIcon from '@mui/icons-material/AddCircle';

const EditButton = ({ onClick }) => {
    return (
      <Button
        color="black"
        onClick={onClick}
        sx={{ padding: "5px", fontSize: "1.5rem" }} // Personaliza el tamaño del botón
      >
        <AddCircleIcon sx={{ fontSize: 40 }} /> {/* Ajusta el tamaño del ícono */}
      </Button>
    );
};

export default EditButton;