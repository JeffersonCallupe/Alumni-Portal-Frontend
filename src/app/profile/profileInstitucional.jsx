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
import FormNewEducation from "../../components/organisms/forms/institucional/formEducation";
import FormNewExperience from "../../components/organisms/forms/institucional/formWorkExperience";
import FormNewCertification from "../../components/organisms/forms/institucional/formCertification";
import FormNewSkill from "../../components/organisms/forms/institucional/formSkill";
import FormNewProject from "../../components/organisms/forms/institucional/formProject";

import { useUserContext } from "../../contexts/userContextInstitucional";
import usePatch from "../../hooks/usePatch";
import usePost from "../../hooks/usePost";

function ProfileInstitucional() {
  const { userData } = useUserContext();

  const apiUrl = userData
      ? `http://178.128.147.224:8080/api/user/${userData.id}`
      : null;

  const workExperienceApiUrl = userData
      ? `http://178.128.147.224:8080/api/work-experience/save/${userData.id}`
      : null;

  const educationApiUrl = userData
      ? `http://178.128.147.224:8080/api/education/save/${userData.id}`
      : null;

  const certificationApiUrl = userData
      ? `http://178.128.147.224:8080/api/certification/save/${userData.id}`
      : null;

  const skillApiUrl = userData
      ? `http://178.128.147.224:8080/api/skill/save/${userData.id}`
      : null;

  const projectApiUrl = userData
      ? `http://178.128.147.224:8080/api/project/save/${userData.id}`
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
      } catch (error) {
          console.error("Error al guardar los cambios:", error);
      }
  };

  const handleAddWorkExperience = async (formData) => {
      try {
          await postWorkExperience(formData);
      } catch (error) {
          console.error("Error al agregar la experiencia laboral:", error);
      }
  };

  const handleAddEducation = async (formData) => {
      try {
          await postEducation(formData);
      } catch (error) {
          console.error("Error al agregar la educación:", error);
      }
  };

  const handleAddCertification = async (formData) => {
      try {
          await postCertification(formData);
      } catch (error) {
          console.error("Error al agregar la certificación:", error);
      }
  };

  const handleAddSkill = async (formData) => {
      try {
          await postSkill(formData);
      } catch (error) {
          console.error("Error al agregar la habilidad:", error);
      }
  };

  const handleAddProject = async (formData) => {
      try {
          await postProject(formData);
      } catch (error) {
          console.error("Error al agregar el proyecto:", error);
      }
  };

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
              <ProfileBaseCard handleSaveChanges={handleSaveChanges} loading={patchLoading} />
              <InfoBaseCard
                  title="Acerca de"
                  cardContent={userData.about || "No especificado"}
                  dialogContent={contentAbout}
                  modalId="modal-about"
              />
              <InfoBaseCardContent
                  title="Experiencia Laboral"
                  cardContent={<WorkExperienceList />}
                  dialogContent={contentWorkExperience}
                  modalId="modal-work-experience"
              />
              <InfoBaseCardContent
                  title="Educación"
                  cardContent={<EducationList />}
                  dialogContent={contentEducation}
                  modalId="modal-education"
              />
              <InfoBaseCardContent
                  title="Certificaciones"
                  cardContent={<CertificationList />}
                  dialogContent={contentCertification}
                  modalId="modal-certifications"
              />
              <InfoBaseCardContent
                  title="Habilidades Claves"
                  cardContent={<SkillList />}
                  dialogContent={contentSkills}
                  modalId="modal-skills"
              />
              <InfoBaseCardContent
                  title="Proyectos"
                  cardContent={<ProjectList />}
                  dialogContent={contentProject}
                  modalId="modal-projects"
              />
          </div>
      </HomeBase>
  );
}

export default ProfileInstitucional;