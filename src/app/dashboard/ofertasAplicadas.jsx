import React, { useState, useEffect, useRef } from "react";
import OfertaLaboralCard from "../../components/organisms/cards/dashboard/ofertaLaboralCard";
import HomeBase from "../../components/templates/home/HomeBase";
import ConfirmationDialog from "../../components/organisms/dialog/confirmationDialog";
import FilterBar from "../../components/organisms/filters/FilterBar";
import FilterDrawer from "../../components/organisms/filters/FilterDrawer";
import { useUserContext } from "../../contexts/userContext";
import { useAlert } from "../../contexts/alertContext";
import useGet from "../../hooks/useGet";
import useDelete from "../../hooks/useDelete";

function OfertasAplicadas() {
  const [applications, setApplications] = useState([]);
  const [offers, setOffers] = useState([]);
  const [filteredOffers, setFilteredOffers] = useState([]);
  const [selectedApplication, setSelectedApplication] = useState(null);
  const { userData } = useUserContext();
  const { showAlert } = useAlert();
  const [openConfirmationDialog, setOpenConfirmationDialog] = useState(false);
  const fetchDataRef = useRef(false);
  const [filterDrawerOpen, setFilterDrawerOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const [tempFilters, setTempFilters] = useState({
    modality: "",
    area: "",
    nivel: "",
  });
  const [activeFilters, setActiveFilters] = useState({
    modality: "",
    area: "",
    nivel: "",
  });

  const apiEndpoints = {
    getApplications: `${import.meta.env.VITE_API_URL}/api/application/user/${userData?.id}`,
    getJobOffer: (jobOfferId) =>
      `${import.meta.env.VITE_API_URL}/api/job-offer/${jobOfferId}`,
    deleteApplication: `${import.meta.env.VITE_API_URL}/api/application`,
  };

  const { getData: getApplications } = useGet(apiEndpoints.getApplications);
  const { deleteData: cancelApplication } = useDelete(apiEndpoints.deleteApplication);

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
        } catch (error) {
          console.error("Error al cargar las aplicaciones y ofertas:", error);
          showAlert("No se ha postulado a ninguna oferta laboral", "success");
        }
      };

      fetchApplicationsAndOffers();
      fetchDataRef.current = true;
    }
  }, [userData, apiEndpoints, getApplications, showAlert]);

  useEffect(() => {
    if (offers.length === 0) {
      setFilteredOffers([]);
      return;
    }

    let filtered = offers;

    if (searchTerm) {
      filtered = filtered.filter((offer) =>
        offer.companyName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        offer.title?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (activeFilters.modality) {
      filtered = filtered.filter(
        (offer) => offer.modality === activeFilters.modality
      );
    }

    if (activeFilters.area) {
      filtered = filtered.filter(
        (offer) => offer.area === activeFilters.area
      );
    }

    if (activeFilters.nivel) {
      filtered = filtered.filter(
        (offer) => offer.nivel === activeFilters.nivel
      );
    }

    setFilteredOffers(filtered);
  }, [offers, searchTerm, activeFilters]);


  const handleOpenConfirmation = (application) => {
    setSelectedApplication(application);
    setOpenConfirmationDialog(true);
  };

  const handleCloseConfirmation = () => {
    setSelectedApplication(null);
    setOpenConfirmationDialog(false);
  };

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
      showAlert("Postulación cancelada exitosamente.", "success");
      handleCloseConfirmation();
    } catch (error) {
      console.error("Error al cancelar la postulación:", error);
      showAlert("No se pudo cancelar la postulación.", "error");
    }
  };

  const handleFilterChange = (filterName, value) => {
    setTempFilters(prev => ({
      ...prev,
      [filterName]: value
    }));
  };

  const handleApplyFilters = () => {
    setActiveFilters(tempFilters);
  };

  const handleClearFilters = () => {
    setTempFilters({
      modality: '',
      area: '',
      nivel: '',
    });
    setActiveFilters({
      modality: '',
      area: '',
      nivel: '',
    });
  };

  const handleRemoveFilter = (filterName) => {
    setTempFilters(prev => ({
      ...prev,
      [filterName]: ''
    }));
    setActiveFilters(prev => ({
      ...prev,
      [filterName]: ''
    }));
  };

  if (!userData) {
    return <div>Loading...</div>;
  }

  return (
    <HomeBase>
      <FilterBar
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        activeFilters={activeFilters}
        onRemoveFilter={handleRemoveFilter}
        onOpenFilterDrawer={() => setFilterDrawerOpen(true)}
      />

      <div className="max-w-3xl mx-auto px-4">
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
            <div style={{ textAlign: 'center', padding: '3rem', color: '#6B7280' }}>
              No has postulado a ninguna oferta laboral
            </div>
          )}
        </div>

        <ConfirmationDialog
          open={openConfirmationDialog}
          onClose={handleCloseConfirmation}
          onConfirm={handleConfirmCancelApplication}
          title="Cancelar Postulación"
          content={`¿Estás seguro de que deseas cancelar tu postulación a "${selectedApplication?.jobOfferTitle}"?`}
        />
      </div>

      <FilterDrawer
        open={filterDrawerOpen}
        onClose={() => setFilterDrawerOpen(false)}
        viewActivies={false}
        filters={tempFilters}
        onFilterChange={handleFilterChange}
        onApplyFilters={handleApplyFilters}
        onClearFilters={handleClearFilters}
      />
    </HomeBase>
  );
}

export default OfertasAplicadas;
