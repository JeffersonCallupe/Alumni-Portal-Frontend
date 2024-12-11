import React, { useEffect, useState } from "react";
import { useUserContext } from "../../../../contexts/userContext";
import InfoBaseCard from "../profileBaseCards/InfoBaseCard";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import FormEditSkill from "../../forms/institucional/Edit/FormEditSkill";
<<<<<<< HEAD
import ActionButton from "../../../atoms/buttons/actionButton";
import DeleteIcon from "@mui/icons-material/Delete";
import DeleteConfirmationModal from "../../dialog/deleteConfirmationDialog";
=======
import ActionButton from "../../../atoms/buttons/ActionButton";
import DeleteIcon from "@mui/icons-material/Delete";
import DeleteConfirmationModal from "../../dialog/DeleteConfirmationModal";
>>>>>>> Jefferson

const SkillList = ({ skills, setSkills }) => {
  const { userData } = useUserContext();
  const [loading, setLoading] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const [selectedSkill, setSelectedSkill] = useState(null);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [skillToDelete, setSkillToDelete] = useState(null); // Corrige el nombre de la variable

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/skill/user/${userData.id}`
        );
        const data = await response.json();
        setSkills(data);
      } catch (error) {
        console.error("Error fetching skills:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchSkills();
  }, [userData]);

  const updateSkillList = (updatedSkill) => {
    setSkills((prevSkills) =>
      prevSkills.map((skill) =>
        skill.id === updatedSkill.id ? updatedSkill : skill
      )
    );
  };

  const handleOpenModal = (skill) => {
    setSelectedSkill(skill);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedSkill(null);
  };

  const handleDeleteClick = (skill) => {
    setSkillToDelete(skill);
    setDeleteConfirmOpen(true);
  };

  const handleDeleteCancel = () => {
    setDeleteConfirmOpen(false);
    setSkillToDelete(null);
  };

  const handleDeleteConfirm = async () => {
    if (!skillToDelete) return;

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/skill/${skillToDelete.id}`,
        {
          method: "DELETE",
        }
      );
      if (response.ok) {
        setSkills((prevSkills) =>
          prevSkills.filter((skill) => skill.id !== skillToDelete.id)
        );
        setDeleteConfirmOpen(false);
        setSkillToDelete(null);
      } else {
        console.error("Error deleting skill:", response.statusText);
      }
    } catch (error) {
      console.error("Error deleting skill:", error);
    }
  };

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box>
      {skills.length > 0 ? (
        skills.map((skill) => {
          const contentEditSkill = React.cloneElement(<FormEditSkill />, {
            skillId: skill.id,
            initialData: skill,
            onUpdate: updateSkillList,
          });
          return (
            <InfoBaseCard
              key={skill.id}
              title={skill.name}
              sub={true}
              cardContent={
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Typography variant="subtitle2">
                    Nivel: {skill.level}
                  </Typography>
                  <ActionButton
                    texto={"Eliminar"}
                    startIcon={<DeleteIcon />}
                    onClick={() => handleDeleteClick(skill)}
                  ></ActionButton>
                </Box>
              }
              dialogContent={contentEditSkill}
              modalId={`modal-skill-${skill.id}`}
              className="subcard"
            />
          );
        })
      ) : (
        <Typography variant="body1">No se encontraron habilidades.</Typography>
      )}
      {/* Modal de confirmación de eliminación */}
      <DeleteConfirmationModal
        isOpen={deleteConfirmOpen}
        onClose={handleDeleteCancel}
        onConfirm={handleDeleteConfirm}
        message={`¿Está seguro que desea eliminar la habilidad?`}
      />
    </Box>
  );
};

export default SkillList;
