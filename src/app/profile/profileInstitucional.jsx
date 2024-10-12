import React from "react";
import HomeBase from "../../components/templates/home/home";
import FormAbout from "../../components/organisms/forms/institucional/formAbout";
import InfoBaseCard from "../../components/organisms/cards/profileBaseCards/infoBaseCard";
import InfoBaseCardContent from "../../components/organisms/cards/profileBaseCards/infoBaseCardContent";
import ProfileBaseCard from "../../components/organisms/cards/profileBaseCards/headerBaseCard";
import ProjectList from "../../components/organisms/cards/institucional/contentProjectList";
import SkillList from "../../components/organisms/cards/institucional/contentSkillList";
import CertificationList from "../../components/organisms/cards/institucional/contentCertificationList";
import EducationList from "../../components/organisms/cards/institucional/contentEducationList";
import WorkExperienceList from "../../components/organisms/cards/institucional/contentWorkExperienceList";
import FormNewExperience from "../../components/organisms/forms/institucional/formWorkExperience";

import { useUserContext } from "../../contexts/userContextInstitucional";
import usePatch from "../../hooks/usePatch";
import usePost from "../../hooks/usePost";

function ProfileInstitucional() {
  const { userData } = useUserContext();

  // URL para las actualizaciones generales del perfil (acerca de, educación, etc.)
  const apiUrl = userData
    ? `http://178.128.147.224:8080/api/user/${userData.id}`
    : null;

  // URL específica para agregar una nueva experiencia laboral
  const workExperienceApiUrl = userData
    ? `http://178.128.147.224:8080/api/work-experience/save/${userData.id}`
    : null;

  // Hook para realizar un PATCH general en el perfil
  const { loading: patchLoading, patch, error: patchError } = usePatch(apiUrl);

  // Hook para realizar un POST para nuevas experiencias laborales
  const { loading: postLoading, post, error: postError } = usePost(workExperienceApiUrl);

  if (!userData) {
    return <div>Loading...</div>;
  }

  // Manejo de guardado de cambios en el perfil general
  const handleSaveChanges = async (formData) => {
    try {
      await patch(formData);
    } catch (error) {
      console.error("Error al guardar los cambios:", error);
    }
  };

  // Manejo del POST para agregar nueva experiencia laboral
  const handleAddWorkExperience = async (formData) => {
    try {
      await post(formData); // Aquí se usa el hook `usePost` para nuevas experiencias laborales
    } catch (error) {
      console.error("Error al agregar la experiencia laboral:", error);
    }
  };

  const contentAbout = React.cloneElement(<FormAbout />, {
    onSubmit: handleSaveChanges,
    loading: patchLoading,
  });

  const contentWorkExperience = React.cloneElement(<FormNewExperience />, {
    onSubmit: handleAddWorkExperience, // Usamos el POST para agregar experiencia
    loading: postLoading,
  });

  return (
    <HomeBase>
      <div className="w-full flex flex-col mb-16">
        {/* Header del perfil */}
        <ProfileBaseCard
          handleSaveChanges={handleSaveChanges}
          loading={patchLoading}
        />
        {/* Tarjeta para "Acerca de" */}
        <InfoBaseCard
          title="Acerca de"
          cardContent={userData.about || "No especificado"}
          dialogContent={contentAbout}
          modalId="modal-about"
        />
        {/* Tarjeta para "Experiencia Laboral" */}
        <InfoBaseCardContent
          title="Experiencia Laboral"
          cardContent={<WorkExperienceList />}
          dialogContent={contentWorkExperience} 
          modalId="modal-work-experience"
        />
        {/* Tarjeta para "Educación" */}
        <InfoBaseCardContent
          title="Educación"
          cardContent={<EducationList />}
          dialogContent={contentAbout} 
          modalId="modal-education"
        />
        {/* Tarjeta para "Certificaciones" */}
        <InfoBaseCardContent
          title="Certificaciones"
          cardContent={<CertificationList />}
          dialogContent={contentAbout}  
          modalId="modal-certifications"
        />
        {/* Tarjeta para "Habilidades Claves" */}
        <InfoBaseCardContent
          title="Habilidades Claves"
          cardContent={<SkillList />}
          dialogContent={contentAbout} 
          modalId="modal-skills"
        />
        {/* Tarjeta para "Proyectos" */}
        <InfoBaseCardContent
          title="Proyectos"
          cardContent={<ProjectList />}
          dialogContent={contentAbout}  
          modalId="modal-projects"
        />
      </div>
      {/* Mostrar errores si los hay */}
      {patchError && <p className="text-red-500">Error en el guardado: {patchError}</p>}
      {postError && <p className="text-red-500">Error al agregar experiencia: {postError}</p>}
    </HomeBase>
  );
}

export default ProfileInstitucional;