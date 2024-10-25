import React, { useEffect, useState } from "react";
import { useUserContext } from "../../../../contexts/userContext";
import InfoBaseCard from "../profileBaseCards/infosubBaseCard";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import FormEditSkill from "../../forms/institucional/Edit/formEditSkill"; // Importa el formulario
import Button from "@mui/material/Button";
import DeleteIcon from '@mui/icons-material/Delete';

const SkillList = () => {
  const { userData } = useUserContext();
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const [selectedSkill, setSelectedSkill] = useState(null);

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const response = await fetch(`http://178.128.147.224:8080/api/skill/user/${userData.id}`);
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

  const dialogContent = (skill) => (
    <div>
      <Typography variant="h6">Editar Habilidad: {skill.name}</Typography>
      <FormEditSkill
        skillId={skill.id}
        initialData={skill}
        onUpdate={updateSkillList}
        onCancel={handleCloseModal}
      />
    </div>
  );

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box>
      {skills.length > 0 ? (
        skills.map((skill) => (
          <InfoBaseCard
            key={skill.id}
            title={<Typography variant="h6">{skill.name}</Typography>}
            cardContent={
              <Box 
                display="flex" 
                justifyContent="space-between"  // Coloca el botón al extremo derecho
                alignItems="center"             // Alinea verticalmente el texto y el botón
              >
                <Typography variant="subtitle2">Nivel: {skill.level}</Typography>
                
                <Button 
                  variant="outlined" 
                  startIcon={<DeleteIcon />}
                  style={{ 
                    textTransform: "none", 
                    color: "black", 
                    borderColor: "black" 
                  }}
                >
                  Eliminar
                </Button>
              </Box>
            }
            dialogContent={dialogContent(skill)}
            modalId={`modal-skill-${skill.id}`}
            className="subcard"
          />
        ))
      ) : (
        <Typography variant="body1">No se encontraron habilidades.</Typography>
      )}
    </Box>
  );
};

export default SkillList;