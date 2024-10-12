import React, { useEffect, useState } from "react";
import { useUserContext } from "../../../../contexts/userContext";
import InfoBaseCard from "../profileBaseCards/infosubBaseCard"; // Ajusta la ruta según tu estructura
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

const CertificationList = () => {
  const { userData } = useUserContext();
  const [certifications, setCertifications] = useState([]);
  const [loading, setLoading] = useState(true);

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
                <Typography variant="subtitle2">
                  <a href={certification.credentialUrl} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', color: 'blue' }}>
                    Ver credencial
                  </a>
                </Typography>
              </div>
            }
            dialogContent={
              <Button variant="contained">
                Editar
              </Button>
            } // Contenido del modal o botón
            modalId={`modal-certification-${certification.id}`} // ID único para cada modal
            className="subcard" // Asignando la clase CSS
          />
        ))
      ) : (
        <Typography variant="body1">No se encontraron certificaciones.</Typography>
      )}
    </Box>
  );
};

export default CertificationList;