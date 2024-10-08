import React from "react";
import ContentContactoEmpresa from "../../components/organisms/cards/empresa/contentContacto";
import FormContacto from "../../components/organisms/forms/empresa/formContacto";
import FormDescripcion from "../../components/organisms/forms/empresa/formDescripcion";
import HomeBase from "../../components/templates/home/home";
import InfoBaseCard from "../../components/organisms/cards/profileBaseCards/infoBaseCard";
import ProfileBaseCard from "../../components/organisms/cards/profileBaseCards/headerBaseCard";
import { useUserContext } from "../../contexts/userContext";
import usePatch from "../../hooks/usePatch";

function ProfileEmpresa() {
  const { userData } = useUserContext();
  const apiUrl = `http://178.128.147.224:8080/api/company/${userData.id}`;
  const { loading, patch } = usePatch(apiUrl);
  const handleSaveChanges = (formData) => {
    try {
      patch(formData);
    } catch (error) {
      console.error("Error al guardar los cambios:", error);
    }
  };

  const contentDescripcion = React.cloneElement(<FormDescripcion />, {
    onSubmit: handleSaveChanges,
    loading: loading,
  });

  const contentContacto = React.cloneElement(<FormContacto />, {
    onSubmit: handleSaveChanges,
    loading: loading,
  });

  return (
    <HomeBase>
      <div className="w-full flex flex-col mb-16">
        <ProfileBaseCard 
          handleSaveChanges={handleSaveChanges}
          loading={loading}
          />
        <InfoBaseCard
          title="Descripción de Actividades"
          cardContent={userData.description || "No especificado"}
          dialogContent={contentDescripcion}
          modalId="modal-descripcion"
        />

        <InfoBaseCard
          title="Información de Contacto"
          cardContent={<ContentContactoEmpresa />}
          dialogContent={contentContacto}
          modalId="modal-contacto"
        />
      </div>
    </HomeBase>
  );
}

export default ProfileEmpresa;
