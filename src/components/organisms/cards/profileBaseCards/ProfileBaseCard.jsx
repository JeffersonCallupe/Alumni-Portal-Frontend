import "../../../../App.css";
import React from "react";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardContentEmpresa from "../empresa/CardContentEmpresa";
import CardContentInstitucional from "../institucional/CardContentInstitucional";
import CardMedia from "@mui/material/CardMedia";
import DefaultHeader from "../../../../assets/headerDefault.jpg";
import DialogBase from "../../dialog/DialogBase";
import useModal from "../../../../hooks/useModal";
import { useUserContext } from "../../../../contexts/userContext";

const ProfileBaseCard = ({ handleSaveChanges, loading, dialogContent, modalId }) => {
  const [headerImage] = React.useState(DefaultHeader);
  const { open, handleOpen, handleClose } = useModal();
  const { userData, isInstitutional, profilePicture } = useUserContext();

  return (
    <Card
      className="profile-base-card"
      sx={{
        width: '100%',
        maxWidth: { xs: '100%', sm: '600px', md: '900px', lg: '1000px' },
        margin: { xs: '0', sm: '0 auto' },
        borderRadius: { xs: '0', sm: '12px' },
        boxShadow: { xs: 'none', sm: '0 1px 3px rgba(0,0,0,0.08)' },
        border: { xs: 'none', sm: '1px solid #E5E7EB' }
      }}
    >
      <div>
        <Box>
          <CardMedia
            component="img"
            image={headerImage}
            alt={"Header Image"}
            sx={{
              height: { xs: '8rem', sm: '10rem', md: '12rem' },
              objectFit: 'cover'
            }}
          />
        </Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            width: { xs: '5rem', sm: '6rem', md: '7rem' },
            zIndex: 1,
            position: "absolute",
            top: { xs: '5rem', sm: '6.5rem', md: '8.5rem' },
            left: { xs: '1rem', sm: '1.5rem', md: '2rem' },
          }}
        >
          <Avatar
            alt="Profile Image"
            src={profilePicture}
            sx={{
              height: { xs: '5rem', sm: '6rem', md: '7rem' },
              width: { xs: '5rem', sm: '6rem', md: '7rem' },
              backgroundColor: "black",
              position: "relative",
              zIndex: 2,
              cursor: "pointer",
              border: { xs: '3px solid white', sm: '4px solid white' },
              transition: "transform 0.2s, box-shadow 0.2s",
              '&:hover': {
                transform: "scale(1.05)",
                boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
              },
              '&:active': {
                transform: "scale(0.98)",
              }
            }}
            onClick={handleOpen}
          />
        </Box>
        <CardContent sx={{
          marginTop: { xs: '2.5rem', sm: '3rem', md: '3.5rem' },
          padding: { xs: '1rem', sm: '1.5rem', md: '2rem' }
        }}>
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
