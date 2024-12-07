import React, { useEffect, useState } from "react";
import { useUserContext } from "../../../../contexts/userContext";
import InfoBaseCard from "../profileBaseCards/infoBaseCard";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import WorkExperienceForm from "../../forms/institucional/Edit/WorkExperienceForm";
import Button from "@mui/material/Button";
import ActionButton from "../../../atoms/buttons/actionButton";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/VisibilityOutlined";
import DeleteConfirmationModal from "../../dialog/deleteConfirmationDialog";
import { useAlert } from "../../../../contexts/alertContext";
import usePatch from "../../../../hooks/usePatchProfile";

const WorkExperienceList = ({ experiences, setExperiences }) => {
  const { userData } = useUserContext();
  const [openModal, setOpenModal] = useState(false);
  const [selectedExperience, setSelectedExperience] = useState(null);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [experienceToDelete, setExperienceToDelete] = useState(null);
  const { showAlert } = useAlert();

  const apiUrl = userData
    ? `${import.meta.env.VITE_API_URL}/api/work-experience/user/${userData.id}`
    : null;
  const { loading: patchLoading, patch } = usePatch(apiUrl);

  useEffect(() => {
    const fetchWorkExperiences = async () => {
      try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        setExperiences(data);
      } catch (error) {
        console.error("Error fetching work experiences:", error);
      }
    };
    if (apiUrl) fetchWorkExperiences();
  }, [apiUrl]);

  const updateExperienceList = (updatedExperience) => {
    setExperiences((prevExperiences) =>
      prevExperiences.map((exp) =>
        exp.id === updatedExperience.id ? updatedExperience : exp
      )
    );
  };

  const handleSaveChanges = async (updatedExperience) => {
    try {
      const updatedData = await patch(updatedExperience);
      console.log(updatedData)
      if (updatedData) {
        updateExperienceList(updatedData);
        showAlert("La información se actualizó con éxito", "success");
      }
    } catch (error) {
      showAlert("Error al guardar los cambios", "error");
    }
    handleCloseModal(); 
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

  return (
    <Box>
      {experiences.length > 0 ? (
        experiences.map((experience) => {
          const contentEditExperience = React.cloneElement(
            <WorkExperienceForm />,
            {
              key:experience.id,
              workExperienceId: experience.id,
              initialData: experience,
              onSubmit: handleSaveChanges,
              loading: patchLoading,
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
