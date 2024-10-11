import "../../../../App.css";
import React from "react";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardContentEmpresa from "../empresa/contentHeader";
import CardContentInstitucional from "../institucional/contentHeader";
import CardMedia from "@mui/material/CardMedia";
import EditPhotoButton from "../../../atoms/buttons/editPhotoButton";
import DefaultHeader from "../../../../assets/fondoRectorado.png";
import DefaultProfile from "../../../../assets/logoUNMSM.png";

const ProfileBaseCard = ({ handleSaveChanges, loading }) => {
  const user_type = "Institucional";
  const [headerImage, setHeaderImage] = React.useState(DefaultHeader);
  const [profileImage, setProfileImage] = React.useState(DefaultProfile);

  const handleImageChange = (e, name) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      if (name === "headerImage") {
        setHeaderImage(imageUrl);
      } else if (name === "profileImage") {
        setProfileImage(imageUrl);
      }
    }
  };

  return (
    <Card
      className="profile-base-card"
      sx={{ width: { xs: "70vw", md: "55vw" } }}
    >
      <div>
        <Box>
          <EditPhotoButton
            onChange={(e) => handleImageChange(e, "headerImage")}
          />
          <CardMedia
            component="img"
            image={headerImage}
            alt={"Header Image"}
            sx={{ height: "10rem" }}
          />
        </Box>
        <Box
          sx={{
            width: "10rem",
            zIndex: 1,
            position: "absolute",
            top: "6rem",
            left: "1rem",
          }}
        >
          <EditPhotoButton
            onChange={(e) => handleImageChange(e, "profileImage")}
          />
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
        </Box>
        <CardContent sx={{ marginTop: "3rem", padding: "1rem 1rem 0 2rem" }}>
          {user_type === "Institucional" ? (
            <CardContentInstitucional onSubmit={handleSaveChanges} loading={loading} />
          ) : (
            <CardContentEmpresa onSubmit={handleSaveChanges} loading={loading} />
          )}
        </CardContent>
      </div>
    </Card>
  );
};

export default ProfileBaseCard;
