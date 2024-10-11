import React, { useEffect, useState } from "react";
import { useUserContext } from "../../../../contexts/userContextInstitucional";
import InfoBaseCard from "../profileBaseCards/infosubBaseCard"; // Ajusta la ruta según tu estructura
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

const SkillList = () => {
  const { userData } = useUserContext();
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);

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

  if (loading) {
    return <CircularProgress />;
  }

  return (
    <Box>
      {skills.length > 0 ? (
        skills.map((skill) => (
          <InfoBaseCard
            key={skill.id}
            title={<Typography variant="h6">{skill.name}</Typography>}
            cardContent={
              <div>
                <Typography variant="subtitle2">Nivel: {skill.level}</Typography>
              </div>
            }
            dialogContent={
              <Typography variant="h6">Editar Habilidad: {skill.name}</Typography>
            } // Contenido del modal
            modalId={`modal-skill-${skill.id}`} // ID único para cada modal
            className="subcard" // Asignando la clase CSS
          />
        ))
      ) : (
        <Typography variant="body1">No se encontraron habilidades.</Typography>
      )}
    </Box>
  );
};

export default SkillList;