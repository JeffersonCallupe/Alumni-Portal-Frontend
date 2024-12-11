import React, { useEffect, useState } from "react";
import { useUserContext } from "../../../../contexts/userContext";
import InfoBaseCard from "../profileBaseCards/InfoBaseCard";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import WorkExperienceForm from "../../forms/institucional/Edit/FormWorkExperience";
import Button from "@mui/material/Button";
<<<<<<< HEAD
import ActionButton from "../../../atoms/buttons/actionButton";
=======
import ActionButton from "../../../atoms/buttons/ActionButton";
>>>>>>> Jefferson
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/VisibilityOutlined";
<<<<<<< HEAD
import DeleteConfirmationModal from "../../dialog/deleteConfirmationDialog";
=======
import DeleteConfirmationModal from "../../dialog/DeleteConfirmationModal";
>>>>>>> Jefferson

const WorkExperienceList = ({ experiences, setExperiences }) => {
  const { userData } = useUserContext();
  const [openModal, setOpenModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [selectedExperience, setSelectedExperience] = useState(null);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [experienceToDelete, setExperienceToDelete] = useState(null);


  useEffect(() => {
    const fetchWorkExperiences = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/work-experience/user/${userData.id}`);
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
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/work-experience/${experienceToDelete.id}`, {
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
        experiences.map((experience) => {
          const contentEditExperience = React.cloneElement(
            <WorkExperienceForm />,
            {
              workExperienceId: experience.id,
              initialData: experience,
              onUpdate: updateExperienceList,
            }
          );

          return (
            <InfoBaseCard
              key={experience.id}
              sub={true}
              title={experience.jobTitle}
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
                    />
                    <ActionButton 
                      texto={"Eliminar"}
                      startIcon={<DeleteIcon />}
                      onClick={() => handleDeleteClick(experience)}
                    />
                  </Box>
                </div>
              }
              dialogContent={contentEditExperience}
              modalId={`modal-work-experience-${experience.id}`}
              className="subcard"
            />
          );
        })
      ) : (
        <Typography variant="body1">No se encontraron experiencias laborales.</Typography>
      )}

      {/* Description Modal */}
      <Dialog open={openModal} onClose={handleCloseModal} maxWidth="sm" fullWidth  disableEnforceFocus aria-hidden={!openModal} > 
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
