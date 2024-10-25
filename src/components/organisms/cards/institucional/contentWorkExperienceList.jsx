import React, { useEffect, useState } from "react";
import { useUserContext } from "../../../../contexts/userContext";
import InfoBaseCard from "../profileBaseCards/infosubBaseCard"; // Ajusta la ruta según tu estructura
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import WorkExperienceForm from "../../forms/institucional/Edit/formEditWorkExperience"; // Importa el formulario
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import DeleteIcon from '@mui/icons-material/Delete';

const WorkExperienceList = () => {
  const { userData } = useUserContext();
  const [experiences, setExperiences] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openModal, setOpenModal] = useState(false); // Estado para controlar el modal
  const [selectedExperience, setSelectedExperience] = useState(null); // Guardar la experiencia seleccionada

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

  // Función para actualizar la lista después de una edición exitosa
  const updateExperienceList = (updatedExperience) => {
    setExperiences((prevExperiences) =>
      prevExperiences.map((exp) =>
        exp.id === updatedExperience.id ? updatedExperience : exp
      )
    );
  };

  // Función para abrir el modal con la descripción de una experiencia
  const handleOpenModal = (experience) => {
    setSelectedExperience(experience);
    setOpenModal(true);
  };

  // Función para cerrar el modal
  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedExperience(null);
  };

  // Función para abrir el formulario de edición en un modal o diálogo
  const dialogContent = (experience) => (
    <div>
      <Typography variant="h6">Editar Experiencia: {experience.jobTitle}</Typography>
      {/* Formulario para editar la experiencia */}
      <WorkExperienceForm
        workExperienceId={experience.id}
        initialData={experience}
        onUpdate={updateExperienceList} // Callback para actualizar la lista
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
                <br></br>
                <Box 
                  display="flex" 
                  justifyContent="space-between"  // Espacio automático entre botones
                  flexWrap="wrap"                 // Permitir que los botones se muevan en pantallas pequeñas
                  gap={2}                         // Espacio uniforme entre botones
                >
                  <Button 
                    variant="outlined" 
                    onClick={() => handleOpenModal(experience)}
                    style={{ 
                      textTransform: "none", 
                      color: "black", 
                      borderColor: "black" 
                    }}
                  >
                    Ver descripción
                  </Button>

                  <Button 
                    variant="outlined" 
                    startIcon={<DeleteIcon />}
                    style={{ 
                      textTransform: "none", 
                      color: "black", 
                      borderColor: "black" 
                    }}
                  >
                    Eliminar
                  </Button>
                </Box>
              </div>
            }
            dialogContent={dialogContent(experience)} // Contenido del modal con formulario
            modalId={`modal-work-experience-${experience.id}`} // ID único para cada modal
            className="subcard" // Asignando la clase CSS
          />
        ))
      ) : (
        <Typography variant="body1">No se encontraron experiencias laborales.</Typography>
      )}

      {/* Modal para mostrar la descripción completa */}
      <Dialog open={openModal} onClose={handleCloseModal} maxWidth="sm" fullWidth>
        <DialogTitle>Descripción:</DialogTitle>
        <DialogContent>
          <textarea
            value={selectedExperience?.description}
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

export default WorkExperienceList;

