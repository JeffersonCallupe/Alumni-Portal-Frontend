import Button from "@mui/material/Button";
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';

const AddButton = ({ onClick }) => {
    return (
      <Button
        color="black"
        onClick={onClick}
        sx={
          {
            minWidth: 0,
            width: 35,
            height: 35,
            borderRadius: "50%",
            backgroundColor: "white",  // Fondo blanco por defecto
            color: "black",            // Icono en negro por defecto
            padding: 0,
            transition: "all 0.3s ease", // Transición suave
            "&:hover": {
              backgroundColor: "gray", // Fondo negro en hover
              color: "white",           // Icono en blanco en hover
              transform: "scale(1.1)",  // Aumenta el tamaño en hover
            },
          }
        } // Personaliza el tamaño del botón
      >
        <AddOutlinedIcon sx={{ fontSize: 33 }} /> {/* Ajusta el tamaño del ícono */}
      </Button>
    );
};

export default AddButton;