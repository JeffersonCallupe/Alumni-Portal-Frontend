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
import FormEditEducation from "../../forms/institucional/Edit/formEditEducation";

const EducationList = () => {
  const { userData } = useUserContext();
  const [educations, setEducations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openModal, setOpenModal] = useState(false); 
  const [selectedEducation, setSelectedEducation] = useState(null); 

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
    setOpenModal(false);
    setSelectedEducation(null);
  };

  const dialogContent = (education) => (
    <div>
      <Typography variant="h6">Editar Educación: {education.degree} en {education.institution}</Typography>
      <FormEditEducation
        educationId={education.id}
        initialData={education}
        onUpdate={updateEducationList}
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
      {educations.length > 0 ? (
        educations.map((education) => (
          <InfoBaseCard
            key={education.id}
            title={<Typography variant="h6">{education.degree} en {education.fieldOfStudy}</Typography>}
            cardContent={
              <div>
                <Typography variant="subtitle2">Institución: {education.institution}</Typography>
                <Typography variant="subtitle2">
                  Fecha inicio: {education.startDate} - Fecha fin: {education.endDate}
                </Typography>
                <Button variant="outlined" onClick={() => handleOpenModal(education)} 
                style={{ 
                  textTransform: "none", 
                  color: "black", 
                  borderColor: "black" 
                }}>
                  Ver descripción
                </Button>
              </div>
            }
            dialogContent={dialogContent(education)} 
            modalId={`modal-education-${education.id}`} 
            className="subcard" 
          />
        ))
      ) : (
        <Typography variant="body1">No se encontraron registros educativos.</Typography>
      )}

      <Dialog open={openModal} onClose={handleCloseModal} maxWidth="sm" fullWidth>
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
          <Button onClick={handleCloseModal} color="primary">
            Cerrar
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default EducationList;


