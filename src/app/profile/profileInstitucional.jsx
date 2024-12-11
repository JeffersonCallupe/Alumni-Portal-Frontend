import React from "react";
import HomeBase from "../../components/templates/home/HomeBase";
import FormAbout from "../../components/organisms/forms/institucional/FormAbout";
import InfoBaseCard from "../../components/organisms/cards/profileBaseCards/InfoBaseCard";
import InfoBaseCardContent from "../../components/organisms/cards/profileBaseCards/InfoBaseCard";
import ProfileBaseCard from "../../components/organisms/cards/profileBaseCards/ProfileBaseCard";
import ProjectList from "../../components/organisms/cards/institucional/ProjectList";
import SkillList from "../../components/organisms/cards/institucional/SkillList";
import CertificationList from "../../components/organisms/cards/institucional/CertificationList";
import EducationList from "../../components/organisms/cards/institucional/EducationList";
import WorkExperienceList from "../../components/organisms/cards/institucional/WorkExperienceList";
import FormNewEducation from "../../components/organisms/forms/institucional/FormNewEducation";
import FormNewExperience from "../../components/organisms/forms/institucional/FormNewExperience";
import FormNewCertification from "../../components/organisms/forms/institucional/FormNewCertification";
import FormNewSkill from "../../components/organisms/forms/institucional/FormNewSkill";
import FormNewProject from "../../components/organisms/forms/institucional/FormNewProject";
import FormFoto from "../../components/organisms/forms/FormFoto";
import { useAlert } from "../../contexts/alertContext";
import { useUserContext } from "../../contexts/userContext";
import usePatch from "../../hooks/usePatchProfile";
import usePost from "../../hooks/usePost";

function ProfileInstitucional() {
    
  const { userData } = useUserContext();
  const { showAlert } = useAlert();
  const apiUrl = userData
      ? `${import.meta.env.VITE_API_URL}/api/user/${userData.id}`
      : null;
  
  const imageUrl = `${import.meta.env.VITE_API_URL}/api/image`;

  const workExperienceApiUrl = userData
      ? `${import.meta.env.VITE_API_URL}/api/work-experience/save/${userData.id}`
      : null;

  const educationApiUrl = userData
      ? `${import.meta.env.VITE_API_URL}/api/education/save/${userData.id}`
      : null;

  const certificationApiUrl = userData
      ? `${import.meta.env.VITE_API_URL}/api/certification/save/${userData.id}`
      : null;

  const skillApiUrl = userData
      ? `${import.meta.env.VITE_API_URL}/api/skill/save/${userData.id}`
      : null;

  const projectApiUrl = userData
      ? `${import.meta.env.VITE_API_URL}/api/project/save/${userData.id}`
      : null;

  const { loading: patchLoading, patch } = usePatch(apiUrl);
  const { loading: postWorkLoading, post: postWorkExperience } = usePost(workExperienceApiUrl);
  const { loading: postEducationLoading, post: postEducation } = usePost(educationApiUrl);
  const { loading: postCertificationLoading, post: postCertification } = usePost(certificationApiUrl);
  const { loading: postSkillLoading, post: postSkill } = usePost(skillApiUrl);
  const { loading: postProjectLoading, post: postProject } = usePost(projectApiUrl);

  if (!userData) {
      return <div>Loading...</div>;
  }

  const handleSaveChanges = async (formData) => {
      try {
          await patch(formData);
            showAlert("La información se actualizó con éxito", "success");
      } catch (error) {
            showAlert('Error al guardar los cambios:', "error");
      }
  };

  const handleAddWorkExperience = async (formData) => {
      try {
          await postWorkExperience(formData);
          showAlert("La información se registró con éxito", "success");
      } catch (error) {
            showAlert('Error al agregar la experiencia laboral:', "error");
      }
  };

  const handleAddEducation = async (formData) => {
      try {
          await postEducation(formData);
          showAlert("La información se registró con éxito", "success");
      } catch (error) {
          showAlert("Error al agregar la educación", "error");
      }
  };

  const handleAddCertification = async (formData) => {
      try {
          await postCertification(formData);
          showAlert("La información se registró con éxito", "success");
      } catch (error) {
          showAlert("Error al agregar la certificación:", "error");
      }
  };

  const handleAddSkill = async (formData) => {
      try {
          await postSkill(formData);
          showAlert("La información se registró con éxito", "success");
      } catch (error) {
          showAlert("Error al agregar la habilidad:", "error");
      }
  };

  const handleAddProject = async (formData) => {
      try {
          await postProject(formData);
          showAlert("La información se registró con éxito", "success");
      } catch (error) {
          showAlert("Error al agregar el proyecto:", "error");
      }
  };
  
  const contentFoto = React.cloneElement(<FormFoto />, {
    apiUrl: imageUrl
  });

  const contentAbout = React.cloneElement(<FormAbout />, {
      onSubmit: handleSaveChanges,
      loading: patchLoading,
  });

  const contentWorkExperience = React.cloneElement(<FormNewExperience />, {
      onSubmit: handleAddWorkExperience,
      loading: postWorkLoading,
  });

  const contentEducation = React.cloneElement(<FormNewEducation />, {
      onSubmit: handleAddEducation,
      loading: postEducationLoading,
  });

  const contentCertification = React.cloneElement(<FormNewCertification />, {
      onSubmit: handleAddCertification,
      loading: postCertificationLoading,
  });

  const contentSkills = React.cloneElement(<FormNewSkill />, {
      onSubmit: handleAddSkill,
      loading: postSkillLoading,
  });

  const contentProject = React.cloneElement(<FormNewProject />, {
      onSubmit: handleAddProject,
      loading: postProjectLoading,
  });

  return (
      <HomeBase>
          <div className="w-full flex flex-col mb-16">
              <ProfileBaseCard 
                apiUrl={imageUrl}
                handleSaveChanges={handleSaveChanges} 
                loading={patchLoading}
                dialogContent={contentFoto}
                modalId="modal- foto"
              />
              <InfoBaseCard
                  title="Acerca de"
                  cardContent={
                    <textarea
                        value={userData.about || "No especificado."}
                        readOnly
                        style={{
                            width: '100%',
                            height: 'auto',
                            overflow: 'auto',
                            resize: 'vertical',
                            lineHeight: '1.5',
                            minHeight: '100px',
                            maxHeight: '200px',
                        }}
                    />
                  }
                  dialogContent={contentAbout}
                  modalId="modal-about"
              />
              <InfoBaseCardContent
                  title="Experiencia Laboral"
                  content={true}
                  cardContent={<WorkExperienceList />}
                  dialogContent={contentWorkExperience}
                  modalId="modal-work-experience"
              />
              <InfoBaseCardContent
                  title="Educación"
                  content={true}
                  cardContent={<EducationList />}
                  dialogContent={contentEducation}
                  modalId="modal-education"
              />
              <InfoBaseCardContent
                  title="Certificaciones"
                  content={true}
                  cardContent={<CertificationList />}
                  dialogContent={contentCertification}
                  modalId="modal-certifications"
              />
              <InfoBaseCardContent
                  title="Habilidades Claves"
                  content={true}
                  cardContent={<SkillList />}
                  dialogContent={contentSkills}
                  modalId="modal-skills"
              />
              <InfoBaseCardContent
                  title="Proyectos"
                  content={true}
                  cardContent={<ProjectList />}
                  dialogContent={contentProject}
                  modalId="modal-projects"
              />
          </div>
      </HomeBase>
  );
}

export default ProfileInstitucional;