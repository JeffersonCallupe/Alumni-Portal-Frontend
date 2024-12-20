import React, { useState, useEffect, useRef } from "react";
import OfertaLaboralCard from "../../components/organisms/cards/dashboard/OfertaLaboralCard";
import HomeBase from "../../components/templates/home/HomeBase";
import ConfirmationDialog from "../../components/organisms/dialog/ConfirmationDialog"; // Modal reutilizable
import { useUserContext } from "../../contexts/userContext";
import { useAlert } from "../../contexts/alertContext";
import useGet from "../../hooks/useGet";
import usePost from "../../hooks/usePost";
import { useSearchParams } from "react-router-dom";
import ConBuscador from "../../components/organisms/cards/filtros/ConBuscador";

function OfertasHistorico() {
  const [ofertas, setOfertas] = useState([]);
  const [inscripciones, setInscripciones] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null); // Oferta seleccionada para postulación
  const { userData } = useUserContext();
  const { showAlert } = useAlert();
  const fetchDataRef = useRef(false);
  const [openConfirmationDialog, setOpenConfirmationDialog] = useState(false); // Modal de confirmación
  const [searchParams, setSearchParams] = useSearchParams();
  const searchTerm = searchParams.get("filter") || "";
  const modalityFilter = searchParams.get("modality") || "";
  const areaFilter = searchParams.get("area") || "";
  const nivelFilter = searchParams.get("nivel") || "";

  const apiEndpoints = {
    getAll: `${import.meta.env.VITE_API_URL}/api/job-offer/all`,
    getApplications: `${import.meta.env.VITE_API_URL}/api/application/user/${userData?.id}`,
    apply: `${import.meta.env.VITE_API_URL}/api/application/save`,
  };

  const { getData: getAllJobOffers } = useGet(apiEndpoints.getAll);
  const { getData: getUserApplications } = useGet(apiEndpoints.getApplications);
  const { post: applyToJob } = usePost(apiEndpoints.apply);

  useEffect(() => {
    if (userData && apiEndpoints.getAll && apiEndpoints.getApplications && !fetchDataRef.current) {
      const fetchData = async () => {
        try {
          const [jobOffers, applications] = await Promise.all([
            getAllJobOffers(),
            getUserApplications(),
          ]);

          setOfertas(jobOffers);
          setInscripciones(applications.map((app) => app.jobOfferId)); // Obtener IDs de ofertas postuladas
        } catch (error) {
          console.error("Error al cargar los datos:", error);
        }
      };
      fetchData();
      fetchDataRef.current = true;
    }
  }, [userData, apiEndpoints, getAllJobOffers, getUserApplications]);

  // Maneja la apertura del modal de confirmación
  const handleOpenConfirmation = (oferta) => {
    setSelectedJob(oferta);
    setOpenConfirmationDialog(true);
  };

  // Cierra el modal de confirmación
  const handleCloseConfirmation = () => {
    setSelectedJob(null);
    setOpenConfirmationDialog(false);
  };

  // Confirma la postulación a la oferta
  const handleConfirmApplication = async () => {
    if (!selectedJob) return;

    const applicationData = {
      user: { id: userData.id },
      jobOffer: { id: selectedJob.id },
    };

    try {
      await applyToJob(applicationData);
      setInscripciones((prev) => [...prev, selectedJob.id]); // Agrega la oferta a la lista de postulaciones
      showAlert("Te has postulado exitosamente a la oferta laboral.", "success");
      handleCloseConfirmation();
    } catch (error) {
      console.error("Error al postularse a la oferta laboral:", error);
      showAlert("No se pudo completar la postulación.", "error");
    }
  };

  // Filtrado de ofertas laborales
  const filteredOfertas = ofertas.filter((oferta) => {
    if (!oferta) return false;

    // Filtro por término de búsqueda
    if (searchTerm && oferta.companyName && !oferta.companyName.toLowerCase().includes(searchTerm.toLowerCase())) {
      return false;
    }

    // Filtro por modalidad
    if (modalityFilter && (!oferta.modality || oferta.modality.toLowerCase() !== modalityFilter.toLowerCase())) {
      return false;
    }

    // Filtro por área
    if (areaFilter && (!oferta.area || oferta.area.toLowerCase() !== areaFilter.toLowerCase())) {
      return false;
    }

    // Filtro por nivel
    if (nivelFilter && (!oferta.nivel || oferta.nivel.toLowerCase() !== nivelFilter.toLowerCase())) {
      return false;
    }

    return true;
  });

  if (!userData) {
    return <div>Cargando...</div>;
  }

  const asideContent = (
    <div className="sticky top-8 bg-white p-6 lg:mt-2 mx-1 rounded-lg flex flex-col gap-4">
      <ConBuscador
            searchTerm={searchTerm}
            setSearchParams={setSearchParams}
            viewActivies={false}
          />
    </div>
  );

  return (
    <HomeBase aside={asideContent}>
      <div className="flex flex-row mt-4 mb-16 gap-4 lg:mx-1 justify-center">
        <div className="flex flex-col w-12/12 lg:w-11/12">
          <div>
            {filteredOfertas.length > 0 ? (
              filteredOfertas.map((oferta) => (
                <OfertaLaboralCard
                  key={oferta.id}
                  oferta={oferta}
                  onApplication={
                    !inscripciones.includes(oferta.id) // Muestra el botón solo si no está inscrito
                      ? () => handleOpenConfirmation(oferta)
                      : null
                  }
                />
              ))
            ) : (
              <div>No hay ofertas laborales disponibles</div>
            )}
          </div>
        </div>
      </div>
      <ConfirmationDialog
        open={openConfirmationDialog}
        onClose={handleCloseConfirmation}
        onConfirm={handleConfirmApplication}
        title="Confirmar Postulación"
        content={`¿Estás seguro de que deseas postularte a la oferta "${selectedJob?.title}"?`}
      />
    </HomeBase>
  );
}

export default OfertasHistorico;
