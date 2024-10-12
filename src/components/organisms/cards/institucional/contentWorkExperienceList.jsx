import React, { useEffect, useState } from "react";
import { useUserContext } from "../../../../contexts/userContextInstitucional";
import InfoBaseCard from "../profileBaseCards/infosubBaseCard"; // Ajusta la ruta según tu estructura
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

const WorkExperienceList = () => {
  const { userData } = useUserContext();
  const [experiences, setExperiences] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWorkExperiences = async () => {
      try {
        const response = await fetch(`http://178.128.147.224:8080/api/work-experience/user/${userData.id}`);
        const data = await response.json();
        setExperiences(data);
      } catch (error) {
        console.error("Error fetching work experiences:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchWorkExperiences();
  }, [userData]);

  const dialogContent = (experience) => (
    <div>
      <Typography variant="h6" >Editar Experiencia: {experience.jobTitle}</Typography>
      {/* Aquí podrías agregar un formulario o más detalles */}
    </div>
  );

  if (loading) {
    return <CircularProgress />;
  }

  return (
    <Box>
      {experiences.length > 0 ? (
        experiences.map((experience) => (
          <InfoBaseCard
            key={experience.id}
            title={<Typography variant="h6">{experience.jobTitle}</Typography>}
            cardContent={
              <div>
                <Typography variant="subtitle2">Empresa: {experience.company}</Typography>
                <Typography variant="subtitle2">
                  Fecha inicio: {experience.startDate} - Fecha fin: {experience.endDate}
                </Typography>
                <Typography variant="subtitle2">Descripción:</Typography>
                <Typography variant="body2">{experience.description}</Typography>
              </div>
            }
            dialogContent={dialogContent(experience)} // Contenido del modal
            modalId={`modal-work-experience-${experience.id}`} // ID único para cada modal
            className="subcard" // Asignando la clase CSS
          />
        ))
      ) : (
        <Typography variant="body1">No se encontraron experiencias laborales.</Typography>
      )}
    </Box>
  );
};

export default WorkExperienceList;
