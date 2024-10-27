// formFoto.jsx
import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { useUserContext } from "../../../contexts/userContext";
import { uploadProfilePicture, deleteProfilePicture, getProfilePicture } from '../../../hooks/manageImageUser';
import DefaultProfile from "../../../assets/logoUNMSM.png";

const FormFoto = ({ apiUrl}) => {
  const { userData, isInstitutional } = useUserContext();
  const [imageFile, setImageFile] = useState(null);
  const [currentImage, setCurrentImage] = useState("");

  useEffect(() => {
    const fetchProfilePicture = async () => {
      try {
        const imageUrl = await getProfilePicture(apiUrl, userData.id, isInstitutional);
        setCurrentImage(imageUrl);
      } catch (error) {
        console.error('Error al obtener la imagen de perfil:', error);
      }
    };

    fetchProfilePicture();
  }, [apiUrl, userData.id]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setCurrentImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    window.location.reload();
    if (imageFile) {
      try {
        await uploadProfilePicture(apiUrl, userData.id, imageFile, isInstitutional);
      } catch (error) {
        console.error('Error al subir la imagen:', error);
      }
    }
  };

  const handleDelete = async () => {
    window.location.reload();
    try {
      await deleteProfilePicture(apiUrl, userData.id, isInstitutional);
      setCurrentImage(DefaultProfile);
    } catch (error) {
      console.error('Error al eliminar la imagen:', error);
    }
  };

  const handleClose = async () => {
    window.location.reload();
  };

  return (
    <Box component="form" onSubmit={handleUpload} sx={{ display: "flex", flexDirection: "column", gap: 2, width: "100%" }}>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        <img src={currentImage} style={{ width: "100px", height: "100px",  borderRadius: "50%", objectFit: "cover", marginBottom: "16px" }} />
        <input type="file" accept="image/*" onChange={handleImageChange} style={{ display: "none" }} id="upload-photo" />
        <label htmlFor="upload-photo">
          <Button variant="contained" component="span">
            Cambiar Foto
          </Button>
        </label>
      </div>
      <div>
        <Button type="button" onClick={handleDelete} disabled={!currentImage}>
          Eliminar Foto
        </Button>
        <Button type="submit" disabled={!imageFile}>
          Subir Nueva Foto
        </Button>
        <Button type="button" onClick={handleClose}>Cancelar</Button>
      </div>
    </Box>
  );
};

export default FormFoto;