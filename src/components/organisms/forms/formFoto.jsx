// formFoto.jsx
import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { useUserContext } from "../../../contexts/userContext";
import { useAlert } from "../../../contexts/alertContext";
import { uploadProfilePicture, deleteProfilePicture, getProfilePicture } from '../../../hooks/manageImageUser';
import DefaultProfile from "../../../assets/logoPerfil.png";

const FormFoto = ({ apiUrl}) => {
  const { userData, isInstitutional } = useUserContext();
  const { showAlert } = useAlert();
  const [imageFile, setImageFile] = useState(null);
  const [currentImage, setCurrentImage] = useState(DefaultProfile);

  useEffect(() => {
    if (apiUrl && userData?.id) {
      const fetchProfilePicture = async () => {
        try {
          const imageUrl = await getProfilePicture(apiUrl, userData.id, isInstitutional);
          if(imageUrl) setCurrentImage(imageUrl);
        } catch (error) {
          showAlert('Error al obtener la imagen de perfil', "error");
          setCurrentImage(DefaultProfile);
        }
      };
      fetchProfilePicture();
    }
  }, [apiUrl, userData?.id]);
  

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
    if (imageFile) {
      try {
        await uploadProfilePicture(apiUrl, userData.id, imageFile, isInstitutional);
        const updatedImage = await getProfilePicture(apiUrl, userData.id, isInstitutional);
        setCurrentImage(updatedImage);
        showAlert("Imagen de perfil actualizada con éxito", "success");
      } catch (error) {
        showAlert('Error al actualizar la imagen de perfil', "error");
      }
    }
  };

  const handleDelete = async () => {
    try {
      await deleteProfilePicture(apiUrl, userData.id, isInstitutional);
      setCurrentImage(DefaultProfile);
      showAlert("Imagen de perfil eliminada con éxito", "success");
    } catch (error) {
      showAlert('Error al eliminar la imagen de perfil', "error");
    }
  };

  const handleClose = async () => {
    setImageFile(null);
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
        <Button type="button" onClick={handleDelete} disabled={currentImage === DefaultProfile}>
          Eliminar Foto
        </Button>
        <Button type="submit" disabled={!imageFile}>
          Subir Nueva Foto
        </Button>
        <Button type="button" onClick={handleClose}>Cerrar</Button>
      </div>
    </Box>
  );
};

export default FormFoto;