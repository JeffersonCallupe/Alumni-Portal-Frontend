import React, { useEffect, useState } from "react";
import { useUserContext } from "../../../../contexts/userContext";
import InfoBaseCard from "../profileBaseCards/infosubBaseCard";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import FormEditProject from "../../forms/institucional/Edit/formEditProject"; // Ajusta la ruta según tu estructura

const ProjectList = () => {
  const { userData } = useUserContext();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);

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

  const updateProjectList = (updatedProject) => {
    setProjects((prevProjects) =>
      prevProjects.map((project) =>
        project.id === updatedProject.id ? updatedProject : project
      )
    );
  };

  const handleOpenModal = (project) => {
    setSelectedProject(project);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedProject(null);
  };

  const dialogContent = (project) => (
    <div>
      <Typography variant="h6">Editar Proyecto: {project.name}</Typography>
      <FormEditProject
        projectId={project.id}
        initialData={project}
        onUpdate={updateProjectList}
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
                <Button
                  variant="outlined"
                  onClick={() => handleOpenModal(project)}
                  style={{
                    textTransform: "none",
                    color: "black",
                    borderColor: "black",
                    marginTop: "8px",
                  }}
                >
                  Ver descripción
                </Button>
              </div>
            }
            dialogContent={dialogContent(project)} // Llama a la función para pasar el contenido del modal
            modalId={`modal-project-${project.id}`} // ID único para cada modal
            className="subcard" // Asignando la clase CSS
          />
        ))
      ) : (
        <Typography variant="body1">No se encontraron proyectos.</Typography>
      )}

      {/* Modal de edición */}
      <Dialog open={openModal} onClose={handleCloseModal} maxWidth="sm" fullWidth>
      <DialogTitle>Descripción:</DialogTitle>
        <DialogContent>
        <textarea
            value={selectedProject?.description}
            readOnly
            rows={6} // Ajusta el número de filas para la altura del textarea
            style={{
              width: "100%",
              resize: "none", // Evita que el textarea sea redimensionable
              userSelect: "none", // Evita la selección del texto
              pointerEvents: "none", // Hace que el textarea no sea interactivo
            }}
          />

        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal} color="primary">
            Cerrar
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ProjectList;