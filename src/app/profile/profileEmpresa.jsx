import ContentContactoEmpresa from "../../components/organisms/cards/empresa/contentContacto";
import FormContacto from "../../components/organisms/forms/empresa/formContacto";
import FormDescripcion from "../../components/organisms/forms/empresa/formDescripcion";
import HomeBase from "../../components/templates/home/home";
import InfoBaseCard from "../../components/organisms/cards/profileBaseCards/infoBaseCard";
import ProfileBaseCard from "../../components/organisms/cards/profileBaseCards/headerBaseCard";
import { useUserContext } from "../../contexts/userContext";
import usePatch from "../../hooks/usePatch";
import React from "react";

function ProfileEmpresa() {
  const { userData } = useUserContext();
  const apiUrl = `http://178.128.147.224:8080/api/company/${userData.id}`;
  const { loading, patch } = usePatch(apiUrl);
  
  const [openDialog, setOpenDialog] = React.useState(false);
  const handleOpenDialog = () => setOpenDialog(true);
  const handleCloseDialog = () => setOpenDialog(false);
  const handleSaveChanges = (formData) => {
    try {
      patch(formData);
      setOpenDialog(false);
    } catch (error) {
      console.error("Error al guardar los cambios:", error);
    }
  };

  const contentDescripcion = React.cloneElement(<FormDescripcion />, { 
    onSubmit: handleSaveChanges, 
    onCancel: handleCloseDialog,
    loading: loading
  });
  const contentContacto = React.cloneElement(<FormContacto />, { 
    onSubmit: handleSaveChanges, 
    onCancel: handleCloseDialog,
    loading: loading
  });

  return (
    <HomeBase>
      <div className="w-full flex flex-col mb-16">
        <ProfileBaseCard />
          <InfoBaseCard
          title="Descripción de Actividades"
          cardContent={userData.description || "No especificado"}
          dialogContent={contentDescripcion}
          loading={loading}
          openDialog={openDialog}
          onEditClick={handleOpenDialog}
          onCloseDialog={handleCloseDialog}
        />
        
        <InfoBaseCard
          title="Información de Contacto"
          cardContent={<ContentContactoEmpresa />}
          dialogContent={contentContacto}
          loading={loading}
          openDialog={openDialog}
          onEditClick={handleOpenDialog}
          onCloseDialog={handleCloseDialog}
        />
      </div>
    </HomeBase>
  );
}

export default ProfileEmpresa;
