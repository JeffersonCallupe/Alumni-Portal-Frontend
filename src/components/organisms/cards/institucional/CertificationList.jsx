import React, { useEffect, useState } from "react";
import { useUserContext } from "../../../../contexts/userContext";
import InfoBaseCard from "../profileBaseCards/infoBaseCard";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import ActionButton from "../../../atoms/buttons/actionButton";
import CertificationForm from "../../forms/institucional/Edit/formEditCertification";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/VisibilityOutlined";
import DeleteConfirmationModal from "../../dialog/DeleteConfirmationModal";


const CertificationList = ({ certifications, setCertifications }) => {
  const { userData } = useUserContext();
  const [loading, setLoading] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const [selectedCertification, setSelectedCertification] = useState(null);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [certificationToDelete, setCertificationToDelete] = useState(null);

  useEffect(() => {
    const fetchCertifications = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/certification/user/${userData.id
          }`
        );
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
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/certification/${certificationToDelete.id
        }`,
        {
          method: "DELETE",
        }
      );
      if (response.ok) {
        setCertifications((prevCertifications) =>
          prevCertifications.filter(
            (cert) => cert.id !== certificationToDelete.id
          )
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

  const handleViewCredential = (certification) => {
    if (!certification.credentialUrl) {
      alert("Esta certificación no tiene una URL de credencial.");
    } else {
      window.open(certification.credentialUrl, "_blank");
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
      {certifications.length > 0 ? (
        certifications.map((certification) => {
          const contentEditCertification = React.cloneElement(
            <CertificationForm />,
            {
              certificationId: certification.id,
              initialData: certification,
              onUpdate: updateCertificationList,
            }
          );

          return (
            <InfoBaseCard
              key={certification.id}
              title={`Editar ${certification.name}`}
              sub={true}
              cardContent={
                <div>
                  <Typography variant="subtitle2">
                    Institución: {certification.issuingOrganization}
                  </Typography>
                  <Typography variant="subtitle2">
                    Fecha de emisión: {certification.issueDate}
                    {certification.expirationDate &&
                      ` - Fecha de expiración: ${certification.expirationDate}`}
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
                      onClick={() => handleViewCredential(certification)}
                      disabled={!certification.credentialUrl} // Deshabilita el botón si no hay URL
                    />
                    <ActionButton
                      texto={"Eliminar"}
                      startIcon={<DeleteIcon />}
                      onClick={() => handleDeleteClick(certification)}
                    />
                  </Box>
                </div>
              }
              dialogContent={contentEditCertification}
              modalId={`modal-certification-${certification.id}`}
              className="subcard"
            />
          );
        })
      ) : (
        <Typography variant="body1">
          No se encontraron certificaciones.
        </Typography>
      )}

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




