import React, { useEffect, useState } from "react";
import { useUserContext } from "../../../../contexts/userContextInstitucional";
import InfoBaseCard from "../profileBaseCards/infosubBaseCard"; // Ajusta la ruta según tu estructura
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

const EducationList = () => {
  const { userData } = useUserContext();
  const [educations, setEducations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEducationData = async () => {
      try {
        const response = await fetch(`http://178.128.147.224:8080/api/education/user/${userData.id}`);
        const data = await response.json();
        setEducations(data);
      } catch (error) {
        console.error("Error fetching education data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEducationData();
  }, [userData]);

  const dialogContent = (education) => (
    <div>
      <Typography variant="h6">Editar Educación: {education.degree} en {education.institution}</Typography>
      {/* Aquí podrías agregar un formulario o más detalles */}
    </div>
  );

  if (loading) {
    return <CircularProgress />;
  }

  return (
    <Box>
      {educations.length > 0 ? (
        educations.map((education) => (
          <InfoBaseCard
            key={education.id}
            title={<Typography variant="h5">{education.degree} en {education.fieldOfStudy}</Typography>}
            cardContent={
              <div>
                <Typography variant="subtitle2">Institución: {education.institution}</Typography>
                <Typography variant="subtitle2">
                  Fecha inicio: {education.startDate} - Fecha fin: {education.endDate}
                </Typography>
                <Typography variant="subtitle2">Descripción:</Typography>
                <Typography variant="body2">{education.description}</Typography>
              </div>
            }
            dialogContent={dialogContent(education)} // Contenido del modal
            modalId={`modal-education-${education.id}`} // ID único para cada modal
            className="subcard" // Asignando la clase CSS
          />
        ))
      ) : (
        <Typography variant="body1">No se encontraron registros educativos.</Typography>
      )}
    </Box>
  );
};

export default EducationList;