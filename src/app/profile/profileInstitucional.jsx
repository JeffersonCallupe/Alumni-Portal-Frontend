import React from "react";
import HomeBase from "../../components/templates/home/home";
import FormAbout from "../../components/organisms/forms/institucional/formAbout";
import InfoBaseCard from "../../components/organisms/cards/profileBaseCards/infoBaseCard";
import ProfileBaseCard from "../../components/organisms/cards/profileBaseCards/headerBaseCard";
import WorkExperienceList from "../../components/organisms/cards/institucional/contentWorkExperienceList";  // <-- Importa el nuevo componente
import { useUserContext } from "../../contexts/userContextInstitucional";
import usePatch from "../../hooks/usePatch";

function ProfileInstitucional() {
  const { userData } = useUserContext();
  const apiUrl = userData
    ? `http://178.128.147.224:8080/api/user/${userData.id}`
    : null;
  const { loading, patch } = usePatch(apiUrl);

  if (!userData) {
    return <div>Loading...</div>;
  }
  const handleSaveChanges = async (formData) => {
    try {
      await patch(formData);
    } catch (error) {
      console.error("Error al guardar los cambios:", error);
    }
  };

  const contentAbout = React.cloneElement(<FormAbout />, {
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
          title="Acerca de"
          cardContent={userData.about || "No especificado"}
          dialogContent={contentAbout}
          modalId="modal-about"
        />
        <InfoBaseCard
          title="Experiencia Laboral"
          cardContent={<WorkExperienceList />}
          dialogContent={contentAbout}
          modalId="modal-contacto"
        />
        
      </div>
    </HomeBase>
  );
}

export default ProfileInstitucional;