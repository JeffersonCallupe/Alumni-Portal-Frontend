import "../../../../App.css";
import React, { useEffect } from "react";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardContentEmpresa from "../empresa/contentHeader";
import CardContentInstitucional from "../institucional/contentHeader";
import CardMedia from "@mui/material/CardMedia";
import DefaultHeader from "../../../../assets/fondoRectorado.png";
import DefaultProfile from "../../../../assets/logoUNMSM.png";
import DialogBase from "../../dialog/profileBaseDialog";
import EditButton from "../../../atoms/buttons/editPhotoButton";
import useModal from "../../../../hooks/useModal";
import { useUserContext } from "../../../../contexts/userContext";
import { getProfilePicture } from "../../../../hooks/manageImageUser";

const ProfileBaseCard = ({ apiUrl, handleSaveChanges, loading, dialogContent, modalId }) => {
  const [headerImage] = React.useState(DefaultHeader);
  const [profileImage, setProfileImage] = React.useState(DefaultProfile);
  const { open, handleOpen, handleClose } = useModal();
  const { userData, isInstitutional } = useUserContext();
  useEffect(() => {
    const fetchProfilePicture = async () => {
      try {
        const imageUrl = await getProfilePicture(apiUrl, userData.id);
        setProfileImage(imageUrl);
      } catch (error) {
        console.error('Error al obtener la imagen de perfil:', error);
      }
    };

    fetchProfilePicture();
    console.log(userData);
  }, [apiUrl, userData]);


  return (
    <Card
      className="profile-base-card"
      sx={{ width: { xs: "70vw", md: "55vw" } }}
    >
      <div>
        <Box>
          <CardMedia
            component="img"
            image={headerImage}
            alt={"Header Image"}
            sx={{ height: "10rem" }}
          />
        </Box>
        <Box
          sx={{
            display: "flex", // Usar flex para alinear horizontalmente
            alignItems: "center", // Alinear verticalmente al centro
            width: "10rem",
            zIndex: 1,
            position: "absolute",
            top: "6.5rem",
            left: "1rem",
          }}
        >
          <Avatar
            alt="Profile Image"
            src={profileImage}
            sx={{
              height: "7rem",
              width: "7rem",
              backgroundColor: "black",
              position: "relative",
              zIndex: 2,
            }}
          />
          <EditButton 
            onClick={handleOpen}
            sx={{
              marginLeft: "0.1rem", // Espacio entre el avatar y el botón
              height: "0.25rem", // Ajustar la altura del botón según sea necesario
              width: "0.25rem", // Ajustar el ancho del botón
              display: "flex", // Usar flex para centrar el ícono en el botón, si es un botón de ícono
              minWidth: "0", 
            }}
          />
        </Box>
        <CardContent sx={{ marginTop: "3rem", padding: "1rem 1rem 0 2rem" }}>
          {isInstitutional ? (
            <CardContentInstitucional onSubmit={handleSaveChanges} loading={loading} />
          ) : (
            <CardContentEmpresa onSubmit={handleSaveChanges} loading={loading} />
          )}
        </CardContent>
      </div>

      <DialogBase
        open={open}
        handleClose={handleClose}
        title={"Editar foto de Perfil"}
        content={dialogContent}
        modalId={modalId}
      />
    </Card>
  );
};

export default ProfileBaseCard;