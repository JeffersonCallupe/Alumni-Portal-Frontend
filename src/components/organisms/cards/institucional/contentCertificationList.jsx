import React, { useEffect, useState } from "react";
import { useUserContext } from "../../../../contexts/userContext";
import InfoBaseCard from "../profileBaseCards/infosubBaseCard";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import ActionButton from "../../../atoms/buttons/actionButton"
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import CertificationForm from "../../forms/institucional/Edit/formEditCertification"; // Asegúrate de que esta ruta sea correcta
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/VisibilityOutlined';
import DeleteConfirmationModal from "../../forms/institucional/deleteConfirmationModal"; // Asegúrate de ajustar la ruta

const CertificationList = () => {
  const { userData } = useUserContext();
  const [certifications, setCertifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const [selectedCertification, setSelectedCertification] = useState(null);
  // Nuevos estados para el modal de confirmación de eliminación
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [certificationToDelete, setCertificationToDelete] = useState(null);

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

  // Nuevas funciones para manejar la eliminación
  const handleDeleteClick = (certification) => {
    setCertificationToDelete(certification);
    setDeleteConfirmOpen(true);
  };

  const handleDeleteCancel = () => {
    setDeleteConfirmOpen(false);
    setCertificationToDelete(null);
  };

  const handleDeleteConfirm = async () => {
    if (!certificationToDelete) return;

    try {
      const response = await fetch(`http://178.128.147.224:8080/api/certification/${certificationToDelete.id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        setCertifications((prevCertifications) =>
          prevCertifications.filter((cert) => cert.id !== certificationToDelete.id)
        );
        setDeleteConfirmOpen(false);
        setCertificationToDelete(null);
      } else {
        console.error("Error deleting certification:", response.statusText);
      }
    } catch (error) {
      console.error("Error deleting certification:", error);
    }
  };

  const dialogContent = (certification) => (
    <div>
      <Typography variant="h6">Editar Certificación: {certification.name}</Typography>
      <CertificationForm
        certificationId={certification.id}
        initialData={certification}
        onUpdate={updateCertificationList}
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
      {certifications.length > 0 ? (
        certifications.map((certification) => (
          <InfoBaseCard
            key={certification.id}
            title={<Typography variant="h6">{certification.name}</Typography>}
            cardContent={
              <div>
                <Typography variant="subtitle2">Institución: {certification.issuingOrganization}</Typography>
                <Typography variant="subtitle2">
                  Fecha de emisión: {certification.issueDate}
                  {certification.expirationDate && ` - Fecha de expiración: ${certification.expirationDate}`}
                </Typography>
                <br />
                <Box 
                  display="flex" 
                  justifyContent="space-between" 
                  flexWrap="wrap" 
                  gap={2}
                >
                  <ActionButton 
                    texto={"Ver Credencial"}
                    startIcon={<VisibilityIcon />}
                    onClick={() => window.open(certification.credentialUrl, '_blank')}  
                  >
                  </ActionButton>
                  <ActionButton 
                    texto={"Eliminar"}
                    startIcon={<DeleteIcon />}
                    onClick={() => handleDeleteClick(certification)}
                  >
                    
                  </ActionButton>
                </Box>
              </div>
            }
            dialogContent={dialogContent(certification)}
            modalId={`modal-certification-${certification.id}`}
            className="subcard"
          />
        ))
      ) : (
        <Typography variant="body1">No se encontraron certificaciones.</Typography>
      )}

      {/* Modal de confirmación de eliminación */}
      <DeleteConfirmationModal
        isOpen={deleteConfirmOpen}
        onClose={handleDeleteCancel}
        onConfirm={handleDeleteConfirm}
        message={`¿Está seguro que desea eliminar la certificación?`}
      />
    </Box>
  );
};

export default CertificationList;



