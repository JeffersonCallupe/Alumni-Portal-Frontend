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
import useModal from "../../../../hooks/useModal";
import { useUserContext } from "../../../../contexts/userContext";
import { getProfilePicture } from "../../../../hooks/manageImageUser";

const ProfileBaseCard = ({ apiUrl, handleSaveChanges, loading, dialogContent, modalId }) => {
  const [headerImage] = React.useState(DefaultHeader);
  const [profileImage, setProfileImage] = React.useState(DefaultProfile);
  const { open, handleOpen, handleClose } = useModal();
  const { userData, isInstitutional } = useUserContext();
  const usertype = isInstitutional ? "user" : "company";
  const imageApi = `${apiUrl}/download-${usertype}`;
  
  useEffect(() => {
    const fetchProfilePicture = async () => {
      try {
        const imageUrl = await getProfilePicture(imageApi, userData.id,isInstitutional);
        setProfileImage(imageUrl);
      } catch (error) {
        console.error('Error al obtener la imagen de perfil:', error);
      }
    };

    fetchProfilePicture();
  }, [imageApi, userData]);


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
              cursor: "pointer", // Indica que es clickeable
              transition: "transform 0.2s, box-shadow 0.2s", // Animación suave
              '&:hover': {
                transform: "scale(1.02)", // Ligero efecto de zoom al hover
                boxShadow: "0 0 10px rgba(0,0,0,0.2)", // Sombra al hover
              },
              '&:active': {
                transform: "scale(0.98)", // Efecto de presión al hacer click
              }
            }}
            onClick={handleOpen}
          />
          {/* <EditButton 
            onClick={handleOpen}
            sx={{
              zIndex: 3,
            }}
          /> */}
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