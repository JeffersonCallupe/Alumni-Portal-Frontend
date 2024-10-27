import React, { useEffect, useState } from "react";
import { useUserContext } from "../../../../contexts/userContext";
import InfoBaseCard from "../profileBaseCards/infosubBaseCard";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import WorkExperienceForm from "../../forms/institucional/Edit/formEditWorkExperience";
import Button from "@mui/material/Button";
import ActionButton from "../../../atoms/buttons/actionButton"
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/VisibilityOutlined';
import DeleteConfirmationModal from "../../../organisms/forms/institucional/deleteConfirmationModal"; // Ajusta la ruta según tu estructura


const WorkExperienceList = () => {
  const { userData } = useUserContext();
  const [experiences, setExperiences] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const [selectedExperience, setSelectedExperience] = useState(null);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [experienceToDelete, setExperienceToDelete] = useState(null);

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

  const updateExperienceList = (updatedExperience) => {
    setExperiences((prevExperiences) =>
      prevExperiences.map((exp) =>
        exp.id === updatedExperience.id ? updatedExperience : exp
      )
    );
  };

  const handleOpenModal = (experience) => {
    setSelectedExperience(experience);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedExperience(null);
  };

  const handleDeleteClick = (experience) => {
    setExperienceToDelete(experience);
    setDeleteConfirmOpen(true);
  };

  const handleDeleteCancel = () => {
    setDeleteConfirmOpen(false);
    setExperienceToDelete(null);
  };

  const handleDeleteConfirm = async () => {
    if (!experienceToDelete) return;

    try {
      const response = await fetch(`http://178.128.147.224:8080/api/work-experience/${experienceToDelete.id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        setExperiences((prevExperiences) =>
          prevExperiences.filter((exp) => exp.id !== experienceToDelete.id)
        );
        setDeleteConfirmOpen(false);
        setExperienceToDelete(null);
      } else {
        console.error("Error deleting experience:", response.statusText);
      }
    } catch (error) {
      console.error("Error deleting experience:", error);
    }
  };

  const dialogContent = (experience) => (
    <div>
      <Typography variant="h6">Editar Experiencia: {experience.jobTitle}</Typography>
      <WorkExperienceForm
        workExperienceId={experience.id}
        initialData={experience}
        onUpdate={updateExperienceList}
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
                <br />
                <Box 
                  display="flex" 
                  justifyContent="space-between" 
                  flexWrap="wrap" 
                  gap={2}
                >
                  <ActionButton 
                    texto={"Ver Descripción"}
                    startIcon={<VisibilityIcon />}
                    onClick={() => handleOpenModal(experience)}
                  >
                  </ActionButton>
                  <ActionButton 
                    texto={"Eliminar"}
                    startIcon={<DeleteIcon />}
                    onClick={() => handleDeleteClick(experience)}
                  >
                    
                  </ActionButton>
                </Box>
              </div>
            }
            dialogContent={dialogContent(experience)}
            modalId={`modal-work-experience-${experience.id}`}
            className="subcard"
          />
        ))
      ) : (
        <Typography variant="body1">No se encontraron experiencias laborales.</Typography>
      )}

      {/* Description Modal */}
      <Dialog open={openModal} onClose={handleCloseModal} maxWidth="sm" fullWidth>
        <DialogTitle>Descripción:</DialogTitle>
        <DialogContent>
          <textarea
            value={selectedExperience?.description}
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

      {/* Delete Confirmation Modal */}
      <DeleteConfirmationModal
        isOpen={deleteConfirmOpen}
        onClose={handleDeleteCancel}
        onConfirm={handleDeleteConfirm}
        message={`¿Está seguro que desea eliminar la experiencia laboral?`}
      />
    </Box>
  );
};

export default WorkExperienceList;


