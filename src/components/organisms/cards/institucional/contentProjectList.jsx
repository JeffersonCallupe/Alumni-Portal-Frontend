import React, { useEffect, useState } from "react";
import { useUserContext } from "../../../../contexts/userContext";
import InfoBaseCard from "../profileBaseCards/infosubBaseCard"; // Ajusta la ruta según tu estructura
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

const ProjectList = () => {
  const { userData } = useUserContext();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch(`http://178.128.147.224:8080/api/project/user/${userData.id}`);
        const data = await response.json();
        setProjects(data);
      } catch (error) {
        console.error("Error fetching projects:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, [userData]);

  if (loading) {
    return <CircularProgress />;
  }

  return (
    <Box>
      {projects.length > 0 ? (
        projects.map((project) => (
          <InfoBaseCard
            key={project.id}
            title={<Typography variant="h6">{project.name}</Typography>}
            cardContent={
              <div>
                <Typography variant="subtitle2">Fecha: {project.date}</Typography>
                <Typography variant="subtitle2">Descripción:</Typography>
                <Typography variant="body2">{project.description}</Typography>
              </div>
            }
            dialogContent={
              <Typography variant="h6">Editar Proyecto: {project.name}</Typography>
            } // Contenido del modal
            modalId={`modal-project-${project.id}`} // ID único para cada modal
            className="subcard" // Asignando la clase CSS
          />
        ))
      ) : (
        <Typography variant="body1">No se encontraron proyectos.</Typography>
      )}
    </Box>
  );
};

export default ProjectList;