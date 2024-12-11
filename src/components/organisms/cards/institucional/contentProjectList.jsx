import React, { useEffect, useState } from "react";
import { useUserContext } from "../../../../contexts/userContext";
import InfoBaseCard from "../profileBaseCards/InfoBaseCard";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import ActionButton from "../../../atoms/buttons/ActionButton"
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import FormEditProject from "../../forms/institucional/Edit/formEditProject";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from '@mui/icons-material/VisibilityOutlined';
import DeleteConfirmationModal from "../../dialog/DeleteConfirmationModal";

const ProjectList = () => {
  const { userData } = useUserContext();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [projectToDelete, setProjectToDelete] = useState(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/project/user/${userData.id}`);
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

  const handleDeleteClick = (project) => {
    setProjectToDelete(project);
    setDeleteConfirmOpen(true);
  };

  const handleDeleteCancel = () => {
    setDeleteConfirmOpen(false);
    setProjectToDelete(null);
  };

  const handleDeleteConfirm = async () => {
    if (!projectToDelete) return;
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/project/${projectToDelete.id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        setProjects((prevProjects) =>
          prevProjects.filter((project) => project.id !== projectToDelete.id)
        );
        setDeleteConfirmOpen(false);
        setProjectToDelete(null);
      } else {
        console.error("Error deleting project:", response.statusText);
      }
    } catch (error) {
      console.error("Error deleting project:", error);
    }
  };

  const dialogContent = (project) => (
    <div>
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
            title={project.name}
            sub={true}
            cardContent={
              <div>
                <Typography variant="subtitle2">Fecha: {project.date}</Typography>
                <br/>
                <Box 
                  display="flex" 
                  justifyContent="space-between" 
                  flexWrap="wrap" 
                  gap={2}
                >
                  <ActionButton 
                    texto={"Ver Descripción"}
                    startIcon={<VisibilityIcon />}
                    onClick={() => handleOpenModal(project)}
                  >
                  </ActionButton>
                  <ActionButton 
                    texto={"Eliminar"}
                    startIcon={<DeleteIcon />}
                    onClick={() => handleDeleteClick(project)}
                  >
                    
                  </ActionButton>
                </Box>
              </div>
            }
            dialogContent={dialogContent(project)}
            modalId={`modal-project-${project.id}`}
            className="subcard"
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
            rows={6}
            style={{
              width: "100%",
              resize: "none",
              userSelect: "none",
              pointerEvents: "none",
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" type="button" onClick={handleCloseModal}>
            Cerrar
          </Button>
        </DialogActions>
      </Dialog>

      {/* Modal de confirmación de eliminación */}
      <DeleteConfirmationModal
        isOpen={deleteConfirmOpen}
        onClose={handleDeleteCancel}
        onConfirm={handleDeleteConfirm}
        message="¿Está seguro que desea eliminar el proyecto?"
      />
    </Box>
  );
};

export default ProjectList;
