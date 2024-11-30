import React, { useState, useEffect, useRef } from "react";
import OfertaLaboralCard from "../../components/organisms/cards/dashboard/ofertaLaboralCard";
import HomeBase from "../../components/templates/home/home";
import ConfirmationDialog from "../../components/organisms/dialog/confirmationDialog"; // Modal reutilizable
import { useUserContext } from "../../contexts/userContext";
import { useAlert } from "../../contexts/alertContext";
import useGet from "../../hooks/useGet";
import useDelete from "../../hooks/useDelete";
import { useSearchParams } from "react-router-dom";
import ConBuscador from "../../components/organisms/cards/filtros/ConBuscador";

function OfertasAplicadas() {
  const [applications, setApplications] = useState([]);
  const [offers, setOffers] = useState([]);
  const [filteredOffers, setFilteredOffers] = useState([]);
  const [selectedApplication, setSelectedApplication] = useState(null);
  const { userData } = useUserContext();
  const { showAlert } = useAlert();
  const [openConfirmationDialog, setOpenConfirmationDialog] = useState(false);
  const fetchDataRef = useRef(false);
  const [searchParams, setSearchParams] = useSearchParams();

  // Parámetros de búsqueda
  const searchTerm = searchParams.get("filter") || "";
  const modalityFilter = searchParams.get("modality") || "";
  const areaFilter = searchParams.get("area") || "";
  const nivelFilter = searchParams.get("nivel") || "";

  const apiEndpoints = {
    getApplications: `${import.meta.env.VITE_API_URL}/api/application/user/${userData?.id}`,
    getJobOffer: (jobOfferId) =>
      `${import.meta.env.VITE_API_URL}/api/job-offer/${jobOfferId}`,
    deleteApplication: `${import.meta.env.VITE_API_URL}/api/application`,
  };

  const { getData: getApplications } = useGet(apiEndpoints.getApplications);
  const { deleteData: cancelApplication } = useDelete(apiEndpoints.deleteApplication);

  // Carga inicial de datos
  useEffect(() => {
    if (userData && !fetchDataRef.current) {
      const fetchApplicationsAndOffers = async () => {
        try {
          const applicationData = await getApplications();
          setApplications(applicationData);

          const offerPromises = applicationData.map((application) =>
            fetch(apiEndpoints.getJobOffer(application.jobOfferId), {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${sessionStorage.getItem("token")}`,
              },
            }).then((response) => response.json())
          );

          const offerDetails = await Promise.all(offerPromises);
          setOffers(offerDetails);
          setFilteredOffers(offerDetails); // Inicializa las ofertas filtradas
        } catch (error) {
          console.error("Error al cargar las aplicaciones y ofertas:", error);
          showAlert("No se pudieron cargar las postulaciones.", "error");
        }
      };

      fetchApplicationsAndOffers();
      fetchDataRef.current = true;
    }
  }, [userData, apiEndpoints, getApplications, showAlert]);

  // Filtrado dinámico
  useEffect(() => {
    const filtered = offers.filter((offer) => {
      if (!offer) return false;

      // Filtro por término de búsqueda
      if (
        searchTerm &&
        offer.companyName &&
        !offer.companyName.toLowerCase().includes(searchTerm.toLowerCase())
      ) {
        return false;
      }

      // Filtro por modalidad
      if (
        modalityFilter &&
        (!offer.modality || offer.modality.toLowerCase() !== modalityFilter.toLowerCase())
      ) {
        return false;
      }

      // Filtro por área
      if (
        areaFilter &&
        (!offer.area || offer.area.toLowerCase() !== areaFilter.toLowerCase())
      ) {
        return false;
      }

      // Filtro por nivel
      if (
        nivelFilter &&
        (!offer.nivel || offer.nivel.toLowerCase() !== nivelFilter.toLowerCase())
      ) {
        return false;
      }

      return true;
    });

    setFilteredOffers(filtered);
  }, [offers, searchTerm, modalityFilter, areaFilter, nivelFilter]);

  // Maneja la apertura del modal de confirmación
  const handleOpenConfirmation = (application) => {
    setSelectedApplication(application);
    setOpenConfirmationDialog(true);
  };

  // Cierra el modal de confirmación
  const handleCloseConfirmation = () => {
    setSelectedApplication(null);
    setOpenConfirmationDialog(false);
  };

  // Cancela la postulación
  const handleConfirmCancelApplication = async () => {
    if (!selectedApplication) return;

    try {
      await cancelApplication(selectedApplication.id);
      setApplications((prev) =>
        prev.filter((app) => app.id !== selectedApplication.id)
      );
      setOffers((prev) =>
        prev.filter((offer) => offer.id !== selectedApplication.jobOfferId)
      );
      setFilteredOffers((prev) =>
        prev.filter((offer) => offer.id !== selectedApplication.jobOfferId)
      );
      showAlert("Postulación cancelada exitosamente.", "success");
      handleCloseConfirmation();
    } catch (error) {
      console.error("Error al cancelar la postulación:", error);
      showAlert("No se pudo cancelar la postulación.", "error");
    }
  };

  if (!userData) {
    return <div>Cargando...</div>;
  }

  return (
    <HomeBase>
      <div className="flex flex-row gap-8 mt-4 mb-16 lg:mx-12 justify-center">
        <div className="lg:w-4/12">
          <ConBuscador
            searchTerm={searchTerm}
            setSearchParams={setSearchParams}
            viewActivies={false}
          />
        </div>
        <div className="flex flex-col w-10/12 lg:w-7/12">
          <div>
            {filteredOffers.length > 0 ? (
              filteredOffers.map((offer) => {
                const application = applications.find(
                  (app) => app.jobOfferId === offer.id
                );
                return (
                  <OfertaLaboralCard
                    key={offer.id}
                    oferta={offer}
                    onCancelApplication={() => handleOpenConfirmation(application)}
                  />
                );
              })
            ) : (
              <div className="text-center text-gray-500">
                No has postulado a ninguna oferta laboral.
              </div>
            )}
          </div>
        </div>
      </div>
      <ConfirmationDialog
        open={openConfirmationDialog}
        onClose={handleCloseConfirmation}
        onConfirm={handleConfirmCancelApplication}
        title="Cancelar Postulación"
        content={`¿Estás seguro de que deseas cancelar tu postulación a "${selectedApplication?.jobOfferTitle}"?`}
      />
    </HomeBase>
  );
}

export default OfertasAplicadas;


