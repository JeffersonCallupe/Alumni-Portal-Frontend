import React, { useEffect, useState } from "react";
import { useUserContext } from "../../../../contexts/userContext";
import InfoBaseCard from "../profileBaseCards/InfoBaseCard";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import ActionButton from "../../../atoms/buttons/ActionButton";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import FormEditEducation from "../../forms/institucional/Edit/FormEditEducation";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/VisibilityOutlined";
import DeleteConfirmationModal from "../../dialog/DeleteConfirmationModal"; // Asegúrate de ajustar la ruta

const EducationList = ({ educations, setEducations }) => {
  const { userData } = useUserContext();
  const [loading, setLoading] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const [selectedEducation, setSelectedEducation] = useState(null);
  // Nuevos estados para el modal de confirmación de eliminación
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [educationToDelete, setEducationToDelete] = useState(null);

  useEffect(() => {
    const fetchEducationData = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/education/user/${userData.id}`
        );
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

  const updateEducationList = (updatedEducation) => {
    setEducations((prevEducations) =>
      prevEducations.map((edu) =>
        edu.id === updatedEducation.id ? updatedEducation : edu
      )
    );
  };

  const handleOpenModal = (education) => {
    setSelectedEducation(education);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    console.log("para");
    setOpenModal(false);
    setSelectedEducation(null);
  };

  // Nuevas funciones para manejar la eliminación
  const handleDeleteClick = (education) => {
    setEducationToDelete(education);
    setDeleteConfirmOpen(true);
  };

  const handleDeleteCancel = () => {
    setDeleteConfirmOpen(false);
    setEducationToDelete(null);
  };

  const handleDeleteConfirm = async () => {
    if (!educationToDelete) return;

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/education/${educationToDelete.id}`,
        {
          method: "DELETE",
        }
      );
      if (response.ok) {
        setEducations((prevEducations) =>
          prevEducations.filter((edu) => edu.id !== educationToDelete.id)
        );
        setDeleteConfirmOpen(false);
        setEducationToDelete(null);
      } else {
        console.error("Error deleting education:", response.statusText);
      }
    } catch (error) {
      console.error("Error deleting education:", error);
    }
  };

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box>
      {educations.length > 0 ? (
        educations.map((education) => {
          const contentEditEducation = React.cloneElement(<FormEditEducation />, {
            educationId: education.id,
            initialData: education,
            onUpdate: updateEducationList,
          });

          return (
            <InfoBaseCard
              key={education.id}
              title={education.degree + " en " + education.fieldOfStudy}
              sub={true}
              cardContent={
                <div>
                  <Typography variant="subtitle2">
                    Institución: {education.institution}
                  </Typography>
                  <Typography variant="subtitle2">
                    Fecha inicio: {education.startDate} - Fecha fin:{" "}
                    {education.endDate}
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
                      onClick={() => handleOpenModal(education)}
                    ></ActionButton>
                    <ActionButton
                      texto={"Eliminar"}
                      startIcon={<DeleteIcon />}
                      onClick={() => handleDeleteClick(education)}
                    ></ActionButton>
                  </Box>
                </div>
              }
              dialogContent={contentEditEducation }
              modalId={`modal-education-${education.id}`}
              className="subcard"
            />
          );
        })
      ) : (
        <Typography variant="body1">
          No se encontraron registros educativos.
        </Typography>
      )}

      {/* Modal de descripción */}
      <Dialog
        open={openModal}
        onClose={handleCloseModal}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Descripción:</DialogTitle>
        <DialogContent>
          <textarea
            value={selectedEducation?.description}
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
        message={`¿Está seguro que desea eliminar el registro educativo?`}
      />
    </Box>
  );
};

export default EducationList;