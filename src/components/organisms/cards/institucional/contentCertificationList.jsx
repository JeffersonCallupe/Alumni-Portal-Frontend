import React, { useEffect, useState } from "react";
import { useUserContext } from "../../../../contexts/userContext";
import InfoBaseCard from "../profileBaseCards/infosubBaseCard"; // Ajusta la ruta según tu estructura
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import FormEditCertification from "../../forms/institucional/Edit/formEditCertification"; // Importar el formulario
import DeleteIcon from '@mui/icons-material/Delete';

const CertificationList = () => {
  const { userData } = useUserContext();
  const [certifications, setCertifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openModal, setOpenModal] = useState(false); // Estado para controlar el modal
  const [selectedCertification, setSelectedCertification] = useState(null); // Guardar la certificación seleccionada

  useEffect(() => {
    const fetchCertifications = async () => {
      try {
        const response = await fetch(`http://178.128.147.224:8080/api/certification/user/${userData.id}`);
        const data = await response.json();
        setCertifications(data);
      } catch (error) {
        console.error("Error fetching certifications:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCertifications();
  }, [userData]);

  const updateCertificationList = (updatedCertification) => {
    setCertifications((prevCertifications) =>
      prevCertifications.map((cert) =>
        cert.id === updatedCertification.id ? updatedCertification : cert
      )
    );
  };

  const handleOpenModal = (certification) => {
    setSelectedCertification(certification);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedCertification(null);
  };

  const dialogContent = (certification) => (
    <div>
      <Typography variant="h6">Editar Certificación: {certification.name}</Typography>
      <FormEditCertification
        certificationId={certification.id}
        initialData={certification}
        onUpdate={updateCertificationList} // Callback para actualizar la lista
        onCancel={handleCloseModal} // Cerrar el modal
      />
    </div>
  );

  if (loading) {
    return <CircularProgress />;
  }

  return (
    <Box>
      {certifications.length > 0 ? (
        certifications.map((certification) => (
          <InfoBaseCard
            key={certification.id}
            title={<Typography variant="h6">{certification.name}</Typography>}
            cardContent={
              <div>
                <Typography variant="subtitle2">Organización: {certification.issuingOrganization}</Typography>
                <Typography variant="subtitle2">Fecha de emisión: {certification.issueDate}</Typography>
                
                <Box display="flex" alignItems="center" justifyContent="space-between"  gap={1}> {/* Contenedor para el enlace y el botón */}
                  <Typography variant="subtitle2">
                    <a 
                      href={certification.credentialUrl} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      style={{ textDecoration: 'none', color: 'blue' }}
                    >
                      Ver credencial
                    </a>
                  </Typography>
                  
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
            dialogContent={dialogContent(certification)} // Contenido del botón para abrir el modal
            modalId={`modal-certification-${certification.id}`} // ID único para cada modal
            className="subcard" // Asignando la clase CSS
          />
        ))
      ) : (
        <Typography variant="body1">No se encontraron certificaciones.</Typography>
      )}

      {/* Modal para editar certificación */}
      <Dialog open={openModal} onClose={handleCloseModal} maxWidth="sm" fullWidth>
        <DialogTitle>Editar Certificación</DialogTitle>
        <DialogContent>
          {selectedCertification && dialogContent(selectedCertification)}
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default CertificationList;



